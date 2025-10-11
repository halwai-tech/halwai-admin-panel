"use client";
import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, FormikHelpers} from "formik";
import * as Yup from "yup";
import { COLORS } from "@/utils/colors";
import { adminController } from "@/api/adminController";
import { useDispatch, UseDispatch } from "react-redux";
import { showToast } from "@/redux/slices/toastSlice";

// ✅ Define types for Formik
interface CategoryFormValues {
  eventCategoryName: string;
  image: File | null;
}

const validationSchema = Yup.object({
  eventCategoryName: Yup.string().required("Category name is required"),
  image: Yup.mixed().required("Image is required"),
});

const AddCategoryForm = () => {
    const dispatch=useDispatch();
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Paper elevation={3} sx={{ p: 4, mx: "20px", mt:5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Category
      </Typography>

      <Formik<CategoryFormValues>
        initialValues={{ eventCategoryName: "", image: null }}
        validationSchema={validationSchema}
        onSubmit={async (values:CategoryFormValues, actions: FormikHelpers<CategoryFormValues>) => {
          const formData = new FormData();
          formData.append("eventCategoryName", values.eventCategoryName);
          if (values.image) {
            formData.append("image", values.image);
          }

          let response=await adminController.addCategory(formData);
           if(response.data){
                  dispatch(showToast({message:"Event Category Added Successfully!",type:"success"}));
                }
          
                console.log("Event Category Added Successfully!", response.data);
                actions.resetForm();
                setPreview(null);
         
        }}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {
          // ✅ Handle image drop
          const onDrop = useCallback(
            (acceptedFiles: File[]) => {
              const file = acceptedFiles[0];
              if (file) {
                setFieldValue("image", file);
                setPreview(URL.createObjectURL(file));
              }
            },
            [setFieldValue]
          );

          // ✅ Remove image function
          const removeImage = () => {
            setFieldValue("image", null);
            setPreview(null);
          };

          const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: { "image/*": [] },
            multiple: false,
          });

          return (
            <Form noValidate>
              <Grid container spacing={2}>
                {/* Category Name */}
                <Grid size={{xs:12,md:12}} >
                  <Field
                    as={TextField}
                    fullWidth
                    name="eventCategoryName"
                    label="Category Name"
                    error={
                      touched.eventCategoryName &&
                      Boolean(errors.eventCategoryName)
                    }
                    helperText={
                      touched.eventCategoryName && errors.eventCategoryName
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid size={{xs:12,md:12}} >
                  <Box
                    {...getRootProps()}
                    sx={{
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
                          {values.image?.name}
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

                  {touched.image && errors.image && (
                    <Typography color="error" variant="caption" display="block">
                      {errors.image as string}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor:COLORS.primary }} fullWidth>
               {isSubmitting ? "Adding Category..." : "Add Category"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default AddCategoryForm;
