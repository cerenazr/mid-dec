import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import WaveBackground from '../components/WaveBackground';

const { width } = Dimensions.get('window');

export default function ResultScreen({ route, navigation }) {
    const { score = 45, risk = 'High' } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <WaveBackground color={COLORS.primary} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MainTabs')}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Back to Home Page</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.mainTitle}>Risk Assessment Result</Text>
                <Text style={styles.subTitle}>
                    Based on the entered parameters, the estimated risk level is shown below.
                </Text>

                <View style={styles.resultContainer}>
                    <View style={[styles.progressCircle, { borderColor: risk === 'High' ? '#EA4335' : '#18C07A' }]}>
                        <Text style={styles.scoreText}>%{score}</Text>
                    </View>

                    <View style={[styles.riskBadge, { backgroundColor: risk === 'High' ? 'rgba(234, 67, 53, 0.1)' : 'rgba(24, 192, 122, 0.1)' }]}>
                        <Ionicons name="warning" size={16} color={risk === 'High' ? '#EA4335' : '#18C07A'} />
                        <Text style={[styles.riskBadgeText, { color: risk === 'High' ? '#EA4335' : '#18C07A' }]}>
                            {risk}-risk detected.
                        </Text>
                    </View>

                    <Text style={styles.recommendation}>
                        {risk === 'High'
                            ? 'Physician presence is recommended.'
                            : 'Standard obstetric management is sufficient.'}
                    </Text>

                    <View style={styles.warningBox}>
                        <Ionicons name="alert-circle" size={18} color={COLORS.textSub} />
                        <Text style={styles.warningText}>
                            This assessment is based on medical data and provides a statistical estimate.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save Patient Record</Text>
                    </TouchableOpacity>
                </View>
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
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 15,
    },
    backButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textHeader,
        marginLeft: 5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: 'center',
        paddingTop: 10,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.textHeader,
        marginTop: 10,
    },
    subTitle: {
        fontSize: 13,
        color: COLORS.textSub,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 18,
    },
    resultContainer: {
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
    },
    progressCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    scoreText: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.textHeader,
    },
    riskBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 8,
        marginBottom: 15,
    },
    riskBadgeText: {
        fontSize: 14,
        fontWeight: '700',
    },
    recommendation: {
        fontSize: 14,
        color: COLORS.textSub,
        textAlign: 'center',
        marginBottom: 40,
    },
    warningBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.03)',
        padding: 15,
        borderRadius: 12,
        gap: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8ECF4',
        marginBottom: 30,
    },
    warningText: {
        flex: 1,
        fontSize: 11,
        color: COLORS.textSub,
        lineHeight: 15,
    },
    saveButton: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primaryDark,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '700',
    },
    bottomTabs: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E8ECF4',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    tab: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 10,
        color: COLORS.textSub,
        marginTop: 4,
    },
    tabActive: {
        backgroundColor: COLORS.primaryDark,
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        marginTop: -40,
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    }
});
