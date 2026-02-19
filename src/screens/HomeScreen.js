import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import WaveBackground from '../components/WaveBackground';
import { db } from '../services/firebaseConfig';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

const PatientCard = ({ item }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View>
                <Text style={styles.patientName}>{item.patientName || 'Unknown Patient'}</Text>
                <Text style={styles.archiveNo}>Archive: {item.archiveNo || '-'}</Text>
            </View>
            <View style={[
                styles.riskBadge,
                { backgroundColor: item.result?.category === 'High' ? 'rgba(234, 67, 53, 0.1)' : 'rgba(24, 192, 122, 0.1)' }
            ]}>
                <Text style={[
                    styles.riskText,
                    { color: item.result?.category === 'High' ? '#EA4335' : '#18C07A' }
                ]}>
                    {item.result?.category || 'Unknown'}
                </Text>
            </View>
        </View>

        <View style={styles.cardDetails}>
            <Text style={styles.detailText}>Score: %{item.result?.score || 0}</Text>
            <Text style={styles.detailText}>Date: {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleDateString() : 'Just now'}</Text>
        </View>
    </View>
);

export default function HomeScreen({ navigation }) {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // Use a real-time listener with a limit for faster initial load
        const q = query(
            collection(db, "calculations"),
            orderBy("timestamp", "desc"),
            limit(20)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setPatients(list);
            setLoading(false);
            setRefreshing(false);
        }, (error) => {
            console.error("Error listening to patients: ", error);
            setLoading(false);
            setRefreshing(false);
        });

        // Clean up listener on unmount
        return () => unsubscribe();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        // Loading is handled by onSnapshot automatically, 
        // but we set refreshing to true to show the spinner.
        // It will be set to false when the next snapshot arrives.
    };

    return (
        <SafeAreaView style={styles.container}>
            <WaveBackground color={COLORS.primary} />
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, Doctor</Text>
                    <Text style={styles.subtitle}>Welcome back</Text>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Patient Overview</Text>

                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
                ) : (
                    <FlatList
                        data={patients}
                        renderItem={({ item }) => <PatientCard item={item} />}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Ionicons name="documents-outline" size={48} color={COLORS.textPlaceholder} />
                                <Text style={styles.emptyText}>No patient records found.</Text>
                                <Text style={styles.emptySubText}>Calculated risks will appear here.</Text>
                            </View>
                        }
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
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
        paddingTop: 20,
        paddingBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSub,
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8ECF4',
    },
    content: {
        flex: 1,
        paddingHorizontal: 22,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textHeader,
        marginBottom: 15,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    patientName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textHeader,
    },
    archiveNo: {
        fontSize: 12,
        color: COLORS.textSub,
        marginTop: 2,
    },
    riskBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    riskText: {
        fontSize: 12,
        fontWeight: '700',
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        paddingTop: 10,
    },
    detailText: {
        fontSize: 13,
        color: COLORS.textSub,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textHeader,
        marginTop: 15,
    },
    emptySubText: {
        fontSize: 14,
        color: COLORS.textSub,
        marginTop: 5,
    },
});
