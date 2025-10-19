import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

interface NavigationButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
}

export const NavigationButton = ({
  title,
  onPress,
  variant = "primary",
  style,
}: NavigationButtonProps) => {
  const buttonVariantClasses = {
    primary: "bg-bluebrand",
    secondary: "bg-transparent border-2 border-bluebrand",
    danger: "bg-red-500",
  };

  const textVariantClasses = {
    primary: "text-white",
    secondary: "text-bluebrand",
    danger: "text-white",
  };

  return (
    <TouchableOpacity
      className={`p-4 rounded-lg items-center justify-center my-2 ${buttonVariantClasses[variant]}`}
      style={style}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        className={`text-lg font-semibold ${textVariantClasses[variant]}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
