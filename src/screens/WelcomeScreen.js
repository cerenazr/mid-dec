import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import WaveBackground from '../components/WaveBackground';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Blue Top Section */}
            <View style={styles.topSection}>
                <View style={styles.logoCircle}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.appName}>MID-DEC</Text>
                <Text style={styles.appSub}>Mobile Calculation</Text>
            </View>

            {/* White Bottom Section */}
            <View style={styles.bottomSection}>
                <WaveBackground color={COLORS.white} inverted={true} />
                <View style={styles.content}>
                    <Text style={styles.description}>
                        Estimate the risk of shoulder dystocia in childbirth based on clinical parameters.
                    </Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.loginButton}
                            >
                                <Text style={styles.loginButtonText}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    topSection: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    logoCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        overflow: 'hidden',
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    appName: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.white,
        letterSpacing: 2,
    },
    appSub: {
        fontSize: 14,
        color: COLORS.white,
        opacity: 0.9,
        marginTop: 5,
    },
    bottomSection: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: 50,
        alignItems: 'center',
    },
    description: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        color: COLORS.link,
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        gap: 15,
    },
    loginButton: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: COLORS.white,
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 15,
    },
    registerButton: {
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.textSub,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    registerButtonText: {
        color: COLORS.textSub,
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 15,
    },
});
