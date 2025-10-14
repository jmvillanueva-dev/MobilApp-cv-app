// app/experience.tsx

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
import { DatePickerField } from "../components/DatePickerField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";

import {
  ExperienceFormValues,
  experienceSchema,
} from "@/validation/experienceSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import dayjs from "dayjs";

type FormValues = ExperienceFormValues;

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  // const [formData, setFormData] = useState<Omit<Experience, "id">>({
  //   company: "",
  //   position: "",
  //   startDate: "",
  //   endDate: "",
  //   description: "",
  // });

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
      endDate:
        !data.endDate
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Nueva Experiencia</Text>

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
            <Text style={styles.listTitle}>Experiencias Agregadas</Text>
            {cvData.experiences.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{exp.position}</Text>
                  <Text style={styles.cardSubtitle}>{exp.company}</Text>
                  <Text style={styles.cardDate}>
                    {exp.startDate} - {exp.endDate || "Actual"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(exp.id)}
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
    color: "#7f8c8d",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "#95a5a6",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
