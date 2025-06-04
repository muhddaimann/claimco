import { useOCR } from "@/hooks/useOCR";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const screenHeight = Dimensions.get("window").height;

type ClaimModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (
    file: { uri: string; name: string; type: string } | null,
    documentId: string,
    extractedText?: string
  ) => void;
};

export default function ClaimModal({
  visible,
  onDismiss,
  onConfirm,
}: ClaimModalProps) {
  const theme = useTheme();
  const {
    runFromCamera,
    runFromGallery,
    runFromFiles,
    attachedDocument,
    documentId,
    setDocumentId,
    extractText,
    reset,
  } = useOCR();

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(visible);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"select" | "ref">("select");
  const [manualFill, setManualFill] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setStep("select");
      setDocumentId("");
      setManualFill(false);
      reset();
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 250,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => setShouldRender(false));
    }
  }, [visible]);

  useEffect(() => {
    if (attachedDocument || manualFill) setStep("ref");
  }, [attachedDocument, manualFill]);

  const handleConfirm = async () => {
    if (!documentId.trim()) return;

    setLoading(true);
    try {
      const text = await extractText();

      if (!text) {
        setLoading(false);
        return;
      }

      onConfirm(attachedDocument, documentId.trim(), text);
      onDismiss();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
      <Pressable style={styles.backdrop} onPress={onDismiss} />
      <Animated.View
        style={[
          styles.modal,
          {
            backgroundColor: theme.colors.background,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {step === "select" && (
          <>
            <Text style={[styles.title, { color: theme.colors.onBackground }]}>
              Select Input Type
            </Text>

            <TouchableOpacity onPress={runFromCamera} style={styles.option}>
              <MaterialCommunityIcons
                name="camera-outline"
                size={wp("6%")}
                color={theme.colors.primary}
                style={styles.optionIcon}
              />
              <Text
                style={[styles.optionText, { color: theme.colors.onSurface }]}
              >
                Camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={runFromGallery} style={styles.option}>
              <MaterialCommunityIcons
                name="image-outline"
                size={wp("6%")}
                color={theme.colors.primary}
                style={styles.optionIcon}
              />
              <Text
                style={[styles.optionText, { color: theme.colors.onSurface }]}
              >
                Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={runFromFiles} style={styles.option}>
              <MaterialCommunityIcons
                name="file-outline"
                size={wp("6%")}
                color={theme.colors.primary}
                style={styles.optionIcon}
              />
              <Text
                style={[styles.optionText, { color: theme.colors.onSurface }]}
              >
                Files
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onConfirm(null, "");
                onDismiss();
              }}
              style={styles.option}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={wp("6%")}
                color={theme.colors.primary}
                style={styles.optionIcon}
              />
              <Text
                style={[styles.optionText, { color: theme.colors.onSurface }]}
              >
                Manual Fill
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step === "ref" && (
          <View style={{ gap: wp("2%") }}>
            <Text style={[styles.title, { color: theme.colors.onBackground }]}>
              Enter Document ID
            </Text>

            {attachedDocument && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: wp("2.5%"),
                  paddingHorizontal: wp("3.5%"),
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: wp("2.5%"),
                }}
              >
                <MaterialCommunityIcons
                  name="file-check-outline"
                  size={wp("5.5%")}
                  color={theme.colors.primary}
                  style={{ marginRight: wp("2.5%") }}
                />
                <Text
                  style={{
                    fontSize: wp("3.8%"),
                    fontWeight: "500",
                    color: theme.colors.onSurfaceVariant,
                    flexShrink: 1,
                  }}
                >
                  {attachedDocument.name.length > 30
                    ? attachedDocument.name.slice(0, 30) + "..."
                    : attachedDocument.name}
                </Text>
              </View>
            )}

            <TextInput
              label="Document ID"
              placeholder="e.g. MC2025"
              value={documentId}
              onChangeText={setDocumentId}
              mode="outlined"
              style={{ backgroundColor: theme.colors.surface }}
            />

            <TouchableOpacity
              style={[
                styles.attachBtn,
                {
                  backgroundColor:
                    documentId.trim() && !loading
                      ? theme.colors.primary
                      : theme.colors.surfaceDisabled,
                },
              ]}
              onPress={handleConfirm}
              disabled={!documentId.trim() || loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.colors.onPrimary} />
              ) : (
                <Text
                  style={[styles.attachText, { color: theme.colors.onPrimary }]}
                >
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    width: "92%",
    borderRadius: wp("4%"),
    padding: wp("5%"),
    gap: wp("3.5%"),
  },
  title: {
    fontSize: wp("4.4%"),
    fontWeight: "600",
    marginBottom: wp("1.5%"),
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: wp("3.2%"),
    paddingHorizontal: wp("3%"),
    borderRadius: wp("3%"),
  },
  optionIcon: {
    marginRight: wp("3%"),
  },
  optionText: {
    fontSize: wp("4%"),
    fontWeight: "500",
  },
  attachBtn: {
    paddingVertical: wp("3.5%"),
    borderRadius: wp("2.5%"),
    alignItems: "center",
    marginTop: wp("1%"),
  },
  attachText: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});
