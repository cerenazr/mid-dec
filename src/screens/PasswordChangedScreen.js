import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function PasswordChangedScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.successIconContainer}>
                    <Ionicons name="checkmark-circle" size={100} color={COLORS.success} />
                </View>

                <Text style={styles.title}>Password Changed!</Text>
                <Text style={styles.subTitle}>
                    Your password has been changed successfully.
                </Text>

                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => navigation.navigate('Login')}
                >
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Back to Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    successIconContainer: {
        marginBottom: 35,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: COLORS.textHeader,
        textAlign: 'center',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        color: COLORS.textSub,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    buttonWrapper: {
        width: '100%',
    },
    button: {
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '600',
    },
});
