import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import WaveBackground from '../components/WaveBackground';
import CustomGauge from '../components/CustomGauge';
import { db } from '../services/firebaseConfig';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

const PatientCard = ({ item }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <CustomGauge
                    percentage={item.result?.score || 0}
                    size={45}
                    strokeWidth={5}
                    fontSize={10}
                    riskLevel={item.result?.category || 'Unknown'}
                />
                <View>
                    <Text style={styles.patientName}>{item.patientName || 'Unknown Patient'}</Text>
                    <Text style={styles.archiveNo}>ID: {item.archiveNo || '-'}</Text>
                </View>
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
            {/* Removed Score: %{item.result?.score || 0} */}
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
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.headerLogo}
                    resizeMode="contain"
                />
                <TouchableOpacity
                    style={styles.profileCircle}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Ionicons name="person" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.greeting}>Welcome, Doctor!</Text>
                    <Text style={styles.subtitle}>Track and assess patient risks easily.</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={COLORS.textPlaceholder} />
                    <Text style={styles.searchText}>Search patient records...</Text>
                </View>

                <Text style={styles.sectionTitle}>Recent Assessments</Text>

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
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                )}
            </View>
            <View style={styles.bottomWave}>
                <WaveBackground color={COLORS.primary} inverted={false} />
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
        paddingBottom: 10,
    },
    headerLogo: {
        width: 100,
        height: 40,
    },
    profileCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8ECF4',
    },
    content: {
        flex: 1,
        paddingHorizontal: 22,
    },
    welcomeSection: {
        marginTop: 10,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 26,
        fontWeight: '800',
        color: COLORS.textHeader,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSub,
        marginTop: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#E8ECF4',
    },
    searchText: {
        marginLeft: 10,
        color: COLORS.textPlaceholder,
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textHeader,
        marginBottom: 15,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    patientName: {
        fontSize: 17,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    archiveNo: {
        fontSize: 13,
        color: COLORS.textSub,
        marginTop: 2,
    },
    riskBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    riskText: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F8F9FA',
        paddingTop: 12,
    },
    detailText: {
        fontSize: 13,
        color: COLORS.textSub,
        fontWeight: '600',
    },
    bottomWave: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        height: 100,
        opacity: 0.6,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
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
