import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function ClaimPage() {
  const theme = useTheme();

  return (
    <View style={styles.page}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="camera-enhance-outline"
              size={wp("6.5%")}
              color={theme.colors.primary}
            />
          </View>
          <View>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Receipt Scanner
            </Text>
            <Text
              style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
            >
              Quickly capture and digitize your receipts
            </Text>
          </View>
        </View>
        <View style={styles.features}>
          <Feature
            icon="camera"
            text="Snap a new photo or choose from gallery"
            color={theme.colors.primary}
          />
          <Feature
            icon="text-recognition"
            text="Extract key details automatically with OCR"
            color={theme.colors.tertiary}
          />
          <Pressable style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.btnText, { color: theme.colors.onPrimary }]}>Start Scanning</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={wp("6.5%")}
              color={theme.colors.primary}
            />
          </View>
          <View>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Claim Form
            </Text>
            <Text
              style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
            >
              Fill in or edit claim details with ease
            </Text>
          </View>
        </View>
        <View style={styles.features}>
          <Feature
            icon="form-select"
            text="Auto-fill from OCR and edit manually"
            color={theme.colors.primary}
          />
          <Feature
            icon="form-textbox"
            text="Input date, merchant, category, amount, tag"
            color={theme.colors.primary}
          />
          <Feature
            icon="attachment"
            text="Attach invoice, receipt or document ID"
            color={theme.colors.primary}
          />
          <Pressable style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.btnText, { color: theme.colors.onPrimary }]}>Open Form</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="send-check-outline"
              size={wp("6.5%")}
              color={theme.colors.secondary}
            />
          </View>
          <View>
            <Text style={[styles.title, { color: theme.colors.onSecondaryContainer }]}>
              Submit Claim
            </Text>
            <Text
              style={[styles.subtitle, { color: theme.colors.onSecondaryContainer }]}
            >
              Route to approver and get confirmation
            </Text>
          </View>
        </View>
        <View style={styles.features}>
          <Feature
            icon="account-arrow-right"
            text="Auto-route by tag or department"
            color={theme.colors.secondary}
          />
          <Feature
            icon="file-check-outline"
            text="Receive confirmation with claim summary"
            color={theme.colors.secondary}
          />
          <Pressable style={[styles.actionBtn, { backgroundColor: theme.colors.secondary }]}>
            <Text style={[styles.btnText, { color: theme.colors.onSecondary }]}>Submit Now</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="note-edit-outline"
              size={wp("6.5%")}
              color={theme.colors.tertiary}
            />
          </View>
          <View>
            <Text style={[styles.title, { color: theme.colors.onTertiaryContainer }]}>
              Claim Drafts
            </Text>
            <Text
              style={[styles.subtitle, { color: theme.colors.onTertiaryContainer }]}
            >
              Manage and continue unfinished claims
            </Text>
          </View>
        </View>
        <View style={styles.features}>
          <Feature
            icon="progress-pencil"
            text="Save progress automatically"
            color={theme.colors.tertiary}
          />
          <Feature
            icon="restore"
            text="Resume or discard whenever ready"
            color={theme.colors.tertiary}
          />
          <Pressable style={[styles.actionBtn, { backgroundColor: theme.colors.tertiary }]}>
            <Text style={[styles.btnText, { color: theme.colors.onTertiary }]}>View Drafts</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function Feature({ icon, text, color }: { icon: string; text: string; color: string }) {
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
    gap: wp("2%"),
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
