import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
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

    const handleLogin = () => {
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Login</Text>
                <View style={{ width: 41 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.brandName}>MID-DEC</Text>
                    <Text style={styles.brandSlogan}>Risk Calculator</Text>
                </View>

                <View style={styles.welcomeSection}>
                    <Text style={styles.title}>Welcome back!</Text>
                </View>

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

                    <TouchableOpacity onPress={handleLogin}>
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
                        <Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
                            style={{ width: 20, height: 20, marginRight: 10 }}
                        />
                        <Text style={styles.googleButtonText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.footerLink}>Register Now</Text>
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
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    scrollContent: {
        paddingHorizontal: 22,
        paddingBottom: 100,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: 'rgba(129, 183, 195, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    brandName: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.primaryDark,
        marginTop: 15,
        letterSpacing: 1.5,
    },
    brandSlogan: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    welcomeSection: {
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.textHeader,
        letterSpacing: -0.5,
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        height: 56,
        backgroundColor: '#F7F8F9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    input: {
        fontSize: 15,
        color: COLORS.textHeader,
        fontWeight: '500',
    },
    eyeIcon: {
        position: 'absolute',
        right: 18,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    checkboxActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    rowText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSub,
    },
    forgotText: {
        color: COLORS.primaryDark,
        fontWeight: '700',
    },
    errorText: {
        color: '#EA4335',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: -4,
    },
    loginButton: {
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8ECF4',
    },
    dividerText: {
        paddingHorizontal: 15,
        fontSize: 13,
        fontWeight: '700',
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
        backgroundColor: COLORS.white,
    },
    googleButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    footerText: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.textSub,
    },
    footerLink: {
        fontSize: 15,
        fontWeight: '800',
        color: COLORS.primaryDark,
    },
    bottomWave: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        zIndex: -1,
        opacity: 0.5,
    }
});
