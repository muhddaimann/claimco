import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function LayoutB() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <Stack.Screen
        name="claimForm"
        options={{
          headerShown: true,
          title: "",
        }}
      />
    </Stack>
  );
}