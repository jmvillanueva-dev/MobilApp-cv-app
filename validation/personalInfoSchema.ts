import * as yup from "yup";

// Esquema de validación para los datos personales
export const personalInfoSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("❌ EL nombre completo es obligatorio.")
    .matches(/^[a-zA-Z]*$/, "❌ El nombre solo puede contener letras.")
    .min(3, "❌ El nombre debe tener al menos 3 caracteres.")
    .max(40, "❌ Solo se admite maximo 40 caracteres."),
  email: yup
    .string()
    .required("❌ El email es obligatorio.")
    .email("❌ El email no es válido.")
    .max(40, "❌ Solo se admite maximo 40 caracteres."),
  phone: yup
    .string()
    .nullable()
    .defined()
    .matches(/^\+\d{1,3} \d{7,15}$/, "❌ El formato del teléfono es inválido. Ejemplo: +34 123456789")
    .min(10, "❌ El teléfono debe tener mínimo 10 números.")
    .max(15, "❌ Solo se admite maximo 15 caracteres."),
  location: yup
    .string()
    .nullable()
    .defined()
    .max(50, "❌ Solo se admite maximo 50 caracteres."),
  summary: yup.string().nullable().defined(),
});

export type PersonalInfoFormValues = yup.InferType<typeof personalInfoSchema>;
