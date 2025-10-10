// app/personal-info.tsx

import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
// import { PersonalInfo } from "../types/cv.types";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  PersonalInfoFormValues,
  personalInfoSchema,
} from "../validation/personalInfoSchema";

type FormValues = PersonalInfoFormValues;

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();

  // const [formData, setFormData] = useState<PersonalInfo>(cvData.personalInfo);

  // Inicializar React-Hook-Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: cvData.personalInfo,
    mode: "onBlur",
  });

  useEffect(() => {
    reset(cvData.personalInfo);
  }, [cvData.personalInfo, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updatePersonalInfo(data as any);
    Alert.alert("Éxito", "Información guardada correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const onError = (erros: any) => {
    Alert.alert(
      "Error de Formulario",
      "Por favor, corrige los errores antes de guardar."
    );
  };

  // useEffect(() => {
  //   setFormData(cvData.personalInfo);
  // }, [cvData.personalInfo]);

  // const handleSave = () => {
  //   if (!formData.fullName || !formData.email) {
  //     Alert.alert("Error", "Por favor completa al menos el nombre y email");
  //     return;
  //   }

  //   updatePersonalInfo(formData);
  //   Alert.alert("Éxito", "Información guardada correctamente", [
  //     { text: "OK", onPress: () => router.back() },
  //   ]);
  // };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <InputField
              label="Nombre Completo *"
              placeholder="Juan Pérez"
              field={field}
              error={errors.fullName}
              maxLength={50}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <InputField
              label="Email *"
              placeholder="juan@email.com"
              field={field}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={50}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <InputField
              label="Teléfono"
              placeholder="+593 99 999 9999"
              field={field}
              error={errors.phone}
              keyboardType="phone-pad"
              maxLength={15}
            />
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <InputField
              label="Ubicación"
              placeholder="Quito, Ecuador"
              field={field}
              error={errors.location}
            />
          )}
        />

        <Controller
          control={control}
          name="summary"
          render={({ field }) => (
            <InputField
              label="Resumen Profesional"
              placeholder="Describe brevemente tu perfil profesional..."
              field={field}
              error={errors.summary}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top" }}
            />
          )}
        />

        <NavigationButton
          title="Guardar Información"
          onPress={handleSubmit(onSubmit, onError)}
        />

        <NavigationButton
          title="Cancelar"
          onPress={() => router.back()}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
});
