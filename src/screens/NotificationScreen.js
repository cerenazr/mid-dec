import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { db } from '../services/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';

const formatTime = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const d = timestamp.toDate();
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return d.toLocaleDateString('en-GB');
};

export default function NotificationScreen({ navigation }) {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'calculations'),
            where('result.category', '==', 'High'),
            orderBy('timestamp', 'desc'),
            limit(50)
        );

        const unsubscribe = onSnapshot(
            q,
            (snap) => {
                const list = [];
                snap.forEach((docSnap) => {
                    list.push({ id: docSnap.id, ...docSnap.data() });
                });
                setAlerts(list);
                setLoading(false);
            },
            () => setLoading(false)
        );

        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
            ) : alerts.length === 0 ? (
                <View style={styles.empty}>
                    <Ionicons name="notifications-off-outline" size={52} color={COLORS.textPlaceholder} />
                    <Text style={styles.emptyTitle}>No Notifications</Text>
                    <Text style={styles.emptyText}>High-risk patient alerts will appear here.</Text>
                </View>
            ) : (
                <FlatList
                    data={alerts}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.alertCard}>
                            <View style={styles.alertIconBox}>
                                <Ionicons name="warning" size={20} color="#EA4335" />
                            </View>
                            <View style={styles.alertBody}>
                                <View style={styles.alertTopRow}>
                                    <View style={styles.highBadge}>
                                        <Ionicons name="warning" size={10} color="#EA4335" />
                                        <Text style={styles.highBadgeText}>High-risk</Text>
                                    </View>
                                    <Text style={styles.alertTime}>{formatTime(item.timestamp)}</Text>
                                </View>
                                <Text style={styles.alertMessage}>High-risk detected.</Text>
                                <Text style={styles.alertSub}>
                                    Physician notification is recommended.
                                </Text>
                                {item.patientName ? (
                                    <Text style={styles.alertPatient}>Patient: {item.patientName}</Text>
                                ) : null}
                            </View>
                        </View>
                    )}
                />
            )}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    loader: {
        marginTop: 60,
    },
    list: {
        padding: 20,
        gap: 12,
    },
    alertCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF8F8',
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(234, 67, 53, 0.12)',
        gap: 12,
    },
    alertIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(234, 67, 53, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    alertBody: {
        flex: 1,
        gap: 3,
    },
    alertTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    highBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(234, 67, 53, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        gap: 4,
    },
    highBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#EA4335',
    },
    alertTime: {
        fontSize: 11,
        color: COLORS.textSub,
        fontWeight: '500',
    },
    alertMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    alertSub: {
        fontSize: 13,
        color: COLORS.textSub,
        fontWeight: '500',
    },
    alertPatient: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
        marginTop: 2,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.textHeader,
    },
    emptyText: {
        fontSize: 14,
        color: COLORS.textSub,
        textAlign: 'center',
        lineHeight: 21,
    },
});
