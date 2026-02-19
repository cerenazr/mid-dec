import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import COLORS from '../constants/colors';

const { width } = Dimensions.get('window');

const WaveBackground = ({ color = COLORS.primary, inverted = false }) => {
    return (
        <View style={[styles.container, inverted ? styles.top : styles.bottom]}>
            <Svg
                width={width}
                height={150}
                viewBox={`0 0 ${width} 150`}
                fill="none"
                style={inverted ? styles.svgInverted : styles.svg}
            >
                <Path
                    d={`M0 50 Q${width / 4} 0 ${width / 2} 50 T${width} 50 V150 H0 Z`}
                    fill={color}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 150,
        zIndex: -1,
    },
    bottom: {
        bottom: 0,
    },
    top: {
        top: 0,
        transform: [{ rotate: '180deg' }],
    },
    svg: {
        bottom: 0,
    },
    svgInverted: {
        top: 0,
    }
});

export default WaveBackground;
