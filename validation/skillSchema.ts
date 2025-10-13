import * as Yup from "yup";
import { SkillLevel } from "../types/cv.types";

const skillLevels: SkillLevel[] = [
  "básico",
  "intermedio",
  "avanzado",
  "experto",
];

export const skillSchema = Yup.object().shape({
  name: Yup.string()
    .required("❌ El nombre de la habilidad es obligatorio.")
    .min(2, "❌ Debe tener al menos 2 caracteres.")
    .max(50, "❌ No debe exceder los 50 caracteres."),

  level: Yup.string()
    .oneOf(skillLevels, "❌ Nivel de habilidad inválido.")
    .required(
      "❌ El nivel de habilidad es obligatorio."
    ) as Yup.Schema<SkillLevel>,
});

export type SkillFormValues = Yup.InferType<typeof skillSchema>;
