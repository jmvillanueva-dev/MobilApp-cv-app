import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FieldError, ControllerRenderProps } from "react-hook-form";

// Interfaz para las opciones del selector
interface SelectOption {
  label: string;
  value: string;
}

// Interfaz para las props del componente SelectField
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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.pickerContainer, error && styles.inputError]}>
        <Picker
          selectedValue={field.value}
          onValueChange={(itemValue) => field.onChange(itemValue)}
          onBlur={field.onBlur}
          style={styles.picker}
          itemStyle={styles.pickerItem}
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
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "600",
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "center",
    height: 50,
  },
  inputError: {
    borderColor: "#e74c3c",
    borderWidth: 2,
  },
  picker: {
    width: "100%",
    height: 50,
  },
  pickerItem: {
    fontSize: 16,
    height: 50,
  },
  errorText: {
    marginTop: 4,
    color: "#e74c3c",
    fontSize: 12,
  },
});
