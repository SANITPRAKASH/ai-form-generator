import DashboardSidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="mx-6 my-4 w-full">{children}</main>
    </SidebarProvider>

    );
};

export default Layout;
