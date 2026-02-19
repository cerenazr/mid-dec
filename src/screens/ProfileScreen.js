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
            <WaveBackground color={COLORS.primary} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={40} color={COLORS.white} />
                    </View>
                    <Text style={styles.name}>Dr. Sarah Wilson</Text>
                    <Text style={styles.role}>Obstetrician</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>
                    <ProfileOption icon="person-outline" label="Edit Profile" />
                    <ProfileOption icon="notifications-outline" label="Notifications" />
                    <ProfileOption icon="lock-closed-outline" label="Security" />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <ProfileOption icon="help-circle-outline" label="Help & FAQ" />
                    <ProfileOption icon="information-circle-outline" label="About App" />
                </View>

                <View style={styles.section}>
                    <ProfileOption
                        icon="log-out-outline"
                        label="Log Out"
                        isDestructive
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }],
                        })}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        paddingHorizontal: 22,
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    content: {
        padding: 22,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.assessment, // Using primary color
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 4,
        borderColor: '#E1F5FE',
        backgroundColor: COLORS.primary
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    role: {
        fontSize: 14,
        color: COLORS.textSub,
        marginTop: 5,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSub,
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: 'rgba(129, 183, 195, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBoxDestructive: {
        backgroundColor: 'rgba(234, 67, 53, 0.1)',
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textHeader,
    },
    textDestructive: {
        color: '#EA4335',
    },
});
