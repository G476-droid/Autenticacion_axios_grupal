import React, { useEffect, useState } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

const fallbackUri = "https://placehold.co/600x600/e2e8f0/718096?text=Sin+imagen";

interface RemoteImageProps {
  uri: string;
  style: StyleProp<ImageStyle>;
}

export const RemoteImage = ({ uri, style }: RemoteImageProps) => {
  const [imageUri, setImageUri] = useState(uri || fallbackUri);

  useEffect(() => {
    setImageUri(uri || fallbackUri);
  }, [uri]);

  return (
    <Image
      source={{ uri: imageUri }}
      style={style}
      resizeMode="cover"
      onError={() => setImageUri(fallbackUri)}
    />
  );
};
