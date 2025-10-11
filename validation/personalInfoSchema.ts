import * as yup from "yup";

// Esquema de validación para los datos personales
export const personalInfoSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required("❌ El nombre completo es obligatorio.")
    .matches(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "❌ El nombre solo puede contener letras y espacios."
    )
    .min(3, "❌ El nombre debe tener al menos 3 caracteres.")
    .max(40, "❌ Solo se admite máximo 40 caracteres."),
  email: yup
    .string()
    .required("❌ El email es obligatorio.")
    .email("❌ El email no es válido.")
    .max(40, "❌ Solo se admite maximo 40 caracteres."),
  phone: yup
    .string()
    .nullable()
    .defined()
    .test(
      "is-valid-phone",
      "❌ El formato del teléfono es inválido. Ejemplo: +593 123456789",
      (value) => {
        if (!value || value.trim() === "") return true;
        return /^\+\d{1,3} \d{7,15}$/.test(value);
      }
    )
    .test(
      "is-valid-length",
      "❌ El teléfono debe tener entre 10 y 15 números.",
      (value) => {
        if (!value || value.trim() === "") return true;
        return (
          value.replace(/\D/g, "").length >= 10 &&
          value.replace(/\D/g, "").length <= 15
        );
      }
    ),
  location: yup
    .string()
    .nullable()
    .defined()
    .max(50, "❌ Solo se admite maximo 50 caracteres."),
  summary: yup.string().nullable().defined(),
});

export type PersonalInfoFormValues = yup.InferType<typeof personalInfoSchema>;
