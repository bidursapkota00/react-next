import { ModeToggle } from "@/components/theme/theme-toggle";
import { CheckSquare } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 h-16 flex justify-between items-center px-3">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <CheckSquare className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">TaskFlow</span>
      </Link>

      <ModeToggle />
    </nav>
  );
};
