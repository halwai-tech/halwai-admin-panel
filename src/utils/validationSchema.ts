import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export const AddEventValidationSchema=Yup.object({
  eventName: Yup.string()
    .required("Event name is required")
    .min(3, "Event name must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  categories: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one category is required"),
  tags: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one tag is required"),
  image: Yup.mixed<File>()
    .required("Image is required")
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return false;
      return (
        value instanceof File &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});