import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    Image,
    Platform,
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

    const handleRegister = () => {
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Register</Text>
                <View style={{ width: 41 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.title}>Get started!</Text>
                </View>

                <View style={styles.form}>
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

                    <TouchableOpacity onPress={handleRegister}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.registerButton}
                        >
                            <Text style={styles.registerButtonText}>Register</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>Or Register with</Text>
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
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Login Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.bottomWave}>
                <WaveBackground color={COLORS.primary} />
            </View>

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
                    <TouchableOpacity
                        style={styles.agreementButton}
                        onPress={() => {
                            setAgreed(true);
                            setShowAgreementModal(false);
                        }}
                    >
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryDark]}
                            style={styles.agreementButtonGradient}
                        >
                            <Text style={styles.agreementButtonText}>Accept</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
    welcomeSection: {
        marginTop: 20,
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.textHeader,
        letterSpacing: -0.5,
    },
    form: {
        gap: 14,
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
    jobSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        fontSize: 15,
        color: COLORS.textHeader,
        fontWeight: '500',
    },
    agreeRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 6,
        marginBottom: 10,
        paddingRight: 20,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#E8ECF4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    agreeText: {
        fontSize: 13,
        color: COLORS.textSub,
        lineHeight: 18,
        fontWeight: '500',
    },
    linkText: {
        color: COLORS.primaryDark,
        fontWeight: '700',
    },
    registerButton: {
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
    registerButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    errorText: {
        color: '#EA4335',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: -4,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8ECF4',
    },
    dividerText: {
        paddingHorizontal: 15,
        fontSize: 12,
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
        marginTop: 30,
        paddingBottom: 20,
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        maxWidth: 300,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    jobItem: {
        height: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    jobItemActive: {
        backgroundColor: 'rgba(129, 183, 195, 0.1)',
    },
    jobItemText: {
        fontSize: 16,
        color: COLORS.textHeader,
        fontWeight: '600',
    },
    jobItemTextActive: {
        color: COLORS.primaryDark,
    },
    agreementContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    agreementHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
    },
    agreementTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.textHeader,
    },
    agreementContent: {
        padding: 22,
    },
    agreementText: {
        fontSize: 15,
        color: COLORS.textSub,
        lineHeight: 24,
        fontWeight: '500',
    },
    agreementButton: {
        padding: 22,
        paddingBottom: Platform.OS === 'ios' ? 40 : 22,
    },
    agreementButtonGradient: {
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    agreementButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
});
