// app/skills.tsx

import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Skill, SkillLevel } from "../types/cv.types";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SkillFormValues, skillSchema } from "../validation/skillSchema";
import { SelectField } from "../components/SelectField"; 

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

  const getLevelStyle = (level: SkillLevel) => {
    switch (level) {
      case "básico":
        return styles.levelBasic;
      case "intermedio":
        return styles.levelIntermediate;
      case "avanzado":
        return styles.levelAdvanced;
      case "experto":
        return styles.levelExpert;
      default:
        return {};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Habilidad Técnica</Text>
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
            <Text style={styles.listTitle}>Habilidades Agregadas</Text>
            {cvData.skills.map((skill) => (
              <View key={skill.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{skill.name}</Text>
                  <Text
                    style={[styles.cardSubtitle, getLevelStyle(skill.level)]}
                  >
                    {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(skill.id)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7f8c8d",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  levelBasic: {
    color: "#f39c12",
  },
  levelIntermediate: {
    color: "#2980b9",
  },
  levelAdvanced: {
    color: "#27ae60",
  },
  levelExpert: {
    color: "#8e44ad",
    fontWeight: "bold",
  },
});
