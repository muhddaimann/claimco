import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/hooks/useToast";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      showToast({ message: "Please fill in all fields.", type: "error" });
      return;
    }
    try {
      await login(username, password);
    } catch {
      showToast({ message: "Invalid username or password.", type: "error" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                shadowColor: theme.colors.shadow,
                opacity: fadeAnim,
                transform: [{ translateY }],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="file-document-outline"
              size={wp("14%")}
              color={theme.colors.primary}
              style={{ alignSelf: "center", marginBottom: wp("5%") }}
            />

            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.onSurface,
                },
              ]}
            >
              ClaimCo
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
            >
              Scan & Submit Claims Easily
            </Text>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode="outlined"
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              style={styles.button}
            >
              Login
            </Button>
          </Animated.View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp("6%"),
  },
  card: {
    borderRadius: wp("4%"),
    paddingVertical: wp("6%"),
    paddingHorizontal: wp("8%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: wp("1%"),
  },
  subtitle: {
    fontSize: wp("3.6%"),
    fontWeight: "400",
    textAlign: "center",
    marginBottom: wp("6%"),
  },
  input: {
    width: "100%",
    marginBottom: wp("4%"),
  },
  button: {
    borderRadius: wp("2.5%"),
    width: "100%",
  },
  buttonContent: {
    paddingVertical: wp("2.8%"),
  },
  buttonLabel: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});
