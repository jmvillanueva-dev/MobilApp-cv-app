import dayjs from "dayjs";
import * as yup from "yup";

export const experienceSchema = yup.object().shape({
  company: yup
    .string()
    .required("❌ El nombre de la empresa es obligatorio.")
    .min(2, "❌ Debe tener almenos 2 caracteres."),

  position: yup
    .string()
    .required("❌ El cargo es obligatorio.")
    .min(2, "❌ Debe tener almenos 2 caracteres."),

  startDate: yup
    .date()
    .typeError("❌ La fecha de inicio es requerida.")
    .required("❌ La fecha de inicio es obligatoria.")
    .max(new Date(), "❌ La fecha de inicio no puede ser futura."),

  endDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .typeError("❌ El valor debe ser una fecha válida.")
    .nullable()
    .test(
      "is-date",
      "❌ Debe ser una fecha válida o dejar en blanco.",
      (value) => {
        if (!value || value === null) return true;
        return dayjs(value).isValid();
      }
    )
    .when("startDate", {
      is: (startDate: Date) => dayjs(startDate).isValid(),
      then: (schema) =>
        schema
          .test(
            "is-after-start",
            "❌ La fecha de fin no puede ser anterior a la de inicio.",
            function (endDate) {
              const { startDate } = this.parent;
              if (!endDate || !(endDate instanceof Date)) return true;
              return dayjs(endDate).isAfter(
                dayjs(startDate).subtract(1, "day")
              );
            }
          )
          .max(new Date(), "❌ La fecha de fin no puede ser futura."),
      otherwise: (schema) => schema.notRequired(),
    }),

  description: yup.string().nullable().defined(),
});

export type ExperienceFormValues = yup.InferType<typeof experienceSchema>;
