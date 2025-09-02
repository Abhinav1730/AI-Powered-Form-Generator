import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shared Header / Navbar */}
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="p-8">{children}</main>
    </div>
  );
}

