"use client";

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Skeleton,
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import { grotesk } from "@/utils/fonts";

interface ICategoryPagination {
  page: number;
  total: number;
  totalPages: number;
}

interface IPagination {
  domestic: ICategoryPagination;
  monthly: ICategoryPagination;
  professional: ICategoryPagination;
}

interface IEnquiryData {
  domestic: any[];
  monthly: any[];
  professional: any[];
}

interface IPaginationControls {
  domesticPage: number;
  monthlyPage: number;
  professionalPage: number;
  limit: number;
}

interface ProfessionalChefEnquiryProps {
  paginationControls: IPaginationControls;
  setPaginationControls: React.Dispatch<React.SetStateAction<IPaginationControls>>;
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  enquiryData: IEnquiryData;
}

const ProfessionalChefEnquiry: React.FC<ProfessionalChefEnquiryProps> = ({
  paginationControls,
  setPaginationControls,
  pagination,
  enquiryData,
}) => {
  const professionalData = enquiryData.professional;
  const professionalPagination = pagination.professional;

  const loading = !professionalData;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaginationControls((prev) => ({
      ...prev,
      professionalPage: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaginationControls((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      professionalPage: 1,
    }));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" sx={{fontFamily:grotesk.style}} gutterBottom>
        Professional Chef Enquiry
      </Typography>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: COLORS.primary }}>
              <TableRow>
                <TableCell sx={{ color: COLORS.white }}><strong>Occasion</strong></TableCell>
                <TableCell sx={{ color: COLORS.white }}><strong>Burners</strong></TableCell>
                <TableCell sx={{ color: COLORS.white }}><strong>Date</strong></TableCell>
                <TableCell sx={{ color: COLORS.white }}><strong>Guests</strong></TableCell>
                <TableCell sx={{ color: COLORS.white, width: 250 }}><strong>Meals</strong></TableCell>
                <TableCell sx={{ color: COLORS.white }}><strong>WhatsApp</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading
                ? Array.from({ length: paginationControls.limit }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton width={80} height={20} /></TableCell>
                      <TableCell><Skeleton width={50} height={20} /></TableCell>
                      <TableCell><Skeleton width={100} height={20} /></TableCell>
                      <TableCell><Skeleton width={50} height={20} /></TableCell>
                      <TableCell><Skeleton width={200} height={20} /></TableCell>
                      <TableCell><Skeleton width={100} height={20} /></TableCell>
                    </TableRow>
                  ))
                : professionalData.flatMap((item: any) =>
                    item.selectedDates.map((dateObj: any) => (
                      <TableRow key={dateObj._id}>
                        <TableCell>{item.occasion}</TableCell>
                        <TableCell>{item.burnersInKitchen}</TableCell>
                        <TableCell>{new Date(dateObj.date).toLocaleDateString()}</TableCell>
                        <TableCell>{dateObj.guests}</TableCell>
                        <TableCell>
                          {dateObj.meals.map((meal: any) => `${meal.name}: ${meal.count}`).join(", ")}
                        </TableCell>
                        <TableCell>{item.whatsapp}</TableCell>
                      </TableRow>
                    ))
                  )}

              {!loading && professionalData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No professional chef enquiries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={professionalPagination.total}
          page={professionalPagination.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={paginationControls.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default ProfessionalChefEnquiry;
