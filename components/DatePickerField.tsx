import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

interface DatePickerFieldProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  placeholder?: string;
  error?: FieldError;
  field: ControllerRenderProps<TFieldValues, any>;
  maximumDate?: Date;
}

export const DatePickerField = <
  TFieldValues extends FieldValues = FieldValues
>({
  label,
  placeholder,
  error,
  field,
  maximumDate,
}: DatePickerFieldProps<TFieldValues>) => {
  const [showPicker, setShowPicker] = useState(false);

  const displayValue =
    field.value && typeof field.value === "object" && "getTime" in field.value
      ? dayjs(field.value).format("DD/MM/YYYY")
      : placeholder || "Seleccionar fecha";

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      field.onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const errorMessage = error?.message;

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold text-darkbluebrand mb-2">
        {label}
      </Text>

      <TouchableOpacity
        onPress={showDatepicker}
        className={`border rounded-lg p-3 bg-white ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
        onBlur={field.onBlur}
      >
        <Text
          className={`text-base ${
            !field.value ? "text-gray-500" : "text-black"
          }`}
        >
          {displayValue}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={
            field.value &&
            typeof field.value === "object" &&
            "getTime" in field.value
              ? field.value
              : new Date()
          }
          mode="date"
          display="spinner"
          onChange={onChange}
          maximumDate={maximumDate}
        />
      )}

      {errorMessage && (
        <Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};
