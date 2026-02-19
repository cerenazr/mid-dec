import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function OTPScreen({ navigation }) {
    const [data, setData] = useState({
        newPassword: '',
        confirmPassword: '',
        otp: ''
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>OTP Verification</Text>
                <Text style={styles.subTitle}>
                    Enter the verification code we just sent on your email address and set your new password.
                </Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            placeholderTextColor={COLORS.textPlaceholder}
                            secureTextEntry
                            value={data.newPassword}
                            onChangeText={(val) => setData({ ...data, newPassword: val })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={COLORS.textPlaceholder}
                            secureTextEntry
                            value={data.confirmPassword}
                            onChangeText={(val) => setData({ ...data, confirmPassword: val })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            placeholderTextColor={COLORS.textPlaceholder}
                            keyboardType="number-pad"
                            value={data.otp}
                            onChangeText={(val) => setData({ ...data, otp: val })}
                        />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('PasswordChanged')}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>Reset Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Didn’t received code? </Text>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}>Resend</Text>
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
        paddingHorizontal: 22,
        paddingTop: 20,
    },
    backButton: {
        width: 41,
        height: 41,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: COLORS.textHeader,
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        color: COLORS.textSub,
        lineHeight: 24,
        marginBottom: 30,
    },
    form: {
        gap: 15,
    },
    inputContainer: {
        height: 56,
        backgroundColor: COLORS.inputBg,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    input: {
        fontSize: 15,
        color: COLORS.textHeader,
    },
    submitButton: {
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    footerText: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.textSub,
    },
    footerLink: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.primaryDark,
    },
});
