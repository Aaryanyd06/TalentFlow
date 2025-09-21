import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { Bell } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";

// Your logo component
const TalentFlowLogo: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} width="175" height="28" viewBox="0 0 124 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <path d="M4 14C4 8.47715 8.47715 4 14 4C19.5228 4 24 8.47715 24 14C24 19.5228 19.5228 24 14 24" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round"/>
    <path d="M14 4C19.5228 4 24 8.47715 24 14C24 19.5228 19.5228 24 14 24C8.47715 24 4 19.5228 4 14" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" strokeDasharray="40 60" transform="rotate(60 14 14)"/>
    <text fill="currentColor" x="32" y="21" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="bold">TalentFlow</text>
  </svg>
);

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          {/* Replaced old inline svg with TalentFlowLogo */}
          <TalentFlowLogo className="h-7 w-auto text-primary" />
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">TalentFlow User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
