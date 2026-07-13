"use client";

import { Bell, Menu } from "lucide-react";
import Image from "next/image";

export default function Navbar({ setOpen }) {

  return (

    <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden"
        >
          <Menu size={28}/>
        </button>

    

      </div>

      <div className="flex items-center gap-5">
        <button><Bell size={22} /></button>

        <div className="w-10 h-10 rounded-full">
          <img src="/images/man.jpg" className="rounded-full w-10 h-10" />
        </div>

      </div>

    </header>

  );
}