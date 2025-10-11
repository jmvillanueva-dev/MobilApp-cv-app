// components/DatePickerField.tsx

import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DatePickerFieldProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  placeholder?: string;
  error?: FieldError;
  field: ControllerRenderProps<TFieldValues, any>;
  maximumDate?: Date;
}

export const DatePickerField = <TFieldValues extends FieldValues = FieldValues>({
  label,
  placeholder,
  error,
  field,
  maximumDate,
}: DatePickerFieldProps<TFieldValues>) => {
  const [showPicker, setShowPicker] = useState(false);

  const displayValue =
    field.value && typeof field.value === 'object' && 'getTime' in field.value
      ? dayjs(field.value).format("DD/MM/YYYY")
      : placeholder || "Seleccionar fecha";

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");

    if (selectedDate) {
      field.onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const errorMessage = error?.message;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {/* TouchableOpacity simula el campo de texto y activa el picker */}
      <TouchableOpacity
        onPress={showDatepicker}
        style={[
          styles.inputContainer,
          errorMessage && styles.inputErrorContainer,
        ]}
        onBlur={field.onBlur}
      >
        <Text
          style={[styles.textInput, !field.value && styles.placeholderText]}
        >
          {displayValue}
        </Text>
      </TouchableOpacity>

      {/* Mostrar el picker en función del estado 'showPicker' y la plataforma */}
      {(showPicker || Platform.OS === "ios") && (
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

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "600",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputErrorContainer: {
    borderColor: "red",
  },
  textInput: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    color: "#999",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
