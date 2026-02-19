import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import WaveBackground from '../components/WaveBackground';

const JOBS = ['Midwife', 'Physician', 'Nurse'];

export default function RegisterScreen({ navigation }) {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        job: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showJobModal, setShowJobModal] = useState(false);
    const [showAgreementModal, setShowAgreementModal] = useState(false);
    const [agreed, setAgreed] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <WaveBackground color={COLORS.primary} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Get started!</Text>
                    <Text style={styles.subTitle}>Create an account to get started.</Text>

                    <View style={styles.form}>
                        {/* ... existing fields ... */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                placeholderTextColor={COLORS.textPlaceholder}
                                value={formData.name}
                                onChangeText={(val) => setFormData({ ...formData, name: val })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Surname"
                                placeholderTextColor={COLORS.textPlaceholder}
                                value={formData.surname}
                                onChangeText={(val) => setFormData({ ...formData, surname: val })}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.inputContainer, styles.jobSelector]}
                            onPress={() => setShowJobModal(true)}
                        >
                            <Text style={[styles.input, !formData.job && { color: COLORS.textPlaceholder }]}>
                                {formData.job || 'Job'}
                            </Text>
                            <Ionicons name="chevron-down" size={18} color={COLORS.textSub} />
                        </TouchableOpacity>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="E-Mail"
                                placeholderTextColor={COLORS.textPlaceholder}
                                value={formData.email}
                                onChangeText={(val) => setFormData({ ...formData, email: val })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor={COLORS.textPlaceholder}
                                secureTextEntry
                                value={formData.password}
                                onChangeText={(val) => setFormData({ ...formData, password: val })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor={COLORS.textPlaceholder}
                                secureTextEntry
                                value={formData.confirmPassword}
                                onChangeText={(val) => setFormData({ ...formData, confirmPassword: val })}
                            />
                        </View>

                        <View style={styles.agreeRow}>
                            <TouchableOpacity
                                style={[styles.checkbox, agreed && styles.checkboxActive]}
                                onPress={() => setAgreed(!agreed)}
                            >
                                {agreed && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                            </TouchableOpacity>
                            <Text style={styles.agreeText}>
                                I have read, understood, and agree to the{' '}
                                <Text
                                    style={styles.linkText}
                                    onPress={() => setShowAgreementModal(true)}
                                >
                                    User Agreement.
                                </Text>
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.registerButton}
                            >
                                <Text style={styles.registerButtonText}>Register</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.footerLink}>Login Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Job Selection Modal */}
            <Modal visible={showJobModal} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowJobModal(false)}
                >
                    <View style={styles.modalContent}>
                        {JOBS.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[styles.jobItem, formData.job === item && styles.jobItemActive]}
                                onPress={() => {
                                    setFormData({ ...formData, job: item });
                                    setShowJobModal(false);
                                }}
                            >
                                <Text style={[styles.jobItemText, formData.job === item && styles.jobItemTextActive]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* User Agreement Modal */}
            <Modal visible={showAgreementModal} animationType="slide" presentationStyle="pageSheet">
                <View style={styles.agreementContainer}>
                    <View style={styles.agreementHeader}>
                        <Text style={styles.agreementTitle}>User Agreement</Text>
                        <TouchableOpacity onPress={() => setShowAgreementModal(false)}>
                            <Ionicons name="close" size={24} color={COLORS.textHeader} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.agreementContent}>
                        <Text style={styles.agreementText}>
                            By accessing or using this application, you agree to the terms and conditions outlined below.
                            {'\n\n'}
                            1. Purpose of the Application{'\n'}
                            This application is designed to provide a machine learning-based risk estimation for shoulder dystocia during childbirth, based on clinical and ultrasound parameters entered by the user.
                            {'\n\n'}
                            2. Medical Disclaimer{'\n'}
                            The results provided by this application are risk estimations only and do not constitute medical advice, diagnosis, or treatment. Clinical evaluation and the final medical decision remain the sole responsibility of the healthcare professional.
                            {'\n'}
                            The application is intended to serve as a clinical decision support tool and should not replace professional judgment.
                            {'\n\n'}
                            3. User Responsibility{'\n'}
                            Users are responsible for:
                            {'\n'}• Entering accurate and complete data
                            {'\n'}• Interpreting the results within an appropriate clinical context
                            {'\n'}• Using the application in accordance with applicable medical and ethical standards
                        </Text>
                    </ScrollView>
                </View>
            </Modal>
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
        letterSpacing: -0.3,
    },
    subTitle: {
        fontSize: 15,
        color: COLORS.textSub,
        marginTop: 5,
        marginBottom: 30,
    },
    form: {
        gap: 12,
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
    jobSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        fontSize: 15,
        color: COLORS.textHeader,
    },
    agreeRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        marginBottom: 20,
        paddingRight: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    checkboxActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    agreeText: {
        fontSize: 14,
        color: COLORS.textSub,
        lineHeight: 18,
    },
    registerButton: {
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 50,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 254,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#E8ECF4',
    },
    jobItem: {
        height: 39,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    jobItemActive: {
        backgroundColor: 'rgba(129, 183, 195, 0.51)',
    },
    jobItemText: {
        fontSize: 16,
        color: COLORS.textSub,
        fontWeight: '500',
    },
    jobItemTextActive: {
        color: COLORS.textHeader,
    },
    linkText: {
        color: COLORS.link,
        fontWeight: '600',
    },
    agreementContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 20,
    },
    agreementHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8ECF4',
    },
    agreementTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textHeader,
    },
    agreementContent: {
        padding: 20,
        paddingBottom: 50,
    },
    agreementText: {
        fontSize: 15,
        color: COLORS.textSub,
        lineHeight: 24,
    },
});
