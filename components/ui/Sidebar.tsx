"use client";

import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";

export default function SideBar() {
  const userName = useUserStore((s) => s.userName);
  const setUserName = useUserStore((s) => s.setUserName);
   const [name, setName] = useState(userName);

  return (
    <div className="w-96 bg-neutral-900 p-6 flex flex-col gap-6">
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
    </div>
  );
}
