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

// --- Interfaces reused from EnquiryList for type safety ---
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

interface MonthlyEnquiryProps {
  paginationControls: IPaginationControls;
  setPaginationControls: React.Dispatch<React.SetStateAction<IPaginationControls>>;
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>; // ✅ fixed
  enquiryData: IEnquiryData;
}

const MonthlyEnquiry: React.FC<MonthlyEnquiryProps> = ({
  paginationControls,
  setPaginationControls,
  pagination,
  enquiryData,
}) => {
  const monthlyData = enquiryData.monthly;
  const monthlyPagination = pagination.monthly;
  const loading = !monthlyData;

  // --- Handle pagination events ---
  const handleChangePage = (event: unknown, newPage: number) => {
    setPaginationControls((prev) => ({
      ...prev,
      monthlyPage: newPage + 1, // backend uses 1-based indexing
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaginationControls((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      monthlyPage: 1, // reset to first page
    }));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" sx={{fontFamily:grotesk.style}} gutterBottom>
        Monthly Chef Enquiry
      </Typography>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: COLORS.primary }}>
              <TableRow>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>People</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Start Date</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Gender Preference</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>WhatsApp</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading
                ? Array.from(new Array(paginationControls.limit)).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton width={80} height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={120} height={20} />
                      </TableCell>
                    </TableRow>
                  ))
                : monthlyData.map((item: any) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.people}</TableCell>
                      <TableCell>
                        {item.startDate
                          ? new Date(item.startDate).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell>{item.genderPreference || "—"}</TableCell>
                      <TableCell>{item.whatsapp}</TableCell>
                    </TableRow>
                  ))}

              {!loading && monthlyData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No monthly enquiries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={monthlyPagination.total}
          page={monthlyPagination.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={paginationControls.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default MonthlyEnquiry;
