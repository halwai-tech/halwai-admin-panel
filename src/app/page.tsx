'use client';

import React from 'react';
import {
  Box,
  Typography,
  
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Grid
} from '@mui/material';
import {
  Event,
  BookOnline,
  AttachMoney,
  People,
  Star,
} from '@mui/icons-material';
import { grotesk } from '@/utils/fonts';
import AllUsers from '@/components/userManagement/AllUsers';
const users = [
  { name: 'Rahul Sharma', email: 'rahul@example.com', role: 'User', status: 'Active' },
  { name: 'Priya Singh', email: 'priya@example.com', role: 'Halwai', status: 'Active' },
  { name: 'Ankit Verma', email: 'ankit@example.com', role: 'User', status: 'Inactive' },
  { name: 'Sneha Patel', email: 'sneha@example.com', role: 'User', status: 'Active' },
  { name: 'Ramesh Kumar', email: 'ramesh@example.com', role: 'Halwai', status: 'Pending' },
];

export default function HomePage() {
  const stats = [
    {
      title: 'Total Enquiries',
      value: 25,
      color: '#1976d2',
      icon: <Event sx={{ fontSize: 40, color: 'white' }} />,
    },
    {
      title: 'Total Bookings',
      value: 120,
      color: '#2e7d32',
      icon: <BookOnline sx={{ fontSize: 40, color: 'white' }} />,
    },
    {
      title: 'Revenue (₹)',
      value: '85,000',
      color: '#ed6c02',
      icon: <AttachMoney sx={{ fontSize: 40, color: 'white' }} />,
    },
    {
      title: 'Total Users',
      value: 78,
      color: '#6a1b9a',
      icon: <People sx={{ fontSize: 40, color: 'white' }} />,
    },
    {
      title: 'Top Halwais',
      value: 10,
      color: '#0288d1',
      icon: <Star sx={{ fontSize: 40, color: 'white' }} />,
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight="bold" sx={{fontFamily:grotesk.style}}>
        Dashboard Overview
      </Typography>

      {/* --- STAT CARDS --- */}
      <Grid container spacing={2} mb={4}>
        {stats.map((stat, index) => (
          <Grid key={index}   size={{xs:12,sm:6,md:4,lg:2.4}}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: stat.color,
                color: 'white',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                },
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{fontFamily:grotesk.style}}>{stat.title}</Typography>
                <Typography variant="h4" sx={{fontFamily:grotesk.style}} fontWeight="bold">
                  {stat.value}
                </Typography>
              </Box>
              {stat.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* --- USER TABLE --- */}
      {/* <Typography variant="h5" mb={2} fontWeight="bold" sx={{fontFamily:grotesk.style}}>
        Recent Users
      </Typography> */}
      {/* <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} >Avatar</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Avatar
                    sx={{ bgcolor: '#1976d2' }}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={user.role === 'Halwai' ? 'secondary' : 'primary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={
                      user.status === 'Active'
                        ? 'success'
                        : user.status === 'Pending'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    
      <AllUsers />
      
    </Box>
  );
}
