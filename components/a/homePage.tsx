import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function HomePage() {
  const theme = useTheme();
  const [tab, setTab] = useState("all");

  return (
    <View style={styles.page}>
      <View
        style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.summaryHeader}>
          <View style={styles.summaryText}>
            <Text
              style={[styles.summaryTitle, { color: theme.colors.onSurface }]}
            >
              Claim Summary
            </Text>
            <Text
              style={[
                styles.summarySub,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Today’s activities and quick stats
            </Text>
          </View>
          <Pressable
            style={[styles.newBtn, { backgroundColor: theme.colors.primary }]}
          >
            <Text
              style={[styles.newBtnText, { color: theme.colors.onPrimary }]}
            >
              + New
            </Text>
          </Pressable>
        </View>

        <View style={styles.filterRow}>
          {["all", "pending", "submitted", "approved"].map((key) => (
            <Pressable
              key={key}
              onPress={() => setTab(key)}
              style={[
                styles.filterBtn,
                {
                  backgroundColor:
                    tab === key
                      ? theme.colors.primary
                      : theme.colors.surfaceVariant,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    tab === key
                      ? theme.colors.onPrimary
                      : theme.colors.onSurfaceVariant,
                  fontWeight: "600",
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={wp("6%")}
              color={theme.colors.primary}
            />
            <Text
              style={[styles.summaryValue, { color: theme.colors.primary }]}
            >
              3
            </Text>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Pending
            </Text>
          </View>
          <View style={styles.summaryBox}>
            <MaterialCommunityIcons
              name="file-send"
              size={wp("6%")}
              color={theme.colors.primary}
            />
            <Text
              style={[styles.summaryValue, { color: theme.colors.primary }]}
            >
              5
            </Text>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Submitted
            </Text>
          </View>
          <View style={styles.summaryBox}>
            <MaterialCommunityIcons
              name="check-circle"
              size={wp("6%")}
              color={theme.colors.primary}
            />
            <Text
              style={[styles.summaryValue, { color: theme.colors.primary }]}
            >
              2
            </Text>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Approved
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: theme.colors.onSecondaryContainer },
          ]}
        >
          Alerts
        </Text>

        <View style={styles.innerCard}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={wp("6%")}
            color={theme.colors.error}
          />
          <View style={styles.innerCardText}>
            <Text
              style={[styles.innerCardTitle, { color: theme.colors.error }]}
            >
              Missing Receipt
            </Text>
            <Text style={{ color: theme.colors.onSecondaryContainer }}>
              One of your recent claims is missing a receipt.
            </Text>
          </View>
        </View>

        <View style={styles.innerCard}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={wp("6%")}
            color={theme.colors.tertiary}
          />
          <View style={styles.innerCardText}>
            <Text
              style={[styles.innerCardTitle, { color: theme.colors.tertiary }]}
            >
              Submission Deadline
            </Text>
            <Text style={{ color: theme.colors.onSecondaryContainer }}>
              Submit by 30 Jun to avoid delay in processing.
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Text
          style={[styles.cardTitle, { color: theme.colors.onSurfaceVariant }]}
        >
          Activity
        </Text>

        <View style={styles.innerCard}>
          <MaterialCommunityIcons
            name="history"
            size={wp("6%")}
            color={theme.colors.primary}
          />
          <View style={styles.innerCardText}>
            <Text
              style={[styles.innerCardTitle, { color: theme.colors.primary }]}
            >
              Recent Edit
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              You edited a draft claim 2 hours ago.
            </Text>
          </View>
        </View>

        <View style={styles.innerCard}>
          <MaterialCommunityIcons
            name="file-document-edit"
            size={wp("6%")}
            color={theme.colors.secondary}
          />
          <View style={styles.innerCardText}>
            <Text
              style={[styles.innerCardTitle, { color: theme.colors.secondary }]}
            >
              Drafts
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              You have 2 draft claims to complete.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    gap: wp("2%"),
  },
  summaryCard: {
    borderRadius: wp("4%"),
    padding: wp("4%"),
    gap: wp("3%"),
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: {
    flex: 1,
    gap: wp("1%"),
  },
  summaryTitle: {
    fontSize: wp("4.2%"),
    fontWeight: "700",
  },
  summarySub: {
    fontSize: wp("3.3%"),
  },
  newBtn: {
    paddingHorizontal: wp("3.5%"),
    paddingVertical: wp("1.8%"),
    borderRadius: wp("3%"),
  },
  newBtnText: {
    fontWeight: "600",
    fontSize: wp("3.4%"),
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: wp("2%"),
    marginTop: wp("1%"),
  },
  filterBtn: {
    flex: 1,
    paddingVertical: wp("2%"),
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: wp("2%"),
    marginTop: wp("2%"),
  },
  summaryBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: wp("4%"),
    borderRadius: wp("3%"),
  },
  summaryValue: {
    fontSize: wp("5%"),
    fontWeight: "700",
  },
  summaryLabel: {
    fontSize: wp("3.4%"),
    fontWeight: "500",
    marginTop: wp("1%"),
  },
  cardContainer: {
    borderRadius: wp("4%"),
    padding: wp("4%"),
    gap: wp("3%"),
    elevation: 2,
  },
  cardTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "700",
  },
  innerCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: wp("3%"),
  },
  innerCardText: {
    flex: 1,
    gap: wp("1%"),
  },
  innerCardTitle: {
    fontSize: wp("3.8%"),
    fontWeight: "600",
  },
});
