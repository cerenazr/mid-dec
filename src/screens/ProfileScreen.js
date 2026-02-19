import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import WaveBackground from '../components/WaveBackground';

const ProfileOption = ({ icon, label, onPress, isDestructive }) => (
    <TouchableOpacity style={styles.optionItem} onPress={onPress}>
        <View style={styles.optionLeft}>
            <View style={[styles.iconBox, isDestructive && styles.iconBoxDestructive]}>
                <Ionicons name={icon} size={20} color={isDestructive ? '#EA4335' : COLORS.primary} />
            </View>
            <Text style={[styles.optionLabel, isDestructive && styles.textDestructive]}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textSub} />
    </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>User Profile</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.avatarLogo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.name}>Dr. Sarah Wilson</Text>
                    <Text style={styles.role}>Healthcare Professional</Text>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>sarah.wilson@hospital.com</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Institution</Text>
                        <Text style={styles.infoValue}>City Hospital Group</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Phone</Text>
                        <Text style={styles.infoValue}>+90 555 123 4567</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Settings</Text>
                    <ProfileOption icon="notifications-outline" label="Notifications" />
                    <ProfileOption icon="shield-checkmark-outline" label="Privacy & Security" />
                    <ProfileOption icon="help-circle-outline" label="Help Support" />
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Welcome' }],
                    })}
                >
                    <Ionicons name="log-out-outline" size={20} color="#EA4335" />
                    <Text style={styles.logoutText}>Log Out Account</Text>
                </TouchableOpacity>
            </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    content: {
        paddingHorizontal: 22,
        paddingBottom: 100,
    },
    profileHeader: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#F0F7F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E8ECF4',
    },
    avatarLogo: {
        width: 60,
        height: 60,
    },
    name: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.textHeader,
    },
    role: {
        fontSize: 14,
        color: COLORS.textSub,
        marginTop: 4,
        fontWeight: '500',
    },
    infoSection: {
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#E8ECF4',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(232, 236, 244, 0.5)',
    },
    infoLabel: {
        fontSize: 14,
        color: COLORS.textSub,
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 14,
        color: COLORS.textHeader,
        fontWeight: '700',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.textSub,
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F9FA',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconBox: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: 'rgba(129, 183, 195, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.textHeader,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(234, 67, 53, 0.05)',
        paddingVertical: 16,
        borderRadius: 14,
        marginTop: 20,
        gap: 10,
    },
    logoutText: {
        color: '#EA4335',
        fontSize: 15,
        fontWeight: '700',
    },
    bottomWave: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        height: 100,
        opacity: 0.5,
    },
});
