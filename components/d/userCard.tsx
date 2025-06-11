import { useAuth } from "@/contexts/authContext";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UserCard() {
  const theme = useTheme();
  const { user, token } = useAuth();

  const tokenObj = token ? JSON.parse(token) : null;
  const expiresAt = tokenObj?.expiresAt
    ? new Date(tokenObj.expiresAt).toLocaleString()
    : "N/A";

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <View style={styles.row}>
        <View>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>
            Username:
          </Text>
          <Text style={[styles.value, { color: theme.colors.primary }]}>
            {user?.username ?? "Not logged in"}
          </Text>
        </View>
        <View>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>
            Token Expires At:
          </Text>
          <Text style={[styles.value, { color: theme.colors.error }]}>
            {expiresAt}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderBottomLeftRadius: wp("4%"),
    borderBottomRightRadius: wp("4%"),
    paddingVertical: wp("4%"),
    paddingHorizontal: wp("4%"),
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: wp("3.8%"),
    fontWeight: "600",
  },
  value: {
    fontSize: wp("4.2%"),
    fontWeight: "700",
    marginTop: 4,
  },
});
