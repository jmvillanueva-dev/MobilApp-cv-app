import * as Yup from "yup";

const currentYear = new Date().getFullYear();

export const educationSchema = Yup.object().shape({
  institution: Yup.string()
    .required("❌ El nombre de la institución es obligatorio.")
    .min(3, "❌ Debe tener al menos 3 caracteres.")
    .max(50, "❌ No debe exceder los 50 caracteres."),

  degree: Yup.string()
    .required("❌ El título o grado es obligatorio.")
    .min(3, "❌ Debe tener al menos 3 caracteres.")
    .max(50, "❌ No debe exceder los 50 caracteres."),

  field: Yup.string().nullable().defined(),

  graduationYear: Yup.number()
    .nullable()
    .defined()
    .typeError("❌ El año debe ser un número.")
    .integer("❌ Debe ser un año entero.")
    .min(1900, "❌ El año debe ser posterior a 1900.")
    .max(currentYear, `❌ El año no puede ser futuro (máximo ${currentYear}).`),
});

export type EducationFormValues = Yup.InferType<typeof educationSchema>;
