import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UserCard() {
  const theme = useTheme();

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
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Submit your claim today
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Keep your reimbursements on track
          </Text>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: wp("1%"),
  },
  title: {
    fontSize: wp("4.6%"),
    fontWeight: "700",
  },
  subtitle: {
    fontSize: wp("3.8%"),
    fontWeight: "400",
  },
});
