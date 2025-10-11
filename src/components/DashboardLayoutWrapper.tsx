'use client';

import * as React from 'react';
import { AppProvider, type NavigationItem } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
});

// ✅ Typed as NavigationItem[]
const navigation: NavigationItem[] = [
  { kind: 'page', segment: '/', title: 'Dashboard', icon: <DashboardIcon /> },
  { kind: 'page', segment: '/events', title: 'Events', icon: <EventIcon /> },
  { kind: 'page', segment: '/items', title: 'Items', icon: <RestaurantMenuIcon /> },
  { kind: 'page', segment: '/bookings', title: 'Bookings', icon: <BookOnlineIcon /> },
  { kind: 'page', segment: '/reports', title: 'Reports', icon: <AssessmentIcon /> },
  { kind: 'divider' }, 
  { kind: 'page', segment: '/settings', title: 'Settings', icon: <SettingsIcon /> },
];

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toolpadRouter = {
    pathname,
    searchParams: searchParams ?? new URLSearchParams(),
    navigate: (url: string | URL) => {
      router.push(typeof url === 'string' ? url : url.toString());
    },
  };

  return (
    <AppProvider navigation={navigation} router={toolpadRouter} theme={theme}>
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
}
