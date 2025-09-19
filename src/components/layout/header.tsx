import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-lg font-bold text-slate-800">TalentFlow</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-slate-600" />
          </Button>
          <div className="h-9 w-9 rounded-full bg-slate-200" />
        </div>
      </div>
    </header>
  );
}