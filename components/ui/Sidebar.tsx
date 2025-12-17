"use client";

import { useUserStore } from "@/store/useUserStore";
import { useState, useEffect } from "react";

export default function SideBar() {
  const userName = useUserStore((s) => s.userName);
  const setUserName = useUserStore((s) => s.setUserName);

  const [name, setName] = useState(userName);
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {/* 🔘 Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="absolute z-40 top-4 left-4 w-10 h-10
                   rounded-full bg-neutral-900 shadow-lg
                   flex items-center justify-center"
      >
        {open ? "←" : "→"}
      </button>

      {/* Sidebar */}
      <aside
        className={`absolute z-30 top-0 left-0 h-full w-96
          bg-neutral-900 p-6 flex flex-col gap-6
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h1 className="text-xl font-semibold">Navigation</h1>

        <div>
          <label className="text-sm text-neutral-400">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg bg-neutral-800 p-3 outline-none"
            placeholder="Enter your name"
          />
          <button
            onClick={() => setUserName(name)}
            className="mt-3 w-full rounded-lg bg-blue-600 py-2 font-medium"
          >
            Save
          </button>
        </div>

        <div className="border-t border-neutral-800 pt-4 text-sm text-neutral-400">
          Click map to select start and destination (next step).
        </div>
      </aside>
    </>
  );
}
