import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { SelectField } from "../components/SelectField";
import { useCVContext } from "../context/CVContext";
import { Skill, SkillLevel } from "../types/cv.types";
import { SkillFormValues, skillSchema } from "../validation/skillSchema";

type FormValues = SkillFormValues;

const skillLevelOptions = [
  { label: "Básico", value: "básico" },
  { label: "Intermedio", value: "intermedio" },
  { label: "Avanzado", value: "avanzado" },
  { label: "Experto", value: "experto" },
];

export default function SkillsScreen() {
  const router = useRouter();
  const { cvData, addSkill, deleteSkill } = useCVContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(skillSchema),
    defaultValues: {
      name: "",
      level: "básico",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      ...data,
    };

    addSkill(newSkill);
    reset({ name: "", level: "básico" });
    Alert.alert("Éxito", "Habilidad agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta habilidad?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteSkill(id),
      },
    ]);
  };

  const getLevelClasses = (level: SkillLevel) => {
    switch (level) {
      case "básico":
        return "text-amber-500";
      case "intermedio":
        return "text-blue-600";
      case "avanzado":
        return "text-greenbrand";
      case "experto":
        return "text-purple-600 font-bold";
      default:
        return "text-gray-500";
    }
  };

  return (
    <ScrollView className="flex-1 bg-whitebrand">
      <View className="p-5">
        <Text className="text-xl font-bold text-darkbluebrand mb-4">
          Agregar Habilidad Técnica
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <InputField
              label="Habilidad *"
              placeholder="Ej: React Native, Python, SQL"
              field={field}
              error={errors.name}
            />
          )}
        />

        <Controller
          control={control}
          name="level"
          render={({ field }) => (
            <SelectField
              label="Nivel *"
              placeholder="Selecciona el nivel de habilidad"
              options={skillLevelOptions}
              field={field}
              error={errors.level}
            />
          )}
        />

        <NavigationButton
          title="Agregar Habilidad"
          onPress={handleSubmit(onSubmit)}
        />
        {cvData.skills.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-darkbluebrand mt-6 mb-3">
              Habilidades Agregadas
            </Text>
            {cvData.skills.map((skill) => (
              <View
                key={skill.id}
                className="bg-white rounded-lg p-4 mb-3 flex-row shadow-md items-center"
              >
                <View className="flex-1">
                  <Text className="text-base font-semibold text-darkbluebrand mb-1">
                    {skill.name}
                  </Text>
                  <Text
                    className={`text-sm font-medium ${getLevelClasses(
                      skill.level
                    )}`}
                  >
                    {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                  </Text>
                </View>
                <TouchableOpacity
                  className="w-8 h-8 rounded-full bg-red-500 justify-center items-center ml-2.5"
                  onPress={() => handleDelete(skill.id)}
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