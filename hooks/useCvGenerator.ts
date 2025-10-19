import { useCVContext } from "@/context/CVContext";
import {
  CVData,
  Education,
  Experience,
  Skill,
  SkillLevel,
} from "@/types/cv.types";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

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

const generateCVHtml = (data: CVData): string => {
  const { personalInfo, experiences, education, skills } = data;

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

  const skillHtml = skills
    .map(
      (skill: Skill) => `
    <div class="skill-item">
        <h3 class="item-title">${skill.name}</h3>
        <span class="skill-level level-${skill.level}"> 
        <span>${getLevelIndicator(skill.level)} <span>
        [${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}] 
        
        </span>
    </div>
  `
    )
    .join("");

  const photoTag = personalInfo.profileImage
    ? `<img src="${personalInfo.profileImage}" alt="Foto de Perfil" class="photo"/>`
    : "";

  return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo.fullName}'s CV</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; font-size: 14px; color: #333; }
        .container { padding: 30px; max-width: 800px; margin: 0 auto; background-color: #fff; }
        
        .header { background-color: #fff}; color: white; padding: 25px 30px; border-radius: 8px; margin-bottom: 20px; position: relative; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; color: #2C3E50; }
        .contact-info { margin-top: 8px; font-size: 16px; line-height: 1.5; color: #2C3E50; }
        .contact-info span { margin-right: 15px; display: inline-block; }
        
        .section { margin-top: 10px; }
        .section-title { font-size: 20px; color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px; margin-bottom: 15px; font-weight: 700; }
        
        .item { margin-bottom: 10px; page-break-inside: avoid; }
        .item-title { font-weight: 600; margin-bottom: 1px; font-size: 16px; color: #000; }
        .item-subtitle { font-style: italic; font-size: 13px; color: #4b5563; margin-bottom: 5px; }
        .date-range { float: right; font-size: 12px; color: #6b7280; font-weight: 400; }
        .description { font-size: 14px; margin-top: 5px; line-height: 1.5; white-space: pre-wrap; }
        .skill-item { display:flex; flex-direction:row; gap:20px; align-items:flex-end; margin-bottom: 8px; }
        .skill-level { font-size: 14px; font-weight: 500; text-align: left;}
        .level-básico { color: #f39c12;}
        .level-intermedio { color: #2980b9;}
        .level-avanzado { color: #27ae60;}
        .level-experto { color: #8e44ad;font-weight: bold;}

        .summary { font-style: italic; margin-top: 10px; line-height: 1.6; color: #4b5563; }
        
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
        
        ${
          personalInfo.summary
            ? `
            <div class="section">
                <h2 class="section-title">Resumen Profesional</h2>
                <p class="summary">${personalInfo.summary}</p>
            </div>`
            : ""
        }

        ${
          experiences.length > 0
            ? `
            <div class="section">
                <h2 class="section-title">Experiencia Laboral</h2>
                ${experienceHtml}
            </div>`
            : ""
        }

        ${
          education.length > 0
            ? `
            <div class="section">
                <h2 class="section-title">Educación</h2>
                ${educationHtml}
            </div>`
            : ""
        }

        ${
          skills.length > 0
            ? `
            <div class="section">
                <h2 class="section-title">Habilidades Técnicas</h2>
                ${skillHtml}
            </div>`
            : ""
        }
        
      </div>
    </body>
    </html>
  `;
};

export const useCvGenerator = () => {
  const { cvData } = useCVContext();

  const handleGenerateAndSharePDF = async () => {
    let updatedData = { ...cvData };

    if (cvData.personalInfo.profileImage) {
      const base64Image = await getBase64Image(
        cvData.personalInfo.profileImage
      );
      if (base64Image) {
        updatedData.personalInfo.profileImage = base64Image;
      }
    }

    const htmlContent = generateCVHtml(updatedData);

    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

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
    }
  };

  return { handleGenerateAndSharePDF };
};
