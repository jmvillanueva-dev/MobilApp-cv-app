import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";

export default function PhotoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    cvData.personalInfo.profileImage
  );

  const takePhoto = async () => {
    try {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!cameraPermission.granted) {
        Alert.alert(
          "Permiso Denegado",
          "Necesitamos acceso a tu cámara para tomar fotos."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir la cámara");
      console.error(error);
    }
  };

  const pickImage = async () => {
    try {
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!galleryPermission.granted) {
        Alert.alert(
          "Permiso Denegado",
          "Necesitamos acceso a tu galería para seleccionar fotos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir la galería");
      console.error(error);
    }
  };

  const handleSave = () => {
    updatePersonalInfo({
      ...cvData.personalInfo,
      profileImage: selectedImage,
    });
    Alert.alert("Éxito", "Foto guardada correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const handleRemove = () => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar la foto de perfil?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setSelectedImage(undefined);
          updatePersonalInfo({
            ...cvData.personalInfo,
            profileImage: undefined,
          });
        },
      },
    ]);
  };

  return (
    <View className="flex-1 p-5 bg-whitebrand">
      <Text className="text-2xl font-bold text-darkbluebrand mb-5 text-center">
        Foto de Perfil
      </Text>

      <View className="items-center mb-8">
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            className="w-[200px] h-[200px] rounded-full border-[3px] border-bluebrand"
          />
        ) : (
          <View className="w-[200px] h-[200px] rounded-[100px] bg-gray-200 justify-center items-center border-[3px] border-gray-300">
            <Text className="text-gray-500 text-lg">Sin foto</Text>
          </View>
        )}
      </View> 

      <View className="mb-5">
        <TouchableOpacity
          className="bg-bluebrand p-4 rounded-lg mb-3 items-center"
          onPress={takePhoto}
        >
          <Text className="text-white text-lg font-semibold">
            📷 Tomar Foto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-bluebrand p-4 rounded-lg mb-3 items-center"
          onPress={pickImage}
        >
          <Text className="text-white text-lg font-semibold">
            🖼️ Seleccionar de Galería
          </Text>
        </TouchableOpacity>

        {selectedImage && (
          <TouchableOpacity
            className="bg-red-500 p-4 rounded-lg mb-3 items-center"
            onPress={handleRemove}
          >
            <Text className="text-white text-lg font-semibold">
              🗑️ Eliminar Foto
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <NavigationButton title="Guardar" onPress={handleSave} />

      <NavigationButton
        title="Cancelar"
        onPress={() => router.back()}
        variant="secondary"
      />
    </View>
  );
}
