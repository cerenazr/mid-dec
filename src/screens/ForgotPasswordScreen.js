import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

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

                    <TouchableOpacity onPress={() => navigation.navigate('OTPScreen')}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>Send Code</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Remember Password? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Login Now</Text>
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
        fontSize: 14,
        color: COLORS.textSub,
        lineHeight: 21,
        marginBottom: 30,
    },
    form: {
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
