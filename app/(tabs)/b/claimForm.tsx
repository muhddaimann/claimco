import UserCard from "@/components/b/userCardd";
import TopFAB from "@/components/topFAB";
import { useTabVisibility } from "@/contexts/bottomContext";
import { useScrollDirection } from "@/hooks/useBottomNav";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, TextInput, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function ClaimForm() {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const { setHideTabBar } = useTabVisibility();
  const { direction, onScroll } = useScrollDirection();
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
    : null;

  useEffect(() => {
    if (direction === "down") setHideTabBar(true);
    if (direction === "up") setHideTabBar(false);
  }, [direction, setHideTabBar]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowFab(y > wp("25%"));
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          onScroll(e);
          handleScroll(e);
        }}
        scrollEventThrottle={16}
      >
        <UserCard />

        <View style={styles.body}>
          <TextInput
            label="Claim Type"
            mode="outlined"
            placeholder="e.g. Medical, Travel, etc."
            style={{ backgroundColor: theme.colors.surface }}
          />

          <TextInput
            label="Claim Date"
            mode="outlined"
            placeholder="e.g. 3 June 2025"
            style={{ backgroundColor: theme.colors.surface }}
          />

          <TextInput
            label="Remarks"
            mode="outlined"
            placeholder="Optional remarks"
            multiline
            numberOfLines={3}
            style={{ backgroundColor: theme.colors.surface }}
          />

          {attachedDocument && (
            <Card mode="outlined" style={{ borderRadius: wp("2%") }}>
              <Card.Title title="Attached Document" />
              <Card.Content style={{ gap: wp("2%") }}>
                <TextInput
                  label="File Name"
                  value={attachedDocument.name}
                  mode="outlined"
                  editable={false}
                  style={{ backgroundColor: theme.colors.surface }}
                />
                <TextInput
                  label="Document ID"
                  value={documentId ?? ""}
                  mode="outlined"
                  editable={false}
                  style={{ backgroundColor: theme.colors.surface }}
                />
                <TextInput
                  label="OCR Text"
                  value={ocrText ?? ""}
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  style={{ backgroundColor: theme.colors.surface }}
                />
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>

      <TopFAB visible={showFab} scrollRef={scrollRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: wp("10%"),
  },
  body: {
    width: "100%",
    paddingHorizontal: wp("4%"),
    gap: wp("2%"),
  },
});
