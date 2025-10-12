// app/preview.tsx
import { CVPreview } from "@/components/CVPreview";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCVContext } from "../context/CVContext";

import { NavigationButton } from "@/components/NavigationButton";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { CVData, Education, Experience } from "../types/cv.types";

import * as FileSystem from "expo-file-system/legacy";

const getBase64Image = async (uri: string): Promise<string | null> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Error al convertir imagen a base64:", error);
    return null;
  }
};

// --- Generar HTML para mostrar PDF ---

// Función para generar HTML del CV a partir de los datos.
const generateCVHtml = (data: CVData): string => {
  const { personalInfo, experiences, education } = data;

  // Generación de la sección de Experiencia
  const experienceHtml = experiences
    .map(
      (exp: Experience) => `
    <div class="item">
        <div class="clearfix">
            <h3 class="item-title">${exp.position}</h3>
            <span class="date-range">${exp.startDate} - ${exp.endDate}</span>
        </div>
        <p class="item-subtitle">${exp.company}</p>
        <p class="description">${exp.description}</p>
    </div>
  `
    )
    .join("");

  // Generación de la sección de Educación
  const educationHtml = education
    .map(
      (edu: Education) => `
    <div class="item">
        <div class="clearfix">
            <h3 class="item-title">${edu.degree}</h3>
            <span class="date-range">${edu.graduationYear}</span>
        </div>
        <p class="item-subtitle">${edu.institution}</p>
    </div>
  `
    )
    .join("");

  // Manejo de la foto
  const photoTag = personalInfo.profileImage
    ? `<img src="${personalInfo.profileImage}" alt="Foto de Perfil" class="photo"/>`
    : "";

  // Estructura HTML completa del CV
  return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo.fullName}'s CV</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        /* Estilos generales */
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; font-size: 14px; color: #333; }
        .container { padding: 30px; max-width: 800px; margin: 0 auto; background-color: #fff; }
        
        /* Estilos del encabezado */
        .header { background-color: #fff}; color: white; padding: 25px 30px; border-radius: 8px; margin-bottom: 20px; position: relative; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .contact-info { margin-top: 8px; font-size: 16px; line-height: 1.5; }
        .contact-info span { margin-right: 15px; display: inline-block; }
        
        /* Estilos de sección */
        .section { margin-top: 10px; }
        .section-title { font-size: 20px; color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px; margin-bottom: 15px; font-weight: 700; }
        
        /* Estilos de ítem (Experiencia/Educación) */
        .item { margin-bottom: 10px; page-break-inside: avoid; }
        .item-title { font-weight: 600; margin-bottom: 1px; font-size: 16px; color: #000; }
        .item-subtitle { font-style: italic; font-size: 13px; color: #4b5563; margin-bottom: 5px; }
        .date-range { float: right; font-size: 12px; color: #6b7280; font-weight: 400; }
        .description { font-size: 14px; margin-top: 5px; line-height: 1.5; white-space: pre-wrap; }
        
        /* Estilos del resumen */
        .summary { font-style: italic; margin-top: 10px; line-height: 1.6; color: #4b5563; }
        
        /* Estilos de la foto */
        .photo { 
          width: 100px; 
          height: 100px; 
          border-radius: 50%; 
          object-fit: cover; 
          position: absolute; 
          top: 15px; 
          right: 30px; 
          border: 5px solid white; 
          box-shadow: 0 0 10px rgba(0,0,0,0.1); 
        }
        
        .clearfix { display: flex; justify-content: space-between; align-items: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Encabezado -->
        <div class="header">
            ${photoTag}
            <div style="padding-right: ${photoTag ? "130px" : "0"};">
                <h1>${personalInfo.fullName}</h1>
                <div class="contact-info">
                    ${
                      personalInfo.phone
                        ? `<span>📞 ${personalInfo.phone}</span>`
                        : ""
                    }
                    ${
                      personalInfo.email
                        ? `<span>✉️ ${personalInfo.email}</span>`
                        : ""
                    }
                    ${
                      personalInfo.location
                        ? `<span>📍${personalInfo.location}</span>`
                        : ""
                    }
                </div>
            </div>
        </div>
        
        <!-- Resumen -->
        ${
          personalInfo.summary
            ? `
            <div class="section">
                <h2 class="section-title">Resumen Profesional</h2>
                <p class="summary">${personalInfo.summary}</p>
            </div>`
            : ""
        }

        <!-- Experiencia Laboral -->
        ${
          experiences.length > 0
            ? `
            <div class="section">
                <h2 class="section-title">Experiencia Laboral</h2>
                ${experienceHtml}
            </div>`
            : ""
        }

        <!-- Educación -->
        ${
          education.length > 0
            ? `
            <div class="section">
                <h2 class="section-title">Educación</h2>
                ${educationHtml}
            </div>`
            : ""
        }
        
      </div>
    </body>
    </html>
  `;
};

export default function PreviewScreen() {
  const { cvData } = useCVContext();
  const router = useRouter();

  // Función para generar y compartir PDF
  const handleGenerateAndSharePDF = async () => {
    // Si hay imagen, convertirla a base64
    let updatedData = { ...cvData };

    if (cvData.personalInfo.profileImage) {
      const base64Image = await getBase64Image(
        cvData.personalInfo.profileImage
      );
      if (base64Image) {
        updatedData.personalInfo.profileImage = base64Image;
      }
    }

    // Generar el contenido HTML
    const htmlContent = generateCVHtml(cvData);
    const fileName = `${cvData.personalInfo.fullName.replace(
      /\s/g,
      "_"
    )}_CV.pdf`;

    try {
      // 2. Generar el archivo PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      console.log("PDF generado en:", uri);

      // 3. Compartir el archivo PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Compartir CV en PDF",
          UTI: "com.adobe.pdf",
        });
      } else {
        console.warn(
          "La función de compartir no está disponible en este dispositivo."
        );
      }
    } catch (error) {
      console.error("Error al generar o compartir el PDF:", error);
      console.error(
        "Hubo un error al generar el CV. Revisa la consola para más detalles."
      );
    }
  };

  return (
    // <View style={styles.container}>
    //   <CVPreview cvData={cvData} />
    // </View>

    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Vista Previa CV",
          headerRight: () => (
            <NavigationButton
              title="Editar"
              variant="primary"
              onPress={() => router.navigate("/")}
            />
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CVPreview cvData={cvData} />
      </ScrollView>

      <View style={styles.pdfButtonContainer}>
        <NavigationButton
          title="Generar y Compartir PDF"
          onPress={handleGenerateAndSharePDF}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 100,
  },
  pdfButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#3498db",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});
