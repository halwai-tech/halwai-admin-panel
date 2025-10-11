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
import { adminController } from "@/api/adminController";
import { COLORS } from "@/utils/colors";

interface Event {
  _id: string;
  eventName: string;
  categories: string[];
  tags: string[];
  image: string;
}

const EventsListPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const response = await adminController.getAllEvents();
        // setEvents(response.data?.data || []);
        setTimeout(() => {
          setEvents([
            {
              _id: "12345",
              eventName: "Holi",
              categories: ["Festival"],
              tags: ["Colors", "Celebration"],
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Holi_Festival_of_Colors_Udaipur_Rajasthan_India_2019.jpg/320px-Holi_Festival_of_Colors_Udaipur_Rajasthan_India_2019.jpg",
            },
          ]);
          setLoading(false);
        }, 2000); // simulate API delay
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedEvents = events.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All Events
      </Typography>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: COLORS.primary }}>
              <TableRow>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Image</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Event Name</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Categories</strong>
                </TableCell>
                <TableCell sx={{ color: COLORS.white }}>
                  <strong>Tags</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from(new Array(5)).map((_, index) => (
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
                        <Skeleton width={80} height={20} animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} height={20} animation="wave" />
                      </TableCell>
                    </TableRow>
                  ))
                : paginatedEvents.map((event) => (
                    <TableRow key={event._id}>
                      <TableCell>
                        <Avatar
                          src={event.image}
                          alt={event.eventName}
                          sx={{ width: 50, height: 50 }}
                        />
                      </TableCell>
                      <TableCell>{event.eventName}</TableCell>
                      <TableCell>
                        {event.categories.map((cat, index) => (
                          <Chip
                            key={index}
                            label={cat}
                            color="primary"
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        {event.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            color="secondary"
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}

              {!loading && paginatedEvents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No events found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!loading && (
          <TablePagination
            component="div"
            count={events.length}
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

export default EventsListPage;
