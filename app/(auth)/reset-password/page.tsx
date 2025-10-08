"use client";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const res = await fetch("/api/auth/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
    setStatus(res.ok ? "Password updated" : "Reset failed");
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <input className="w-full border p-2" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
      <input className="w-full border p-2" placeholder="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-black text-white py-2">Reset</button>
      {status && <p className="text-sm">{status}</p>}
    </form>
  );
}


