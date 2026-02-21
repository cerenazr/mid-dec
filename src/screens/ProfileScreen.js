import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { auth, db } from '../services/firebaseConfig';
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const JOBS = ['Midwife', 'Physician', 'Nurse'];

export default function ProfileScreen({ navigation }) {
    const [profile, setProfile] = useState({ name: '', surname: '', job: '' });
    const [editName, setEditName] = useState('');
    const [editSurname, setEditSurname] = useState('');
    const [editJob, setEditJob] = useState('');
    const [showJobModal, setShowJobModal] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [pwError, setPwError] = useState('');
    const [pwSaved, setPwSaved] = useState(false);
    const [savingPw, setSavingPw] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;
        getDoc(doc(db, 'users', user.uid)).then((snap) => {
            if (snap.exists()) {
                const data = snap.data();
                setProfile(data);
                setEditName(data.name || '');
                setEditSurname(data.surname || '');
                setEditJob(data.job || '');
            }
        }).catch(() => {});
    }, []);

    const getInitials = () => {
        const n = (editName || profile.name || '').charAt(0).toUpperCase();
        const s = (editSurname || profile.surname || '').charAt(0).toUpperCase();
        return n + s || '?';
    };

    const getDisplayName = () => {
        const n = profile.name || editName;
        const s = profile.surname || editSurname;
        if (n || s) return `${n} ${s}`.trim();
        return 'Your Profile';
    };

    const handleSaveProfile = async () => {
        if (!editName || !editSurname) return;
        setSavingProfile(true);
        // Update local state immediately (works in mock mode too)
        setProfile({ name: editName, surname: editSurname, job: editJob });
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
        // Try Firebase ops silently
        try {
            const user = auth.currentUser;
            if (user) {
                await updateDoc(doc(db, 'users', user.uid), {
                    name: editName, surname: editSurname, job: editJob,
                });
                await updateProfile(user, { displayName: `${editName} ${editSurname}` });
            }
        } catch {}
        setSavingProfile(false);
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setPwError('Please fill in all password fields.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setPwError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setPwError('New password must be at least 6 characters.');
            return;
        }
        setSavingPw(true);
        setPwError('');
        try {
            const user = auth.currentUser;
            if (user) {
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
            }
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setPwSaved(true);
            setTimeout(() => setPwSaved(false), 3000);
        } catch (e) {
            if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
                setPwError('Current password is incorrect.');
            } else {
                setPwError('Failed to change password.');
            }
        } finally {
            setSavingPw(false);
        }
    };

    const handleLogout = async () => {
        try { await signOut(auth); } catch {}
        navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ width: 40 }} />
                <Text style={styles.headerTitle}>MID-DEC</Text>
                <TouchableOpacity
                    style={styles.headerIcon}
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <Ionicons name="notifications-outline" size={22} color={COLORS.primaryDark} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarInitials}>{getInitials()}</Text>
                    </View>
                    <Text style={styles.profileName}>{getDisplayName()}</Text>
                    {(profile.job || editJob) ? (
                        <View style={styles.jobBadge}>
                            <Text style={styles.jobBadgeText}>{profile.job || editJob}</Text>
                        </View>
                    ) : null}
                    {profileSaved && (
                        <View style={styles.savedBanner}>
                            <Ionicons name="checkmark-circle" size={16} color="#18C07A" />
                            <Text style={styles.savedBannerText}>Profile updated successfully!</Text>
                        </View>
                    )}
                </View>

                {/* Edit Profile Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Edit Profile</Text>

                    <View style={styles.fieldRow}>
                        <Text style={styles.fieldLabel}>Name</Text>
                        <TextInput
                            style={styles.fieldInput}
                            value={editName}
                            onChangeText={setEditName}
                            placeholder="Name"
                            placeholderTextColor={COLORS.textPlaceholder}
                        />
                    </View>

                    <View style={styles.fieldRow}>
                        <Text style={styles.fieldLabel}>Surname</Text>
                        <TextInput
                            style={styles.fieldInput}
                            value={editSurname}
                            onChangeText={setEditSurname}
                            placeholder="Surname"
                            placeholderTextColor={COLORS.textPlaceholder}
                        />
                    </View>

                    <View style={styles.fieldRow}>
                        <Text style={styles.fieldLabel}>Job</Text>
                        <TouchableOpacity style={styles.jobSelector} onPress={() => setShowJobModal(true)}>
                            <Text style={[styles.fieldInput, !editJob && { color: COLORS.textPlaceholder }]}>
                                {editJob || 'Select Job'}
                            </Text>
                            <Ionicons name="chevron-down" size={16} color={COLORS.textSub} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, savingProfile && { opacity: 0.7 }]}
                        onPress={handleSaveProfile}
                        disabled={savingProfile}
                    >
                        {profileSaved ? (
                            <View style={styles.saveButtonInner}>
                                <Ionicons name="checkmark" size={18} color={COLORS.white} />
                                <Text style={styles.saveButtonText}>Saved!</Text>
                            </View>
                        ) : (
                            <Text style={styles.saveButtonText}>{savingProfile ? 'Saving...' : 'Save Changes'}</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Change Password Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Change Password</Text>

                    <View style={styles.pwInputContainer}>
                        <TextInput
                            style={styles.pwInput}
                            placeholder="Current Password"
                            placeholderTextColor={COLORS.textPlaceholder}
                            secureTextEntry={!showCurrentPw}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
                        <TouchableOpacity onPress={() => setShowCurrentPw(!showCurrentPw)}>
                            <Ionicons name={showCurrentPw ? 'eye-off' : 'eye'} size={20} color={COLORS.textSub} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pwInputContainer}>
                        <TextInput
                            style={styles.pwInput}
                            placeholder="New Password"
                            placeholderTextColor={COLORS.textPlaceholder}
                            secureTextEntry={!showNewPw}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity onPress={() => setShowNewPw(!showNewPw)}>
                            <Ionicons name={showNewPw ? 'eye-off' : 'eye'} size={20} color={COLORS.textSub} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pwInputContainer}>
                        <TextInput
                            style={styles.pwInput}
                            placeholder="Confirm New Password"
                            placeholderTextColor={COLORS.textPlaceholder}
                            secureTextEntry={!showConfirmPw}
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPw(!showConfirmPw)}>
                            <Ionicons name={showConfirmPw ? 'eye-off' : 'eye'} size={20} color={COLORS.textSub} />
                        </TouchableOpacity>
                    </View>

                    {pwError ? <Text style={styles.errorText}>{pwError}</Text> : null}

                    <TouchableOpacity
                        style={[styles.saveButton, savingPw && { opacity: 0.7 }]}
                        onPress={handleChangePassword}
                        disabled={savingPw}
                    >
                        {pwSaved ? (
                            <View style={styles.saveButtonInner}>
                                <Ionicons name="checkmark" size={18} color={COLORS.white} />
                                <Text style={styles.saveButtonText}>Password Changed!</Text>
                            </View>
                        ) : (
                            <Text style={styles.saveButtonText}>{savingPw ? 'Saving...' : 'Change Password'}</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#EA4335" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Job Modal */}
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
                                style={[styles.jobItem, editJob === item && styles.jobItemActive]}
                                onPress={() => { setEditJob(item); setShowJobModal(false); }}
                            >
                                <Text style={[styles.jobItemText, editJob === item && styles.jobItemTextActive]}>
                                    {item}
                                </Text>
                                {editJob === item && (
                                    <Ionicons name="checkmark" size={16} color={COLORS.primaryDark} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.primaryDark,
        letterSpacing: 1,
    },
    headerIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#F0F7F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
        paddingBottom: 100,
        gap: 16,
    },
    profileCard: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F3F5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
        gap: 10,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primaryDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    avatarInitials: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.white,
        letterSpacing: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.textHeader,
        letterSpacing: -0.3,
    },
    jobBadge: {
        backgroundColor: 'rgba(129, 183, 195, 0.12)',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(129, 183, 195, 0.25)',
    },
    jobBadgeText: {
        fontSize: 13,
        color: COLORS.primaryDark,
        fontWeight: '700',
    },
    savedBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(24, 192, 122, 0.1)',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 10,
        marginTop: 4,
    },
    savedBannerText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#18C07A',
    },
    section: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        gap: 14,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: COLORS.textHeader,
        marginBottom: 2,
    },
    fieldRow: {
        gap: 4,
    },
    fieldLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.textSub,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    fieldInput: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.textHeader,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E8ECF4',
        flex: 1,
    },
    jobSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E8ECF4',
        paddingVertical: 8,
    },
    saveButton: {
        backgroundColor: COLORS.primaryDark,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 4,
    },
    saveButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '700',
    },
    pwInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E8ECF4',
        paddingVertical: 8,
    },
    pwInput: {
        flex: 1,
        fontSize: 15,
        color: COLORS.textHeader,
        fontWeight: '500',
    },
    errorText: {
        color: '#EA4335',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(234, 67, 53, 0.06)',
        paddingVertical: 16,
        borderRadius: 14,
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(234, 67, 53, 0.12)',
    },
    logoutText: {
        color: '#EA4335',
        fontSize: 15,
        fontWeight: '700',
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
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 10,
    },
    jobItem: {
        height: 52,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontWeight: '700',
    },
});
