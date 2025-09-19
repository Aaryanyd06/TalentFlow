import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-slate-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome to your Dashboard
          </h2>
          <p className="mt-2 text-slate-600">
            Select a section from the sidebar to get started.
          </p>
        </div>
      </div>
    </div>
  );
}