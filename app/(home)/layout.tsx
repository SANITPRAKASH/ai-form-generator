import { DarkMode } from '@/components/DarkMode';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Navbar */}
      <div className="border-b bg-white dark:bg-gray-900">
        <nav className="flex flex-wrap items-center justify-between max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <Logo />
          
          {/* Right Side: Dashboard, User Button & Theme Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard/analytics">
              <Button variant="link" className="text-sm sm:text-base">Dashboard</Button>
            </Link>
            <UserButton />
            <DarkMode />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;
