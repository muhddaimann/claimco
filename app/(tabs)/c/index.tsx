import TrackPage from "@/components/c/trackPage";
import UserCard from "@/components/c/userCard";
import TopFAB from "@/components/topFAB";
import { useTabVisibility } from "@/contexts/bottomContext";
import { useScrollDirection } from "@/hooks/useBottomNav";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Reporting() {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const { setHideTabBar } = useTabVisibility();
  const { direction, onScroll } = useScrollDirection();
  const [showFab, setShowFab] = useState(false);

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
          <TrackPage />
        </View>
      </ScrollView>

      <TopFAB visible={showFab} scrollRef={scrollRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: Platform.OS === "android" ? wp("10%") : wp("26%"),
  },
  body: {
    width: "100%",
    paddingHorizontal: wp("4%"),
    gap: wp("2%"),
  },
});
