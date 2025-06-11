import UserCard from "@/components/b/userCardd";
import TopFAB from "@/components/topFAB";
import { useTabVisibility } from "@/contexts/bottomContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card, TextInput, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function ClaimForm() {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const { setHideTabBar } = useTabVisibility();
  const [showFab, setShowFab] = useState(false);
  const { fileUri, fileName, documentId, ocrText } = useLocalSearchParams<{
    fileUri?: string;
    fileName?: string;
    documentId?: string;
    ocrText?: string;
  }>();

  const attachedDocument = fileUri
    ? {
        uri: fileUri,
        name: fileName ?? "",
      }
    : { uri: "", name: "" };

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, [setHideTabBar]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowFab(y > wp("15%"));
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1, backgroundColor: theme.colors.surface }}
          contentContainerStyle={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <UserCard />

          <Card
            mode="contained"
            style={[styles.card, { backgroundColor: theme.colors.background }]}
          >
            <Card.Content style={styles.body}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={wp("5%")}
                  color={theme.colors.primary}
                />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.primary }]}
                >
                  Claim Information
                </Text>
              </View>

              <TextInput
                label="Claim Title"
                mode="outlined"
                placeholder="e.g. Hospital Bill Reimbursement"
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
              />

              <TextInput
                label="Claim Type"
                mode="outlined"
                placeholder="e.g. Medical, Travel, etc."
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
              />

              <TextInput
                label="Claim Amount"
                mode="outlined"
                placeholder="e.g. 120.50"
                keyboardType="numeric"
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
              />

              <TextInput
                label="Claim Date"
                mode="outlined"
                placeholder="e.g. 3 June 2025"
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
              />

              <TextInput
                label="Remarks"
                mode="outlined"
                placeholder="Optional remarks"
                multiline
                numberOfLines={5}
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface, height: wp("25%") },
                ]}
              />

              <View style={[styles.sectionHeader, { marginTop: wp("4%") }]}>
                <MaterialCommunityIcons
                  name="attachment"
                  size={wp("5%")}
                  color={theme.colors.primary}
                />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.primary }]}
                >
                  Attached Document
                </Text>
              </View>

              <TextInput
                label="File Name"
                value={attachedDocument.name}
                mode="outlined"
                editable={false}
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
              />
              <TextInput
                label="Document ID"
                value={documentId ?? ""}
                mode="outlined"
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
              />
              <TextInput
                label="OCR Text"
                value={ocrText ?? ""}
                mode="outlined"
                multiline
                numberOfLines={6}
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface, height: wp("30%") },
                ]}
              />
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      <TopFAB visible={showFab} scrollRef={scrollRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? wp('0%') : wp('6%'),
    paddingBottom: wp("12%"),
  },
  card: {
    width: "94%",
    borderRadius: wp("4%"),
  },
  body: {
    width: "100%",
    gap: wp("2%"),
  },
  input: {
    fontSize: wp("3.5%"),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  sectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});
