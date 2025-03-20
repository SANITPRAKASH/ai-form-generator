import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {children}
    </div>
  );
};

export default Layout;
