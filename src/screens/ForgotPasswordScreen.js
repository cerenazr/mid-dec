import { useState } from 'react';
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
import { auth } from '../services/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendReset = async () => {
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await sendPasswordResetEmail(auth, email.trim());
            setSent(true);
        } catch (e) {
            setError('Email not found. Please check and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subTitle}>
                    Don't worry! It occurs. Please enter the email address linked with your account.
                </Text>

                {sent ? (
                    <View style={styles.successBox}>
                        <Ionicons name="checkmark-circle" size={48} color={COLORS.primary} />
                        <Text style={styles.successTitle}>Email Sent!</Text>
                        <Text style={styles.successText}>
                            A password reset link has been sent to {email}. Check your inbox.
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backToLoginBtn}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitButtonText}>Back to Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.textPlaceholder}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <TouchableOpacity onPress={handleSendReset} disabled={loading}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitButtonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Remember Password? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Login Now</Text>
                    </TouchableOpacity>
                </View>
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
        paddingHorizontal: 22,
        paddingTop: 10,
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
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.textHeader,
        marginBottom: 12,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 14,
        color: COLORS.textSub,
        lineHeight: 21,
        marginBottom: 35,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    form: {
        width: '100%',
        gap: 20,
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
    },
    submitButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '700',
    },
    errorText: {
        color: '#EA4335',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: -8,
    },
    successBox: {
        alignItems: 'center',
        gap: 12,
        width: '100%',
    },
    successTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.textHeader,
    },
    successText: {
        fontSize: 14,
        color: COLORS.textSub,
        textAlign: 'center',
        lineHeight: 21,
    },
    backToLoginBtn: {
        width: '100%',
        marginTop: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textSub,
    },
    footerLink: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primaryDark,
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
