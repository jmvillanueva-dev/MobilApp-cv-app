import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DatePickerField } from "../components/DatePickerField";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";
import {
  ExperienceFormValues,
  experienceSchema,
} from "../validation/experienceSchema";

type FormValues = ExperienceFormValues;

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(experienceSchema as any),
    defaultValues: {
      company: "",
      position: "",
      startDate: undefined,
      endDate: undefined,
      description: null,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: data.company,
      position: data.position,
      description: data.description || "",
      startDate: dayjs(data.startDate).format("DD/MM/YYYY"),
      endDate: !data.endDate
        ? "Actual"
        : data.endDate instanceof Date
        ? dayjs(data.endDate).format("DD/MM/YYYY")
        : "",
    };

    addExperience(newExperience);
    reset();
    Alert.alert("Éxito", "Experiencia agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-whitebrand">
      <View className="p-5">
        <Text className="text-xl font-bold text-darkbluebrand mb-4">
          Agregar Nueva Experiencia
        </Text>

        <Controller
          control={control}
          name="company"
          render={({ field }) => (
            <InputField
              label="Empresa *"
              placeholder="Nombre de la empresa"
              field={field}
              error={errors.company}
              maxLength={50}
            />
          )}
        />

        <Controller
          control={control}
          name="position"
          render={({ field }) => (
            <InputField
              label="Cargo *"
              placeholder="Tu posición"
              field={field}
              error={errors.position}
              maxLength={50}
            />
          )}
        />

        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePickerField
              label="Fecha de Inicio *"
              placeholder="Selecciona la fecha de inicio"
              field={field}
              error={errors.startDate}
              maximumDate={new Date()}
            />
          )}
        />

        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <DatePickerField
              label="Fecha de Fin"
              placeholder="Selecciona la fecha de fin"
              field={field}
              error={errors.endDate}
              maximumDate={new Date()}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <InputField
              label="Descripción"
              placeholder="Describe tus responsabilidades y logros..."
              field={field}
              error={errors.description}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top" }}
            />
          )}
        />

        <NavigationButton
          title="Agregar Experiencia"
          onPress={handleSubmit(onSubmit)}
        />

        {cvData.experiences.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-darkbluebrand mt-6 mb-3">
              Experiencias Agregadas
            </Text>
            {cvData.experiences.map((exp) => (
              <View
                key={exp.id}
                className="bg-white rounded-lg p-4 mb-3 flex-row shadow-md"
              >
                <View className="flex-1">
                  <Text className="text-base font-semibold text-darkbluebrand mb-1">
                    {exp.position}
                  </Text>
                  <Text className="text-sm text-gray-500 mb-1">
                    {exp.company}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {exp.startDate} - {exp.endDate || "Actual"}
                  </Text>
                </View>
                <TouchableOpacity
                  className="w-8 h-8 rounded-full bg-red-500 justify-center items-center"
                  onPress={() => handleDelete(exp.id)}
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
