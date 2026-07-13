"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  LayoutDashboard,
  Plus,
  LogOut,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();

  const handleLogout = () => {
    // امسحي الـ token
    localStorage.removeItem("token");

    // redirect
    window.location.href = "/Auth/Login";
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        {/* Mobile Close */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={() => setOpen(false)}>X</button>
        </div>

        {/* Logo */}
        <div className="h-16 flex items-center justify-center font-bold text-xl">
          B2B
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/Page/Home"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
              pathname === "/Page/Home"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/Page/Booking"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
              pathname === "/Page/Booking"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CalendarCheck size={20} />
            <span>Bookings</span>
          </Link>

          <Link
            href="/Page/Booking/Add"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
              pathname === "/Page/Booking/Add"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Plus size={20} />
            <span>Add Booking</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg cursor-pointer px-4 py-3 text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}