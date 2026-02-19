import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Modal,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import WaveBackground from '../components/WaveBackground';
import { calculateRisk } from '../utils/calculator';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const InputField = ({ label, placeholder, value, onChangeText, keyboardType = 'default' }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}*</Text>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textPlaceholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
        />
    </View>
);

const RadioGroup = ({ label, options, selectedValue, onValueChange }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}*</Text>
        <View style={styles.radioRow}>
            {options.map((opt) => (
                <TouchableOpacity
                    key={opt}
                    style={[styles.radioButton, selectedValue === opt && styles.radioButtonActive]}
                    onPress={() => onValueChange(opt)}
                >
                    <Text style={[styles.radioText, selectedValue === opt && styles.radioTextActive]}>{opt}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

const CheckboxGroup = ({ label, options, selectedValues, onToggle }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}*</Text>
        <View style={styles.checkboxContainer}>
            {options.map((opt) => (
                <TouchableOpacity
                    key={opt}
                    style={[styles.checkboxButton, selectedValues.includes(opt) && styles.checkboxButtonActive]}
                    onPress={() => onToggle(opt)}
                >
                    <Text style={[styles.checkboxText, selectedValues.includes(opt) && styles.checkboxTextActive]}>{opt}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

export default function InputScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        archiveNo: '',
        patientName: '',
        maternalAge: '',
        gestationalAge: '',
        weightGain: '',
        smoking: 'No',
        gestDiabetes: 'No',
        history: 'No',
        pregestDiabetes: 'No',
        insulin: 'No',
        laborAug: 'No',
        laborInd: 'No',
        vacuum: 'No',
        epidural: 'No',
        admissionTime: '',
        birthTime: '',
        neonatalSex: 'Male',
        birthWeight: '',
        bpd: '',
        hc: '',
        ac: '',
        fl: '',
        parity: '',
        gravidity: '',
        efw: '',
        shoulderDystocia: 'No',
        neonatalComplications: [],
        maternalComplications: []
    });

    const toggleComplication = (list, val) => {
        const current = [...formData[list]];
        const index = current.indexOf(val);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(val);
        }
        setFormData({ ...formData, [list]: current });
    };

    const handleCalculate = async () => {
        setLoading(true);

        // Simulate calculation time as seen in design
        setTimeout(async () => {
            const result = calculateRisk({
                maternalAge: parseInt(formData.maternalAge) || 0,
                bmi: 25, // Mocking BMI for now as it's not in the form but in the formula
                efw: parseInt(formData.efw) || 0,
                diabetes: formData.gestDiabetes === 'Yes' || formData.pregestDiabetes === 'Yes',
                history: formData.history === 'Yes'
            });

            // Fire and forget, catch errors silently
            addDoc(collection(db, "calculations"), {
                ...formData,
                result: result,
                timestamp: serverTimestamp()
            }).catch(e => console.error("Firebase save error:", e));

            setLoading(false);
            navigation.navigate('Result', { score: result.score, risk: result.category });
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <WaveBackground color={COLORS.primary} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textHeader} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Back to Home Page</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.formContainer}>
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputField label="Archive No" placeholder="Enter No" value={formData.archiveNo} onChangeText={(v) => setFormData({ ...formData, archiveNo: v })} />
                            </View>
                            <View style={{ flex: 1.5 }}>
                                <InputField label="Patient Name" placeholder="Enter Name" value={formData.patientName} onChangeText={(v) => setFormData({ ...formData, patientName: v })} />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputField label="Maternal Age" placeholder="Age" keyboardType="numeric" value={formData.maternalAge} onChangeText={(v) => setFormData({ ...formData, maternalAge: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputField label="Gestational Age" placeholder="Weeks" keyboardType="numeric" value={formData.gestationalAge} onChangeText={(v) => setFormData({ ...formData, gestationalAge: v })} />
                            </View>
                        </View>

                        <InputField label="Total weight gain during pregnancy" placeholder="Enter weight (kg)" keyboardType="numeric" value={formData.weightGain} onChangeText={(v) => setFormData({ ...formData, weightGain: v })} />

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <RadioGroup label="Smoking" options={['Yes', 'No']} selectedValue={formData.smoking} onValueChange={(v) => setFormData({ ...formData, smoking: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <RadioGroup label="Gestational diabetes" options={['Yes', 'No']} selectedValue={formData.gestDiabetes} onValueChange={(v) => setFormData({ ...formData, gestDiabetes: v })} />
                            </View>
                        </View>

                        <RadioGroup label="History of shoulder dystocia in a previous pregnancy" options={['Yes', 'No']} selectedValue={formData.history} onValueChange={(v) => setFormData({ ...formData, history: v })} />

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <RadioGroup label="Pregestational diabetes" options={['Yes', 'No']} selectedValue={formData.pregestDiabetes} onValueChange={(v) => setFormData({ ...formData, pregestDiabetes: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <RadioGroup label="Insulin Therapy" options={['Yes', 'No']} selectedValue={formData.insulin} onValueChange={(v) => setFormData({ ...formData, insulin: v })} />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <RadioGroup label="Labor augmentation" options={['Yes', 'No']} selectedValue={formData.laborAug} onValueChange={(v) => setFormData({ ...formData, laborAug: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <RadioGroup label="Labor induction" options={['Yes', 'No']} selectedValue={formData.laborInd} onValueChange={(v) => setFormData({ ...formData, laborInd: v })} />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <RadioGroup label="Vacuum extracted delivery" options={['Yes', 'No']} selectedValue={formData.vacuum} onValueChange={(v) => setFormData({ ...formData, vacuum: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <RadioGroup label="Epidural Analgesia" options={['Yes', 'No']} selectedValue={formData.epidural} onValueChange={(v) => setFormData({ ...formData, epidural: v })} />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputField label="Admission Time" placeholder="HH:MM" value={formData.admissionTime} onChangeText={(v) => setFormData({ ...formData, admissionTime: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputField label="Time of birth" placeholder="HH:MM" value={formData.birthTime} onChangeText={(v) => setFormData({ ...formData, birthTime: v })} />
                            </View>
                        </View>

                        <RadioGroup label="Neonatal sex" options={['Male', 'Female']} selectedValue={formData.neonatalSex} onValueChange={(v) => setFormData({ ...formData, neonatalSex: v })} />

                        <InputField label="Birth weight" placeholder="kg" keyboardType="numeric" value={formData.birthWeight} onChangeText={(v) => setFormData({ ...formData, birthWeight: v })} />

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputField label="Biparietal diameter (BPD)" placeholder="mm" keyboardType="numeric" value={formData.bpd} onChangeText={(v) => setFormData({ ...formData, bpd: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputField label="Head circumference (HC)" placeholder="mm" keyboardType="numeric" value={formData.hc} onChangeText={(v) => setFormData({ ...formData, hc: v })} />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputField label="Abdominal circumference (AC)" placeholder="mm" keyboardType="numeric" value={formData.ac} onChangeText={(v) => setFormData({ ...formData, ac: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputField label="Femur length (FL)" placeholder="mm" keyboardType="numeric" value={formData.fl} onChangeText={(v) => setFormData({ ...formData, fl: v })} />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputField label="Parity" placeholder="0" keyboardType="numeric" value={formData.parity} onChangeText={(v) => setFormData({ ...formData, parity: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputField label="Gravidity" placeholder="0" keyboardType="numeric" value={formData.gravidity} onChangeText={(v) => setFormData({ ...formData, gravidity: v })} />
                            </View>
                        </View>

                        <InputField label="Estimated weight (EFW)" placeholder="g" keyboardType="numeric" value={formData.efw} onChangeText={(v) => setFormData({ ...formData, efw: v })} />

                        <RadioGroup label="Shoulder dystocia" options={['Yes', 'No']} selectedValue={formData.shoulderDystocia} onValueChange={(v) => setFormData({ ...formData, shoulderDystocia: v })} />

                        <CheckboxGroup
                            label="Neonatal complications"
                            options={['HIE', 'Brachial plexus injury', 'Clavicle fracture', 'Humerus fracture']}
                            selectedValues={formData.neonatalComplications}
                            onToggle={(v) => toggleComplication('neonatalComplications', v)}
                        />

                        <CheckboxGroup
                            label="Maternal complications"
                            options={['Severe perineal laceration', 'Postpartum hemorrhage (PPH)']}
                            selectedValues={formData.maternalComplications}
                            onToggle={(v) => toggleComplication('maternalComplications', v)}
                        />

                        <TouchableOpacity
                            style={styles.calculateButton}
                            onPress={handleCalculate}
                        >
                            <Text style={styles.calculateButtonText}>Calculate</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Loading Modal */}
            <Modal visible={loading} transparent animationType="fade">
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                        <Text style={styles.loadingText}>Calculating...</Text>
                    </View>
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
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 15,
    },
    backButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textHeader,
        marginLeft: 5,
    },
    scrollContent: {
        paddingHorizontal: 22,
        paddingBottom: 60,
    },
    formContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 20,
        gap: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F8F9FA',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    inputGroup: {
        marginBottom: 8,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.textHeader,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#E8ECF4',
        fontSize: 15,
        color: COLORS.textHeader,
        fontWeight: '500',
    },
    radioRow: {
        flexDirection: 'row',
        gap: 12,
    },
    radioButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
    radioButtonActive: {
        backgroundColor: COLORS.primaryDark,
        borderColor: COLORS.primaryDark,
    },
    radioText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSub,
    },
    radioTextActive: {
        color: COLORS.white,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    checkboxButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8ECF4',
    },
    checkboxButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    checkboxText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textSub,
    },
    checkboxTextActive: {
        color: COLORS.white,
    },
    calculateButton: {
        backgroundColor: COLORS.primaryDark,
        height: 55,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    calculateButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '800',
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingBox: {
        backgroundColor: COLORS.white,
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        gap: 15,
    },
    loadingText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '600',
    }
});
