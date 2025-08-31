"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gray-50 border-t border-gray-100 mt-16">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold text-gradient">
                  Kiracım.com
                </span>
              </Link>
              <p className="text-gray-600 max-w-md">
                AI destekli kira evi önerisi platformu. Size en uygun evi
                bulmanıza yardımcı oluyoruz.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Hızlı Linkler
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compare"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Karşılaştır
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Profil
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">İletişim</h3>
              <ul className="space-y-2 text-gray-600">
                <li>info@kiracim.com</li>
                <li>+90 (212) 123 45 67</li>
                <li>İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Kiracım.com. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="grid grid-cols-3 h-16">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive("/") ? "text-primary" : "text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs font-medium">Ana Sayfa</span>
          </Link>

          <Link
            href="/compare"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive("/compare") ? "text-primary" : "text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-xs font-medium">Karşılaştır</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive("/profile") ? "text-primary" : "text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs font-medium">Profil</span>
          </Link>
        </div>
      </div>

      {/* Mobile Spacer */}
      <div className="md:hidden h-16"></div>
    </>
  );
}
