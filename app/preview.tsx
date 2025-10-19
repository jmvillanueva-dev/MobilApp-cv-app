import { CVPreview } from "@/components/CVPreview";
import { NavigationButton } from "@/components/NavigationButton";
import { useCvGenerator } from "@/hooks/useCvGenerator";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCVContext } from "../context/CVContext";

export default function PreviewScreen() {
  const { cvData } = useCVContext();
  const { handleGenerateAndSharePDF } = useCvGenerator();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: "Vista Previa CV",
        }}
      />
      <ScrollView contentContainerClassName="p-4 pb-24">
        <CVPreview cvData={cvData} />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-bluebrand border-t border-gray-200 shadow-lg">
        <NavigationButton
          title="Generar y Compartir PDF"
          onPress={handleGenerateAndSharePDF}
        />
      </View>
    </SafeAreaView>
  );
}
