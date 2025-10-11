"use client";
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Box,
  Paper,
  TablePagination,
  Skeleton,
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import { IEventCategory } from "@/utils/typeDef";


const CategoryList = ({categoryList,loading}:{categoryList:IEventCategory[],loading:boolean}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
 


  // ✅ Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // ✅ Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: COLORS.primary,
                "& th:first-of-type": { borderTopLeftRadius: 2 },
                "& th:last-of-type": { borderTopRightRadius: 2 },
              }}
            >
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
              >
                Image
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
              >
                Category
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton
                        variant="circular"
                        width={56}
                        height={56}
                        animation="wave"
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="80%" animation="wave" />
                    </TableCell>
                  </TableRow>
                ))
              : categoryList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category) => (
                    <TableRow
                      key={category._id}
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { borderBottom: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell>
                        <Avatar
                          src={category.image}
                          alt={category.eventCategoryName}
                          sx={{ width: 56, height: 56 }}
                          variant="circular"
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: 15 }}>
                        {category.eventCategoryName}
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>

        {/* ✅ Pagination controls */}
        <TablePagination
          component="div"
          count={categoryList.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[3]}
        />
      </Paper>
    </Box>
  );
};

export default CategoryList;
