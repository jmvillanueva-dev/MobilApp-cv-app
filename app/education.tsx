import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Education } from "../types/cv.types";
import {
  EducationFormValues,
  educationSchema,
} from "../validation/educationSchema";

type FormValues = EducationFormValues;

export default function EducationScreen() {
  const router = useRouter();
  const { cvData, addEducation, deleteEducation } = useCVContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      field: null,
      graduationYear: null,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newEducation: Education = {
      id: Date.now().toString(),
      ...data,
      field: data.field || "",
      graduationYear: data.graduationYear ? String(data.graduationYear) : "",
    };

    addEducation(newEducation);
    reset();
    Alert.alert("Éxito", "Educación agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta educación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteEducation(id),
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-whitebrand">
      <View className="p-5">
        <Text className="text-xl font-bold text-darkbluebrand mb-4">
          Agregar Nueva Educación
        </Text>

        <Controller
          control={control}
          name="institution"
          render={({ field }) => (
            <InputField
              label="Institución *"
              placeholder="Nombre de la universidad/institución"
              field={field}
              error={errors.institution}
            />
          )}
        />

        <Controller
          control={control}
          name="degree"
          render={({ field }) => (
            <InputField
              label="Título/Grado *"
              placeholder="Ej: Licenciatura, Maestría"
              field={field}
              error={errors.degree}
            />
          )}
        />

        <Controller
          control={control}
          name="field"
          render={({ field }) => (
            <InputField
              label="Área de Estudio"
              placeholder="Ej: Ingeniería en Sistemas"
              field={field}
              error={errors.field}
            />
          )}
        />

        <Controller
          control={control}
          name="graduationYear"
          render={({ field }) => (
            <InputField
              label="Año de Graduación"
              placeholder="Ej: 2023"
              field={field}
              error={errors.graduationYear}
              keyboardType="numeric"
              onChangeText={(text) => {
                const value = text === "" ? null : Number(text);
                field.onChange(value);
              }}
              value={
                field.value !== null && field.value !== undefined
                  ? String(field.value)
                  : ""
              }
            />
          )}
        />

        <NavigationButton
          title="Agregar Educación"
          onPress={handleSubmit(onSubmit)}
        />

        {cvData.education.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-darkbluebrand mt-6 mb-3">
              Educación Agregada
            </Text>
            {cvData.education.map((edu) => (
              <View
                key={edu.id}
                className="bg-white rounded-lg p-4 mb-3 flex-row shadow-md"
              >
                <View className="flex-1">
                  <Text className="text-base font-semibold text-darkbluebrand mb-1">
                    {edu.degree}
                  </Text>
                  <Text className="text-sm text-gray-500 mb-1">
                    {edu.field}
                  </Text>
                  <Text className="text-sm text-gray-400 mb-0.5">
                    {edu.institution}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {edu.graduationYear}
                  </Text>
                </View>
                <TouchableOpacity
                  className="w-8 h-8 rounded-full bg-red-500 justify-center items-center"
                  onPress={() => handleDelete(edu.id)}
                >
                  <Text className="text-white text-lg font-bold">✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <NavigationButton
          title="Volver"
          onPress={() => router.back()}
          variant="secondary"
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  );
}
