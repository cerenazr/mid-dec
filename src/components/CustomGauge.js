import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import COLORS from '../constants/colors';

const CustomGauge = ({
    percentage = 0,
    size = 100,
    strokeWidth = 10,
    fontSize = 18,
    showText = true,
    riskLevel = 'Low'
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getColor = () => {
        if (riskLevel === 'High') return '#EA4335';
        if (riskLevel === 'Medium') return '#FF9500';
        return '#18C07A';
    };

    const color = getColor();

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    {/* Background Circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#F0F2F5"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    {/* Progress Circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="none"
                    />
                </G>
            </Svg>
            {showText && (
                <View style={styles.textContainer}>
                    <Text style={[styles.percentageText, { fontSize, color: COLORS.textHeader }]}>
                        %{percentage}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        fontWeight: '800',
    },
});

export default CustomGauge;
