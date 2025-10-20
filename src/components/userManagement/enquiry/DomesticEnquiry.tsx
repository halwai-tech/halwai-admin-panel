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

interface DomesticEnquiryProps {
  paginationControls: IPaginationControls;
 setPaginationControls: React.Dispatch<React.SetStateAction<IPaginationControls>>;
  pagination: IPagination;
  setPagination:React.Dispatch<React.SetStateAction<IPagination>>;
  enquiryData: IEnquiryData;
}

const DomesticEnquiry: React.FC<DomesticEnquiryProps> = ({
  paginationControls,
  setPaginationControls,
  pagination,
  
  enquiryData,
}) => {
  const domesticData = enquiryData.domestic;
  const domesticPagination = pagination.domestic;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaginationControls((prev) => ({
      ...prev,
      domesticPage: newPage + 1, // backend uses 1-based index
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaginationControls((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      domesticPage: 1, // reset to first page
    }));
  };

  const loading = !domesticData;

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" sx={{fontFamily:grotesk.style}} gutterBottom>
        Domestic Chef Enquiry
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
                  <strong>Days</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Visits/Day</strong>
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
                        <Skeleton width={80} height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={80} height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={120} height={20} />
                      </TableCell>
                    </TableRow>
                  ))
                : domesticData.map((item: any) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.people}</TableCell>
                      <TableCell>{item.days}</TableCell>
                      <TableCell>{item.visitsPerDay}</TableCell>
                      <TableCell>{item.whatsapp}</TableCell>
                    </TableRow>
                  ))}

              {!loading && domesticData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No enquiries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={domesticPagination.total}
          page={domesticPagination.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={paginationControls.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default DomesticEnquiry;
