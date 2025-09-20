import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { Bell } from "lucide-react"; // Or any other icon you want for notifications
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Assuming you have Avatar component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* App Logo and Name */}
        <Link href="/" className="flex items-center space-x-2 mr-4">
          {/* Icon placeholder - replace with actual icon component or img tag */}
          <div className="h-6 w-6 flex items-center justify-center text-primary">
            {/* Using an SVG path for the icon - you can replace this with an <img> tag if you save the icon as an image file */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M5.56 2.956A1.5 1.5 0 0 0 4 4.31v15.38c0 .783.842 1.22 1.44 1.776l8.832-8.318a1.5 1.5 0 0 0 0-2.236L5.56 2.956Z" />
              <path d="M18 12 .56 2.956A1.5 1.5 0 0 1 4 4.31v15.38c0 .783.842 1.22 1.44 1.776l8.832-8.318a1.5 1.5 0 0 0 0-2.236L5.56 2.956Z" />
              <path fillRule="evenodd" d="M15.79 2.21A.75.75 0 0 1 16.5 3v18a.75.75 0 0 1-1.285.576l-9.52-8.999a.75.75 0 0 1 0-1.152l9.52-9A.75.75 0 0 1 15.79 2.21Zm-3.17 11.874a.75.75 0 0 0 0 1.152l5.43 5.127a.75.75 0 0 0 1.284-.575V3a.75.75 0 0 0-1.284-.576l-5.43 5.127a.75.75 0 0 0 0 1.152l-.84.793ZM4.5 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold">TalentFlow</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          {/* Notification Button */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>N</AvatarFallback> {/* Initial for TalentFlow or User */}
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