"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  Skeleton,
} from "@mui/material";
import { userController } from "@/api/userController";
import { COLORS } from "@/utils/colors";
import { grotesk } from "@/utils/fonts";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0); // frontend pagination starts at 0
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  // Fetch users from backend API
  const fetchUsers = async (pageNumber: number, limit: number) => {
    try {
      setLoading(true);
      const response = await userController.getAllUsers(pageNumber + 1, limit);
      const responseData = response?.data;

      setUsers(responseData?.data || []);
      setTotalUsers(responseData?.totalUsers || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" sx={{fontFamily:grotesk.style}} gutterBottom>
        All Users
      </Typography>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: COLORS.primary }}>
              <TableRow>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Avatar</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Username</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Role</strong>
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
                          width={50}
                          height={50}
                          animation="wave"
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={120} height={20} animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={180} height={20} animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={80} height={20} animation="wave" />
                      </TableCell>
                    </TableRow>
                  ))
                : users.map((user: any) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Avatar
                          src={`https://ui-avatars.com/api/?name=${user.username}`}
                          alt={user.username}
                          sx={{ width: 50, height: 50 }}
                        />
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role.toUpperCase()}
                          color={
                            user.role === "admin" ? "secondary" : "primary"
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}

              {!loading && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!loading && (
          <TablePagination
            component="div"
            count={totalUsers}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        )}
      </Paper>
    </Box>
  );
};

export default AllUsers;
