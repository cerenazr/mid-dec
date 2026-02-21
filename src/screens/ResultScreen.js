import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import WaveBackground from '../components/WaveBackground';
import CustomGauge from '../components/CustomGauge';

const { width } = Dimensions.get('window');

export default function ResultScreen({ route, navigation }) {
    const { score = 45, risk = 'High' } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('MainTabs')}
                >
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Risk Assessment</Text>
                <View style={{ width: 41 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}>Assessment Result</Text>
                    <Text style={styles.subTitle}>
                        Based on the clinical parameters and ultrasound measurements provided.
                    </Text>
                </View>

                <View style={styles.resultCard}>
                    <View style={styles.gaugeContainer}>
                        <CustomGauge
                            percentage={score}
                            size={180}
                            strokeWidth={18}
                            fontSize={36}
                            riskLevel={risk}
                        />
                    </View>

                    <View style={[styles.riskBadge, { backgroundColor: risk === 'High' ? 'rgba(234, 67, 53, 0.1)' : 'rgba(24, 192, 122, 0.1)' }]}>
                        <View style={[styles.statusDot, { backgroundColor: risk === 'High' ? '#EA4335' : '#18C07A' }]} />
                        <Text style={[styles.riskBadgeText, { color: risk === 'High' ? '#EA4335' : '#18C07A' }]}>
                            {risk} Risk Detected
                        </Text>
                    </View>

                    <View style={styles.recommendationBox}>
                        <Text style={styles.recTitle}>Recommendation</Text>
                        <Text style={styles.recommendationText}>
                            {risk === 'High'
                                ? 'The risk of shoulder dystocia is high. Physician presence during delivery is strongly recommended. Alternative delivery methods should be discussed with the patient.'
                                : 'The risk of shoulder dystocia is low. Standard obstetric management and routine fetal monitoring are sufficient for this patient.'}
                        </Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Ionicons name="information-circle" size={20} color={COLORS.primary} />
                        <Text style={styles.infoText}>
                            This tool provides a statistical estimate only. Final clinical decisions remain the responsibility of the attending physician.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.saveAction} onPress={() => navigation.navigate('MainTabs')}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.saveButton}
                        >
                            <Text style={styles.saveButtonText}>Save Patient Record</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.bottomWave}>
                <WaveBackground color={COLORS.primary} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingTop: 10,
        height: 60,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    backButton: {
        width: 41,
        height: 41,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F1F3F5',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    scrollContent: {
        paddingHorizontal: 22,
        paddingBottom: 120,
    },
    titleSection: {
        marginTop: 20,
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.textHeader,
    },
    subTitle: {
        fontSize: 14,
        color: COLORS.textSub,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    resultCard: {
        marginTop: 30,
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: 25,
        alignItems: 'center',
        // Shadow for the result card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#F1F3F5',
    },
    gaugeContainer: {
        marginBottom: 25,
    },
    riskBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 8,
        marginBottom: 25,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    riskBadgeText: {
        fontSize: 15,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    recommendationBox: {
        width: '100%',
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E8ECF4',
    },
    recTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.textHeader,
        marginBottom: 8,
    },
    recommendationText: {
        fontSize: 14,
        color: COLORS.textSub,
        lineHeight: 22,
        fontWeight: '500',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(129, 183, 195, 0.05)',
        padding: 15,
        borderRadius: 12,
        gap: 12,
        alignItems: 'center',
        marginBottom: 30,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.textSub,
        lineHeight: 18,
        fontWeight: '500',
    },
    saveAction: {
        width: '100%',
    },
    saveButton: {
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    bottomWave: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        zIndex: -1,
        opacity: 0.5,
    }
});
