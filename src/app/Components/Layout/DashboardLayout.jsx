'use client'

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/Auth/Login";
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-sm font-semibold text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="flex h-screen">

      <Sidebar
        open={openSidebar}
        setOpen={setOpenSidebar}
      />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Navbar
          setOpen={setOpenSidebar}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-5">
          {children}
        </main>

      </div>

    </div>
  );
}