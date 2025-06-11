import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UserCard() {
  const theme = useTheme();
  const today = new Date();

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
        <View style={styles.textContainer}>
          <Text style={[styles.dateDisplay, { color: theme.colors.onSurface }]}>
            {format(today, "EEE")},{" "}
            <Text style={{ color: theme.colors.primary }}>
              {format(today, "MMM d")}
            </Text>
          </Text>
          <Text style={[styles.greeting, { color: theme.colors.secondary }]}>
            Hello, User
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={wp("5.8%")}
              color={theme.colors.onBackground}
            />
          </View>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={wp("6.8%")}
              color={theme.colors.onBackground}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderBottomLeftRadius: wp("5%"),
    borderBottomRightRadius: wp("5%"),
    paddingTop: wp("4%"),
    paddingBottom: wp("6%"),
    paddingHorizontal: wp("5%"),
    marginBottom: wp("3%"),
    justifyContent: "flex-end",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    gap: wp("0.5%"),
  },
  dateDisplay: {
    fontSize: wp("4.4%"),
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  greeting: {
    fontSize: wp("4.2%"),
    fontWeight: "600",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  iconCircle: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
});
