import { useToast } from "@/hooks/useToast";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

type OCRFile = { uri: string; name: string; type: string };

export function useOCR() {
  const [attachedDocument, setAttachedDocument] = useState<OCRFile | null>(
    null
  );
  const [documentId, setDocumentId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const MAX_SIZE = 1024 * 1024;

  const generateUniqueFileName = (prefix: string, originalName: string) => {
    const ext = originalName.split(".").pop() || "jpg";
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}_${rand}.${ext}`;
  };

  const checkFileSize = async (uri: string) => {
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists || info.size === undefined) return false;
    return info.size <= MAX_SIZE;
  };

  const handleOversized = () => {
    setError("File exceeds 1MB. Please upload a smaller file.");
    showToast({
      message: "File exceeds 1MB. Please upload a smaller file.",
      type: "error",
    });
  };

  const convertToFileUri = async (uri: string) => {
    if (uri.startsWith("content://")) {
      const fileUri =
        FileSystem.cacheDirectory + generateUniqueFileName("OCR", "file.jpg");
      await FileSystem.copyAsync({ from: uri, to: fileUri });
      return fileUri;
    }
    return uri;
  };

  const extractText = async (): Promise<string | null> => {
    if (!attachedDocument) return null;

    try {
      const fileInfo = await FileSystem.getInfoAsync(attachedDocument.uri);
      const fileUri = fileInfo.uri;
      const isPdf = attachedDocument.type === "application/pdf";

      const formData = new FormData();

      formData.append("apikey", "K81608048288957");
      formData.append("language", "eng");
      formData.append("isOverlayRequired", "false");

      if (isPdf) {
        const fileBlob = {
          uri: fileUri,
          name: attachedDocument.name,
          type: "application/pdf",
        } as any;
        formData.append("file", fileBlob);
      } else {
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const mime = attachedDocument.type || "image/jpeg";
        formData.append("base64Image", `data:${mime};base64,${base64}`);
      }

      const res = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (json?.IsErroredOnProcessing)
        throw new Error(json?.ErrorMessage || "OCR failed");

      const text = json?.ParsedResults?.[0]?.ParsedText?.trim() ?? "";

      if (!text) {
        const message = "No readable text found in the document.";
        setError(message);
        showToast({ message, type: "error" });
        return null;
      }

      return text;
    } catch (err) {
      const message = "Failed to process document.";
      setError(message);
      showToast({ message, type: "error" });
      return null;
    }
  };

  const handleImage = async (uri: string, name = "file.jpg") => {
    const manipulated = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
    );
    const fileUri = await convertToFileUri(manipulated.uri);
    const isValid = await checkFileSize(fileUri);

    if (!isValid) return handleOversized();
    setAttachedDocument({
      uri: fileUri,
      name: generateUniqueFileName("IMG", name),
      type: "image/jpeg",
    });
  };

  const runFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled && result.assets.length) {
      await handleImage(result.assets[0].uri);
    }
  };

  const runFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!result.canceled && result.assets.length) {
      await handleImage(result.assets[0].uri);
    }
  };

  const runFromFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets.length) return;

    const file = result.assets[0];

    const isSupported =
      file.mimeType?.startsWith("image/") ||
      file.mimeType === "application/pdf";

    if (!isSupported) {
      const message = "Unsupported file type. Only images or PDFs are allowed.";
      setError(message);
      showToast({ message, type: "error" });
      return;
    }

    const uri = await convertToFileUri(file.uri);
    const isValid = await checkFileSize(uri);
    if (!isValid) return handleOversized();

    setAttachedDocument({
      uri,
      name: generateUniqueFileName("OCR", file.name),
      type: file.mimeType || "application/octet-stream",
    });
  };

  const reset = () => {
    setAttachedDocument(null);
    setDocumentId("");
    setError(null);
  };

  return {
    attachedDocument,
    documentId,
    setDocumentId,
    extractText,
    runFromCamera,
    runFromGallery,
    runFromFiles,
    reset,
    error,
  };
}
