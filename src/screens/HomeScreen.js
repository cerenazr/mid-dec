import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import CustomGauge from '../components/CustomGauge';
import { db, auth } from '../services/firebaseConfig';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

const RISK_TYPES = [
    {
        id: 'shoulder',
        name: 'Shoulder Dystocia Risk',
        shortDesc: 'Estimates the risk of shoulder dystocia during vaginal delivery based on maternal and fetal parameters.',
        fullDesc: 'Shoulder dystocia risk refers to the estimated likelihood of shoulder dystocia occurring during vaginal delivery, based on maternal and fetal clinical parameters. This assessment is intended to support clinical decision-making and does not replace professional medical judgment.',
        icon: 'body-outline',
    },
    {
        id: 'pph',
        name: 'Postpartum Hemorrhage (PPH) Risk',
        shortDesc: 'Assesses the risk of excessive bleeding following childbirth using clinical risk factors.',
        fullDesc: 'Postpartum hemorrhage risk assessment evaluates the likelihood of excessive bleeding following delivery. This tool uses established clinical risk factors to provide an estimated risk level to support clinical preparedness and timely intervention.',
        icon: 'water-outline',
    },
    {
        id: 'preeclampsia',
        name: 'Preeclampsia Risk',
        shortDesc: 'Evaluates the risk of pregnancy-related hypertensive disorders based on maternal health indicators.',
        fullDesc: 'Preeclampsia risk assessment evaluates the likelihood of pregnancy-related hypertensive disorders. The assessment uses maternal health indicators to provide clinical decision support for appropriate monitoring and early intervention.',
        icon: 'heart-outline',
    },
];

function AppHeader({ navigation }) {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.headerLogo}
                    resizeMode="contain"
                />
                <View>
                    <Text style={styles.headerBrand}>MID-DEC</Text>
                    <Text style={styles.headerSubBrand}>Risk Calculator</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.headerBell}
                onPress={() => navigation.navigate('Notifications')}
            >
                <Ionicons name="notifications-outline" size={22} color={COLORS.textHeader} />
            </TouchableOpacity>
        </View>
    );
}

export default function HomeScreen({ navigation }) {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRisk, setSelectedRisk] = useState(null);
    const [searchText, setSearchText] = useState('');

    const user = auth.currentUser;
    const displayName = user?.displayName || '';
    const greeting = displayName ? `Welcome, ${displayName}!` : 'Welcome, Doctor!';

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 2000);
        const q = query(
            collection(db, 'calculations'),
            orderBy('timestamp', 'desc'),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            clearTimeout(timeout);
            const list = [];
            snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
            setPatients(list);
            setLoading(false);
        }, () => {
            clearTimeout(timeout);
            setLoading(false);
        });
        return () => {
            clearTimeout(timeout);
            unsubscribe();
        };
    }, []);

    const stats = {
        total: patients.length,
        high: patients.filter(p => p.result?.category === 'High').length,
        low: patients.filter(p => p.result?.category !== 'High').length,
    };

    const filtered = searchText
        ? RISK_TYPES.filter(r => r.name.toLowerCase().includes(searchText.toLowerCase()))
        : RISK_TYPES;

    // ── DETAIL VIEW ──────────────────────────────────────────────────────────
    if (selectedRisk) {
        return (
            <SafeAreaView style={styles.container}>
                <AppHeader navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScroll}>
                    <Text style={styles.welcomeText}>{greeting}</Text>

                    {/* Stats panel */}
                    <View style={styles.statsPanel}>
                        <View style={styles.gaugeWrap}>
                            <CustomGauge
                                percentage={(stats.high / (stats.total || 1)) * 100}
                                size={130}
                                strokeWidth={14}
                                showText={false}
                                riskLevel="High"
                            />
                            <View style={styles.gaugeCenterOverlay}>
                                <Text style={styles.gaugeCenterLabel}>Total</Text>
                                {loading
                                    ? <ActivityIndicator size="small" color={COLORS.primary} />
                                    : <Text style={styles.gaugeCenterValue}>{stats.total}</Text>
                                }
                            </View>
                        </View>

                        <View style={styles.statBoxCol}>
                            <View style={styles.statBox}>
                                <Text style={styles.statBoxLabel}>Total patients</Text>
                                <Text style={styles.statBoxNum}>{loading ? '-' : stats.total}</Text>
                            </View>
                            <View style={[styles.statBox, styles.statBoxRed]}>
                                <Text style={[styles.statBoxLabel, { color: '#EA4335' }]}>High-risk patients</Text>
                                <Text style={[styles.statBoxNum, { color: '#EA4335' }]}>{loading ? '-' : stats.high}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statBoxLabel}>Low-risk patients</Text>
                                <Text style={styles.statBoxNum}>{loading ? '-' : stats.low}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Risk description */}
                    <View style={styles.riskInfoCard}>
                        <Text style={styles.riskInfoTitle}>What is "{selectedRisk.name}" ?</Text>
                        <View style={styles.divider} />
                        <Text style={styles.riskInfoDesc}>{selectedRisk.fullDesc}</Text>
                        <TouchableOpacity
                            style={styles.backLink}
                            onPress={() => setSelectedRisk(null)}
                        >
                            <Ionicons name="time-outline" size={13} color={COLORS.textSub} />
                            <Text style={styles.backLinkText}>Back to other risk assessments.</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Warning banner */}
                    <View style={styles.warningBanner}>
                        <Ionicons name="warning-outline" size={22} color={COLORS.primary} style={{ flexShrink: 0 }} />
                        <Text style={styles.warningText}>
                            This application is intended for clinical decision support purposes only. It is not intended for use as a standalone diagnostic or treatment tool.
                        </Text>
                    </View>

                    {/* Feedback banner */}
                    <TouchableOpacity style={styles.feedbackBanner} activeOpacity={0.85}>
                        <Ionicons name="thumbs-up-outline" size={20} color={COLORS.white} style={{ flexShrink: 0 }} />
                        <Text style={styles.feedbackText}>
                            What do you think about our app? Rate it and share your feedback with us.
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // ── LIST VIEW ─────────────────────────────────────────────────────────────
    return (
        <SafeAreaView style={styles.container}>
            <AppHeader navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listScroll}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor={COLORS.textPlaceholder}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <Ionicons name="search-outline" size={20} color={COLORS.textPlaceholder} />
                </View>

                {filtered.map((risk) => (
                    <TouchableOpacity
                        key={risk.id}
                        style={styles.riskCard}
                        onPress={() => setSelectedRisk(risk)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.riskCardIcon}>
                            <Ionicons name={risk.icon} size={26} color={COLORS.primary} />
                        </View>
                        <View style={styles.riskCardBody}>
                            <Text style={styles.riskCardTitle}>{risk.name}</Text>
                            <Text style={styles.riskCardDesc}>{risk.shortDesc}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={COLORS.textSub} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    headerBrand: {
        fontSize: 15,
        fontWeight: '900',
        color: COLORS.primaryDark,
        letterSpacing: 0.5,
    },
    headerSubBrand: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.textSub,
    },
    headerBell: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // List view
    listScroll: {
        padding: 20,
        gap: 14,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 50,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        marginBottom: 4,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: COLORS.textHeader,
        fontWeight: '500',
    },
    riskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(129, 183, 195, 0.06)',
        borderRadius: 16,
        padding: 16,
        gap: 14,
        borderWidth: 1,
        borderColor: 'rgba(129, 183, 195, 0.2)',
    },
    riskCardIcon: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: 'rgba(129, 183, 195, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    riskCardBody: {
        flex: 1,
        gap: 4,
    },
    riskCardTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.textHeader,
        lineHeight: 19,
    },
    riskCardDesc: {
        fontSize: 12,
        color: COLORS.textSub,
        fontWeight: '500',
        lineHeight: 17,
    },
    // Detail view
    detailScroll: {
        padding: 20,
        paddingBottom: 100,
        gap: 18,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.textHeader,
        letterSpacing: -0.5,
    },
    statsPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    gaugeWrap: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    gaugeCenterOverlay: {
        position: 'absolute',
        alignItems: 'center',
    },
    gaugeCenterLabel: {
        fontSize: 11,
        color: COLORS.textSub,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    gaugeCenterValue: {
        fontSize: 30,
        fontWeight: '900',
        color: COLORS.textHeader,
        lineHeight: 34,
    },
    statBoxCol: {
        flex: 1,
        gap: 8,
    },
    statBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        backgroundColor: COLORS.white,
    },
    statBoxRed: {
        backgroundColor: 'rgba(234, 67, 53, 0.05)',
        borderColor: 'rgba(234, 67, 53, 0.2)',
    },
    statBoxLabel: {
        fontSize: 12,
        color: COLORS.textSub,
        fontWeight: '600',
        flex: 1,
    },
    statBoxNum: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.textHeader,
    },
    riskInfoCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        gap: 10,
    },
    riskInfoTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.textHeader,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.primaryDark,
        opacity: 0.25,
    },
    riskInfoDesc: {
        fontSize: 13,
        color: COLORS.textSub,
        fontWeight: '500',
        lineHeight: 20,
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    backLinkText: {
        fontSize: 12,
        color: COLORS.textSub,
        fontWeight: '600',
    },
    warningBanner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: 'rgba(129, 183, 195, 0.08)',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(129, 183, 195, 0.2)',
    },
    warningText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '500',
        lineHeight: 19,
    },
    feedbackBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: COLORS.primaryDark,
        borderRadius: 14,
        padding: 16,
    },
    feedbackText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.white,
        fontWeight: '600',
        lineHeight: 19,
    },
});
