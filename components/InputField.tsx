import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { ControllerRenderProps, FieldError } from "react-hook-form";

type ControllerInputProps = ControllerRenderProps;

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: FieldError;
  field: ControllerInputProps;
}

export const InputField = ({
  label,
  error,
  field,
  ...props
}: InputFieldProps) => {
  const errorMessage = error?.message;

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold text-darkbluebrand mb-2">
        {label}
      </Text>
      <TextInput
        className={`border rounded-lg p-3 text-lg bg-white ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
        placeholderTextColor="#999"
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value as string}
        {...props}
      />
      {errorMessage && (
        <Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};
