import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function TrackPage() {
  const theme = useTheme();

  return (
    <View style={styles.page}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="timeline-clock-outline"
              size={wp("6.5%")}
              color={theme.colors.primary}
            />
          </View>
          <View>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Claim Timeline
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Follow the status of each claim
            </Text>
          </View>
        </View>
        <View style={styles.features}>
          <Feature
            icon="progress-clock"
            text="Submitted → In Review → Approved → Paid"
            color={theme.colors.primary}
          />
          <Feature
            icon="clock-alert-outline"
            text="Last update timestamp per stage"
            color={theme.colors.tertiary}
          />
          <Pressable
            style={[
              styles.actionBtn,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text style={[styles.btnText, { color: theme.colors.onPrimary }]}>
              Track Claims
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="filter-menu-outline"
              size={wp("6.5%")}
              color={theme.colors.secondary}
            />
          </View>
          <View>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Filter & Search
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Find claims faster by filtering
            </Text>
          </View>
        </View>
        <View style={styles.features}>
          <Feature
            icon="calendar-range"
            text="Filter by tag, date range, and status"
            color={theme.colors.secondary}
          />
          <Feature
            icon="magnify"
            text="Quick search by merchant or keyword"
            color={theme.colors.secondary}
          />
          <Pressable
            style={[
              styles.actionBtn,
              { backgroundColor: theme.colors.secondary },
            ]}
          >
            <Text style={[styles.btnText, { color: theme.colors.onSecondary }]}>
              Open Search
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="file-eye-outline"
              size={wp("6.5%")}
              color={theme.colors.secondary}
            />
          </View>
          <View>
            <Text
              style={[
                styles.title,
                { color: theme.colors.onSecondaryContainer },
              ]}
            >
              View Claim Details
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.onSecondaryContainer },
              ]}
            >
              Inspect receipt, notes, and history
            </Text>
          </View>
        </View>
        <View style={styles.features}>
          <Feature
            icon="image-outline"
            text="Preview receipts and attachments"
            color={theme.colors.secondary}
          />
          <Feature
            icon="account-check-outline"
            text="See approver, timestamp, and comments"
            color={theme.colors.secondary}
          />
          <Pressable
            style={[
              styles.actionBtn,
              { backgroundColor: theme.colors.secondary },
            ]}
          >
            <Text style={[styles.btnText, { color: theme.colors.onSecondary }]}>
              View Details
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="export-variant"
              size={wp("6.5%")}
              color={theme.colors.tertiary}
            />
          </View>
          <View>
            <Text
              style={[
                styles.title,
                { color: theme.colors.onTertiaryContainer },
              ]}
            >
              Export Records
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.onTertiaryContainer },
              ]}
            >
              Save or share claim summaries
            </Text>
          </View>
        </View>
        <View style={styles.features}>
          <Feature
            icon="file-pdf-box"
            text="Generate PDF or CSV of selected claims"
            color={theme.colors.tertiary}
          />
          <Feature
            icon="email-send-outline"
            text="Email/export to finance or save for record"
            color={theme.colors.tertiary}
          />
          <Pressable
            style={[
              styles.actionBtn,
              { backgroundColor: theme.colors.tertiary },
            ]}
          >
            <Text style={[styles.btnText, { color: theme.colors.onTertiary }]}>
              Export Now
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function Feature({
  icon,
  text,
  color,
}: {
  icon: string;
  text: string;
  color: string;
}) {
  return (
    <View style={styles.featureRow}>
      <MaterialCommunityIcons name={icon} size={wp("5.8%")} color={color} />
      <Text style={[styles.featureText, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    gap: wp("3%"),
  },
  card: {
    borderRadius: wp("4%"),
    padding: wp("4%"),
    gap: wp("3%"),
    elevation: 3,
  },
  header: {
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
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: wp("4.6%"),
    fontWeight: "700",
  },
  subtitle: {
    fontSize: wp("3.5%"),
    marginTop: wp("0.5%"),
  },
  features: {
    gap: wp("2.5%"),
    marginTop: wp("2%"),
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  featureText: {
    fontSize: wp("3.6%"),
    fontWeight: "500",
    flex: 1,
    lineHeight: wp("5.2%"),
  },
  actionBtn: {
    marginTop: wp("3%"),
    paddingVertical: wp("2.5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  btnText: {
    fontSize: wp("3.8%"),
    fontWeight: "600",
  },
});
