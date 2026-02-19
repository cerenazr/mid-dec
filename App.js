import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderTopWidth: 1,
                    borderTopColor: '#E8ECF4',
                    elevation: 0,
                    backgroundColor: '#FFFFFF',
                },
                tabBarActiveTintColor: COLORS.primaryDark,
                tabBarInactiveTintColor: COLORS.textSub,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Calculator') {
                        return (
                            <View style={styles.calculatorTabContainer}>
                                <Ionicons
                                    name="calculator"
                                    size={30}
                                    color={COLORS.white}
                                />
                            </View>
                        );
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={26} color={color} />;
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
                            {...props}
                            activeOpacity={0.8}
                            style={{ top: -20 }}
                        />
                    )
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <View style={styles.webContainer}>
            <View style={styles.appContainer}>
                <NavigationContainer>
                    <StatusBar style="auto" />
                    <Stack.Navigator
                        initialRouteName="Welcome"
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
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    appContainer: {
        flex: 1,
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        // iOS PWA Safe Area Support
        paddingTop: Platform.OS === 'web' ? 'env(safe-area-inset-top)' : 0,
        paddingBottom: Platform.OS === 'web' ? 'env(safe-area-inset-bottom)' : 0,
    },
    calculatorTabContainer: {
        backgroundColor: COLORS.primaryDark,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    }
});
