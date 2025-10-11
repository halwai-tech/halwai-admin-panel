'use client';

import { Box, Typography, Grid, Paper } from '@mui/material';

export default function HomePage() {
  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Halwai Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Events</Typography>
            <Typography variant="h4">25</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">120</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Revenue (₹)</Typography>
            <Typography variant="h4">85,000</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
