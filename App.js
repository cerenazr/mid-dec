import { useState, useEffect } from 'react';
import { View, Platform, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import COLORS from './src/constants/colors';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import OTPScreen from './src/screens/OTPScreen';
import PasswordChangedScreen from './src/screens/PasswordChangedScreen';
import InputScreen from './src/screens/InputScreen';
import ResultScreen from './src/screens/ResultScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';

import { useFonts } from 'expo-font';
import { auth } from './src/services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 65,
                    paddingBottom: 5,
                    borderTopWidth: 1,
                    borderTopColor: '#E8ECF4',
                    overflow: 'visible',
                },
                tabBarActiveTintColor: COLORS.primaryDark,
                tabBarInactiveTintColor: COLORS.textSub,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    marginBottom: 5,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'sparkles' : 'sparkles-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else {
                        return null;
                    }

                    return <Ionicons name={iconName} size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen
                name="Calculator"
                component={InputScreen}
                options={{
                    tabBarLabel: '',
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            onPress={props.onPress}
                            activeOpacity={0.8}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: -20,
                            }}
                        >
                            <View style={styles.calculatorTabContainer}>
                                <Ionicons name="calculator" size={30} color={COLORS.white} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'You' }} />
        </Tab.Navigator>
    );
}

export default function App() {
    const [fontsLoaded] = useFonts({
        ...Ionicons.font,
    });

    // undefined = loading, null = logged out, object = logged in
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        // Timeout fallback: if onAuthStateChanged never fires in 4s, default to logged out
        const timeout = setTimeout(() => {
            setUser(prev => prev === undefined ? null : prev);
        }, 4000);

        let unsubscribe = () => {};
        try {
            unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                clearTimeout(timeout);
                setUser(firebaseUser);
            });
        } catch (e) {
            clearTimeout(timeout);
            setUser(null);
        }

        return () => {
            unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    // Show loading spinner while fonts or auth state are not ready
    if (!fontsLoaded || user === undefined) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#81B7C3" />
            </View>
        );
    }

    return (
        <View style={styles.webContainer}>
            <View style={styles.appContainer}>
                <NavigationContainer>
                    <StatusBar style="auto" />
                    <Stack.Navigator
                        initialRouteName={user ? 'MainTabs' : 'Welcome'}
                        screenOptions={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#FFFFFF' }
                        }}
                    >
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                        <Stack.Screen name="OTPScreen" component={OTPScreen} />
                        <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
                        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                        <Stack.Screen name="Input" component={InputScreen} />
                        <Stack.Screen name="Result" component={ResultScreen} />
                        <Stack.Screen name="Notifications" component={NotificationScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    webContainer: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    appContainer: {
        flex: 1,
        width: '100%',
        maxWidth: 480, // Mobile width for desktop
        backgroundColor: '#FFFFFF',
        // Support for shadow on desktop
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden',
        // Handle iOS PWA Safe Area
        paddingBottom: Platform.OS === 'web' ? 'env(safe-area-inset-bottom)' : 0,
    },
    calculatorTabContainer: {
        backgroundColor: COLORS.primaryDark,
        borderRadius: 35,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#FFFFFF',
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
    }
});
