"use client";

import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import axios from "axios";
import { AddEventValidationSchema } from "@/utils/validationSchema";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Box,
  Paper,
  InputLabel,
  Grid,
} from "@mui/material";
import { adminController } from "@/api/adminController";
import { useDropzone } from "react-dropzone";
import { COLORS } from "@/utils/colors";
import { useDispatch, UseDispatch } from "react-redux";
import { showToast } from "@/redux/slices/toastSlice";


type EventFormValues = {
  eventName: string;
  description: string;
  categories: string[];
  tags: string[];
  image: File | null;
};

const categoriesOptions = [
  { id: "689390d728f02072edfbc4bf", label: "Category 1" },
  { id: "6893912e28f02072edfbc4c3", label: "Category 2" },
];

export default function AddEventForm() {

  const dispatch=useDispatch();
  const [preview, setPreview] = useState<string | null>(null);
 

  const initialValues: EventFormValues = {
    eventName: "",
    description: "",
    categories: [],
    tags: [],
    image: null,
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (
    values: EventFormValues,
    actions: FormikHelpers<EventFormValues>
  ) => {
    const formData = new FormData();
    formData.append("eventName", values.eventName);
    formData.append("description", values.description);
    formData.append("categories", JSON.stringify(values.categories));
    formData.append("tags", JSON.stringify(values.tags));
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
 

      const response = await adminController.addEvent(formData);
      if(response.data){
        dispatch(showToast({message:"New Event Added Successfully!",type:"success"}));
      }

      console.log("✅ Event added successfully:", response.data);
      actions.resetForm();
      setPreview(null);
    } catch (error: any) {
      console.error("❌ Failed to add event:", error?.response?.data || error);
      dispatch(showToast({message:"Error In Adding the New Event!",type:"error"}));
    } finally {
      actions.setSubmitting(false);
    
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, my: "20px", mx: "20px", borderRadius: "3px" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Event
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={AddEventValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          const onDrop = (acceptedFiles: File[]) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
              const file = acceptedFiles[0];
              formik.setFieldValue("image", file);
              setPreview(URL.createObjectURL(file));
            }
          };

          const removeImage = () => {
            formik.setFieldValue("image", null);
            setPreview(null);
          };

          const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: {
              "image/jpeg": [],
              "image/png": [],
              "image/jpg": [],
            },
            multiple: false,
          });

          return (
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid size={{xs:12,md:6}} >
                  <TextField
                    fullWidth
                    label="Event Name"
                    name="eventName"
                    value={formik.values.eventName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.eventName &&
                      Boolean(formik.errors.eventName)
                    }
                    helperText={
                      formik.touched.eventName && formik.errors.eventName
                    }
                  />
                </Grid>

                <Grid  size={{xs:12,md:6}} >
                  <FormControl fullWidth>
                    <InputLabel id="categories-label">Categories</InputLabel>
                    <Select
                      labelId="categories-label"
                      multiple
                      name="categories"
                      value={formik.values.categories}
                      onChange={(e) =>
                        formik.setFieldValue("categories", e.target.value)
                      }
                      renderValue={(selected) =>
                        categoriesOptions
                          .filter((cat) => selected.includes(cat.id))
                          .map((cat) => cat.label)
                          .join(", ")
                      }
                    >
                      {categoriesOptions.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.categories &&
                      formik.errors.categories && (
                        <Typography color="error" variant="caption">
                          {formik.errors.categories as string}
                        </Typography>
                      )}
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                margin="normal"
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="Tags (comma separated)"
                value={formik.values.tags.join(",")}
                onChange={(e) =>
                  formik.setFieldValue(
                    "tags",
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
                onBlur={formik.handleBlur}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
              />

              <Box
                {...getRootProps()}
                sx={{
                  mt: 2,
                  p: 3,
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: isDragActive ? "#f0f8ff" : "transparent",
                }}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <Box>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        maxWidth: "200px",
                        marginTop: 10,
                        borderRadius: 8,
                      }}
                    />
                    <Typography variant="body2" mt={1}>
                      {formik.values.image?.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      Remove Image
                    </Button>
                  </Box>
                ) : isDragActive ? (
                  <Typography variant="body2">
                    Drop the image here...
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    Drag & drop an image, or click to select
                  </Typography>
                )}
              </Box>

              {formik.touched.image && formik.errors.image && (
                <Typography color="error" variant="caption" display="block">
                  {formik.errors.image as string}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, bgcolor: COLORS.primary }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Adding Event..." : "Add Event"}
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Paper>
  );
}
