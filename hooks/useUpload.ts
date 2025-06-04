import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export function useUpload() {
  const [attachedDocument, setAttachedDocument] = useState<{ uri: string; name: string; type: string } | null>(null);

  const generateUniqueFileName = (prefix: string, originalName: string) => {
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    const extension = originalName.split(".").pop() || "file";
    return `${prefix}_${randomStr}.${extension}`;
  };

  const convertToFileUri = async (contentUri: string) => {
    if (contentUri.startsWith("content://")) {
      try {
        const fileInfo = await FileSystem.getInfoAsync(contentUri);
        if (!fileInfo.exists) {
          console.error("File does not exist:", contentUri);
          return null;
        }
        const fileUri = FileSystem.cacheDirectory + generateUniqueFileName("DOC", "file");
        await FileSystem.copyAsync({ from: contentUri, to: fileUri });
        return fileUri;
      } catch (error) {
        console.error("Error converting file URI:", error);
        return null;
      }
    }
    return contentUri;
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      const fileUri = await convertToFileUri(file.uri);
      if (fileUri) {
        setAttachedDocument({ uri: fileUri, name: generateUniqueFileName("IMG", file.uri), type: "image/jpeg" });
      }
    }
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      const fileUri = await convertToFileUri(file.uri);
      if (fileUri) {
        setAttachedDocument({ uri: fileUri, name: generateUniqueFileName("IMG", file.uri), type: "image/jpeg" });
      }
    }
  };

  const pickFromFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled || !result.assets.length) return;

    const file = result.assets[0];
    const fileUri = await convertToFileUri(file.uri);
    if (fileUri) {
      setAttachedDocument({ uri: fileUri, name: generateUniqueFileName("DOC", file.name), type: file.mimeType || "application/octet-stream" });
    }
  };

  return {
    attachedDocument,
    setAttachedDocument,
    pickFromGallery,
    pickFromCamera,
    pickFromFiles,
  };
}
