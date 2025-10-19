import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { CVData, SkillLevel } from "../types/cv.types";

interface CVPreviewProps {
  cvData: CVData;
}

const getLevelIndicator = (level: SkillLevel) => {
  switch (level) {
    case "básico":
      return "🟠◻️◻️◻️";
    case "intermedio":
      return "🔵🔵◻️◻️";
    case "avanzado":
      return "🟢🟢🟢◻️";
    case "experto":
      return "🟣🟣🟣🟣";
    default:
      return "";
  }
};

export const CVPreview = ({ cvData }: CVPreviewProps) => {
  const { personalInfo, experiences, education, skills } = cvData;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-5">
        {/* Header con foto */}
        <View className="flex-row mb-6 items-center">
          {personalInfo.profileImage && (
            <Image
              source={{ uri: personalInfo.profileImage }}
              className="w-[90px] h-[90px] rounded-full mr-4 border-2 border-bluebrand"
            />
          )}
          <View className="flex-1">
            <Text
              className="text-xl font-bold text-darkbluebrand mb-2"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {personalInfo.fullName || "Nombre"}
            </Text>
            {personalInfo.email && (
              <Text
                className="text-sm text-gray-500 mb-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                📧 {personalInfo.email}
              </Text>
            )}
            {personalInfo.phone && (
              <Text
                className="text-sm text-gray-500 mb-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                📱 {personalInfo.phone}
              </Text>
            )}
            {personalInfo.location && (
              <Text
                className="text-sm text-gray-500 mb-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                📍 {personalInfo.location}
              </Text>
            )}
          </View>
        </View>
        {/* Resumen */}
        {personalInfo.summary && (
          <View className="mb-6">
            <Text className="text-xl font-bold text-bluebrand mb-3 border-b-2 border-bluebrand pb-1">
              Resumen Profesional
            </Text>
            <Text className="text-sm text-darkbluebrand leading-5">
              {personalInfo.summary}
            </Text>
          </View>
        )}
        {/* Experiencia */}
        {experiences.length > 0 && (
          <View className="mb-6">
            <Text className="text-xl font-bold text-bluebrand mb-3 border-b-2 border-bluebrand pb-1">
              Experiencia Laboral
            </Text>
            {experiences.map((exp) => (
              <View key={exp.id} className="mb-4">
                <Text className="text-base font-semibold text-darkbluebrand mb-1">
                  {exp.position}
                </Text>
                <Text className="text-sm text-gray-500 mb-0.5">
                  {exp.company}
                </Text>
                <Text className="text-xs text-gray-400 mb-1">
                  {exp.startDate} - {exp.endDate || "Actual"}
                </Text>
                {exp.description && (
                  <Text className="text-sm text-darkbluebrand leading-5 mt-1">
                    {exp.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
        {/* Educación */}
        {education.length > 0 && (
          <View className="mb-6">
            <Text className="text-xl font-bold text-bluebrand mb-3 border-b-2 border-bluebrand pb-1">
              Educación
            </Text>
            {education.map((edu) => (
              <View key={edu.id} className="mb-4">
                <Text className="text-base font-semibold text-darkbluebrand mb-1">
                  {edu.degree}
                </Text>
                {edu.field && (
                  <Text className="text-sm text-gray-500 mb-0.5">
                    {edu.field}
                  </Text>
                )}
                <Text className="text-sm text-gray-500 mb-0.5">
                  {edu.institution}
                </Text>
                <Text className="text-xs text-gray-400">
                  {edu.graduationYear}
                </Text>
              </View>
            ))}
          </View>
        )}
        {/* Habilidades Técnicas (Skills) */}
        {skills.length > 0 && (
          <View className="mb-6">
            <Text className="text-xl font-bold text-bluebrand mb-3 border-b-2 border-bluebrand pb-1">
              Habilidades Técnicas
            </Text>
            <View className="flex-row flex-wrap gap-2.5">
              {skills.map((skill) => (
                <View
                  key={skill.id}
                  className="py-2 px-3 bg-gray-100 rounded-lg flex-col items-start mb-2 border border-gray-300"
                >
                  <View className="flex-row items-center gap-1.5">
                    <Text className="text-sm font-bold text-gray-700">
                      {skill.name}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {skill.level.charAt(0).toUpperCase() +
                        skill.level.slice(1)}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-500">
                    {getLevelIndicator(skill.level)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
