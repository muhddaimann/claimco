import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type ClaimFABProps = {
  visible: boolean;
  onSubmit: () => void;
};

export default function ClaimFAB({ visible, onSubmit }: ClaimFABProps) {
  const theme = useTheme();
  const scale = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: visible ? 1 : 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.fab,
        {
          backgroundColor: theme.colors.primary,
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <FAB
        icon="plus"
        onPress={onSubmit}
        color={theme.colors.onPrimary}
        style={{ backgroundColor: theme.colors.primary }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: wp("30%"),
    right: wp("5%"),
    borderRadius: wp("4%"),
    zIndex: 10,
  },
});
