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
import WaveBackground from '../components/WaveBackground';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <WaveBackground color={COLORS.primary} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Welcome back!</Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor={COLORS.textPlaceholder}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor={COLORS.textPlaceholder}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={22}
                                color={COLORS.textSub}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.rememberRow}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                                {rememberMe && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                            </View>
                            <Text style={styles.rowText}>Remember me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={[styles.rowText, styles.forgotText]}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Input')}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>Or Login with</Text>
                        <View style={styles.line} />
                    </View>

                    <TouchableOpacity style={styles.googleButton}>
                        <Ionicons name="logo-google" size={20} color="#EA4335" style={{ marginRight: 10 }} />
                        <Text style={styles.googleButtonText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.footerLink}>Register Now</Text>
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
        lineHeight: 39,
        letterSpacing: -0.3,
        marginBottom: 40,
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
    eyeIcon: {
        position: 'absolute',
        right: 18,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    rowText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textSub,
    },
    forgotText: {
        textDecorationLine: 'underline',
    },
    loginButton: {
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8ECF4',
    },
    dividerText: {
        paddingHorizontal: 15,
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSub,
    },
    googleButton: {
        height: 56,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSub,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20,
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
