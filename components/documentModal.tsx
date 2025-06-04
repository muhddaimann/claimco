import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const screenHeight = Dimensions.get('window').height;

type ClaimModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: 'camera' | 'gallery' | 'files' | 'manual') => void;
};

export default function ClaimModal({ visible, onClose, onSelect }: ClaimModalProps) {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
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

  if (!shouldRender) return null;

  const handleSelect = (type: 'camera' | 'gallery' | 'files' | 'manual') => {
    onSelect(type);
    onClose();
  };

  return (
    <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View
        style={[
          styles.modal,
          {
            backgroundColor: theme.colors.background,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Add Claim</Text>

        <TouchableOpacity onPress={() => handleSelect('camera')} style={styles.option}>
          <MaterialCommunityIcons
            name="camera-outline"
            size={wp('6%')}
            color={theme.colors.primary}
            style={styles.optionIcon}
          />
          <Text style={[styles.optionText, { color: theme.colors.onSurface }]}>Take a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelect('gallery')} style={styles.option}>
          <MaterialCommunityIcons
            name="image-outline"
            size={wp('6%')}
            color={theme.colors.primary}
            style={styles.optionIcon}
          />
          <Text style={[styles.optionText, { color: theme.colors.onSurface }]}>Pick from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelect('files')} style={styles.option}>
          <MaterialCommunityIcons
            name="file-outline"
            size={wp('6%')}
            color={theme.colors.primary}
            style={styles.optionIcon}
          />
          <Text style={[styles.optionText, { color: theme.colors.onSurface }]}>Upload a File</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelect('manual')} style={styles.option}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={wp('6%')}
            color={theme.colors.primary}
            style={styles.optionIcon}
          />
          <Text style={[styles.optionText, { color: theme.colors.onSurface }]}>Manual Entry</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    width: '92%',
    borderRadius: wp('4%'),
    padding: wp('5%'),
    gap: wp('3.5%'),
  },
  title: {
    fontSize: wp('4.4%'),
    fontWeight: '600',
    marginBottom: wp('1.5%'),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('3.2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('3%'),
  },
  optionIcon: {
    marginRight: wp('3%'),
  },
  optionText: {
    fontSize: wp('4%'),
    fontWeight: '500',
  },
});
