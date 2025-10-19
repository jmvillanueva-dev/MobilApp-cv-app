import { Picker } from "@react-native-picker/picker";
import React from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { Text, View } from "react-native";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  field,
  error,
}) => {
  return (
    <View className="mb-4 w-full">
      <Text className="text-lg text-darkbluebrand font-semibold mb-1">
        {label}
      </Text>
      <View
        className={`border rounded-lg bg-white overflow-hidden justify-center h-[50px] ${
          error ? "border-red-500 border-2" : "border-gray-300"
        }`}
      >
        <Picker
          selectedValue={field.value}
          onValueChange={(itemValue) => field.onChange(itemValue)}
          onBlur={field.onBlur}
          style={{ width: "100%", height: 50 }}
          itemStyle={{ fontSize: 16, height: 50 }}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {error && (
        <Text className="mt-1 text-red-500 text-xs">{error.message}</Text>
      )}
    </View>
  );
};
