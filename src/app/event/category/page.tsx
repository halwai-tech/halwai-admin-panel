"use client";
import React,{useState,useEffect} from "react";
import { Grid } from "@mui/material";
import AddCategoryForm from "@/components/event/AddCategoryForm";
import CategoryList from "@/components/event/CategoryList";
import { adminController } from "@/api/adminController";
import { IEventCategory } from "@/utils/typeDef";
const ManageEventCategory = () => {
      const [categoryList, setCategoryList] = useState<IEventCategory[]>([]);
       const [loading, setLoading] = useState(true);


        useEffect(() => {
          async function fetchCategoryList() {
            try {
              setLoading(true);
              let response = await adminController.getAllCategory();
              setCategoryList(response?.data?.data || []);
              console.log("category list: ", response?.data?.data);
            } catch (error) {
              console.log("Error in fetching the category list: ", error);
            } finally {
              setLoading(false);
            }
          }
      
          fetchCategoryList();
        }, []);
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 5 }}>
        <CategoryList categoryList={categoryList} loading={loading} />
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <AddCategoryForm />
      </Grid>
    </Grid>
  );
};

export default ManageEventCategory;
