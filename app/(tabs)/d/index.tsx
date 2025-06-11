import UserCard from "@/components/d/userCard";
import LogoutFAB from "@/components/logoutFAB";
import TopFAB from "@/components/topFAB";
import { useTabVisibility } from "@/contexts/bottomContext";
import { useToggle } from "@/contexts/themeContext";
import { useScrollDirection } from "@/hooks/useBottomNav";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { List, Switch, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Settings() {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const { setHideTabBar } = useTabVisibility();
  const { direction, onScroll } = useScrollDirection();
  const [showFab, setShowTopFab] = useState(false);
  const [showLogoutFab, setShowLogoutFab] = useState(true);
  const { isDarkMode, toggleTheme } = useToggle();

  useEffect(() => {
    if (direction === "down") {
      setHideTabBar(true);
      setShowLogoutFab(false);
    } else if (direction === "up") {
      setHideTabBar(false);
      setShowLogoutFab(true);
    }
  }, [direction, setHideTabBar]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowTopFab(y > wp("25%"));
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          onScroll(e);
          handleScroll(e);
        }}
        scrollEventThrottle={16}
      >
        <UserCard />

        <List.Section>
          <List.Subheader
            style={{
              color: theme.colors.onSurface,
              fontSize: wp("4.5%"),
              fontWeight: "600",
            }}
          >
            Appearance
          </List.Subheader>
          <List.Item
            title="Dark Mode"
            left={(props) => <List.Icon {...props} icon="weather-night" />}
            right={() => (
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.surfaceVariant,
                  true: theme.colors.primary,
                }}
              />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader
            style={{
              color: theme.colors.onSurface,
              fontSize: wp("4.5%"),
              fontWeight: "600",
            }}
          >
            Notifications
          </List.Subheader>
          <List.Item
            title="Push Notifications"
            left={(props) => <List.Icon {...props} icon="bell-outline" />}
            right={() => <Switch value={true} onValueChange={() => {}} />}
          />
          <List.Item
            title="Email Notifications"
            left={(props) => <List.Icon {...props} icon="email-outline" />}
            right={() => <Switch value={false} onValueChange={() => {}} />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader
            style={{
              color: theme.colors.onSurface,
              fontSize: wp("4.5%"),
              fontWeight: "600",
            }}
          >
            Support & Feedback
          </List.Subheader>
          <List.Item
            title="Help Center"
            left={(props) => (
              <List.Icon {...props} icon="help-circle-outline" />
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Send Feedback"
            left={(props) => (
              <List.Icon {...props} icon="message-text-outline" />
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Report a Bug"
            left={(props) => <List.Icon {...props} icon="bug-outline" />}
            onPress={() => {}}
          />
          <List.Item
            title="About This App"
            left={(props) => (
              <List.Icon {...props} icon="information-outline" />
            )}
            onPress={() => {}}
          />
        </List.Section>
      </ScrollView>

      <TopFAB visible={showFab} scrollRef={scrollRef} />
      <LogoutFAB visible={showLogoutFab} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Platform.OS === "android" ? wp("20%") : wp("26%"),
  },
});
