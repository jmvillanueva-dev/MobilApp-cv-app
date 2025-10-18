// app/index.tsx

import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { useCVContext } from "../context/CVContext";

export default function HomeScreen() {
  const router = useRouter();
  const { cvData } = useCVContext();

  const isPersonalInfoComplete =
    cvData.personalInfo.fullName && cvData.personalInfo.email;
  const hasExperience = cvData.experiences.length > 0;
  const hasEducation = cvData.education.length > 0;
  const hasPhoto = !!cvData.personalInfo.profileImage;

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-whitebrand" edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={true} className="p-5">
          <Text className="text-2xl font-bold text-center mb-5">
            Crea tu CV Profesional
          </Text>

          {/* Sección: Foto de Perfil */}
          <View className="bg-whitebrand p-5 rounded-xl mb-4 shadow-md shadow-black">
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-1">
                <Text className="text-xl font-semibold text-darkbluebrand mb-2">
                  Foto de Perfil
                </Text>
                <Text className="text-base text-greenbrand mb-3">
                  {hasPhoto ? "✓ Agregada" : "Opcional"}
                </Text>
              </View>
              {hasPhoto && cvData.personalInfo.profileImage && (
                <Image
                  source={{ uri: cvData.personalInfo.profileImage }}
                  className="w-[50px] h-[50px] rounded-full border-2 border-bluebrand"
                />
              )}
            </View>
            <TouchableOpacity
              className="bg-bluebrand p-4 rounded-lg"
              onPress={() => router.push("/photo")}
            >
              <Text className="text-whitebrand text-lg text-center font-semibold">
                {hasPhoto ? "Cambiar Foto" : "Subir Foto"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sección: Información Personal */}
          <View className="bg-whitebrand p-5 rounded-xl mb-4 shadow-md shadow-black">
            <Text className="text-xl font-semibold text-darkbluebrand mb-2">
              1. Información Personal
            </Text>
            <Text className="text-base text-greenbrand mb-3">
              {isPersonalInfoComplete ? "✓ Completado" : "Pendiente"}
            </Text>
            <TouchableOpacity
              className="bg-bluebrand p-4 rounded-lg"
              onPress={() => router.push("/personal-info")}
            >
              <Text className="text-whitebrand text-lg text-center font-semibold">
                Editar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sección: Experiencia */}
          <View className="bg-whitebrand p-5 rounded-xl mb-4 shadow-md shadow-black">
            <Text className="text-xl font-semibold text-darkbluebrand mb-2">
              2. Experiencia
            </Text>
            <Text className="text-base text-greenbrand mb-3">
              {hasExperience
                ? `✓ ${cvData.experiences.length} agregada(s)`
                : "Pendiente"}
            </Text>
            <TouchableOpacity
              className="bg-bluebrand p-4 rounded-lg"
              onPress={() => router.push("/experience")}
            >
              <Text className="text-whitebrand text-lg text-center font-semibold">
                Agregar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sección: Educación */}
          <View className="bg-whitebrand p-5 rounded-xl mb-4 shadow-md shadow-black">
            <Text className="text-xl font-semibold text-darkbluebrand mb-2">
              3. Educación
            </Text>
            <Text className="text-base text-greenbrand mb-3">
              {hasEducation
                ? `✓ ${cvData.education.length} agregada(s)`
                : "Pendiente"}
            </Text>
            <TouchableOpacity
              className="bg-bluebrand p-4 rounded-lg"
              onPress={() => router.push("/education")}
            >
              <Text className="text-whitebrand text-lg text-center font-semibold">
                Agregar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sección: Habilidades */}
          <View className="bg-whitebrand p-5 rounded-xl mb-4 shadow-md shadow-black">
            <Text className="text-xl font-semibold text-darkbluebrand mb-2">
              4. Habilidades
            </Text>
            <Text className="text-base text-greenbrand mb-3">
              {cvData.skills.length > 0
                ? `✓ ${cvData.skills.length} agregada(s)`
                : "Pendiente"}
            </Text>
            <TouchableOpacity
              className="bg-bluebrand p-4 rounded-lg"
              onPress={() => router.push("/skills")}
            >
              <Text className="text-whitebrand text-lg text-center font-semibold">
                Agregar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botón de Vista Previa - Más grande y visible */}
          <View className="my-5">
            <TouchableOpacity
              className="bg-[#2ecc71] p-5 rounded-xl items-center shadow-lg"
              onPress={() => router.push("/preview")}
              activeOpacity={0.8}
            >
              <Text className="text-4xl mb-2">📑</Text>
              <Text className="text-white text-lg font-bold text-center">
                Ver Vista Previa del CV
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-5" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}