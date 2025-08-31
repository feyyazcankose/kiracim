"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold text-gradient">Kiracım.com</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/compare"
              className={`font-medium transition-colors duration-200 ${
                isActive("/compare")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Karşılaştır
            </Link>
            <Link
              href="/profile"
              className={`font-medium transition-colors duration-200 ${
                isActive("/profile")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Profil
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
