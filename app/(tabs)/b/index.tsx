import ClaimModal from "@/components/b/claimModal";
import UserCard from "@/components/b/userCard";
import ClaimFAB from "@/components/claimFAB";
import TopFAB from "@/components/topFAB";
import { useTabVisibility } from "@/contexts/bottomContext";
import { useScrollDirection } from "@/hooks/useBottomNav";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Claim() {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const { setHideTabBar } = useTabVisibility();
  const { direction, onScroll } = useScrollDirection();
  const [showFab, setShowFab] = useState(false);
  const [showClaimFAB, setShowClaimFAB] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (direction === "down") setHideTabBar(true);
    if (direction === "up") setHideTabBar(false);
  }, [direction, setHideTabBar]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowFab(y > wp("25%"));
    setShowClaimFAB(y <= wp("25%"));
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
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                shadowColor: theme.colors.shadow,
              },
            ]}
          ></View>
        </View>
      </ScrollView>

      <ClaimFAB visible={showClaimFAB} onSubmit={() => setShowModal(true)} />
      <TopFAB visible={showFab} scrollRef={scrollRef} />
      <ClaimModal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        onConfirm={(file, documentId, extractedText) => {
          setShowModal(false);
          if (!file && !documentId) {
            router.push("/b/claimForm");
          } else {
            router.push({
              pathname: "/b/claimForm",
              params: {
                fileUri: file?.uri ?? "",
                fileName: file?.name ?? "",
                documentId,
                ocrText: extractedText ?? "",
              },
            });
          }
        }}
      />
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
  card: {
    height: wp("250%"),
    borderRadius: wp("4%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
});
