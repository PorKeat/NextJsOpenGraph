"use client";

import Link from "next/link";
import { navLink } from "./menu"; // This contains all links, including Register and Login
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export default function NavbarComponent() {
  const { itemsCount } = useAppSelector((state) => state.cart);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          {navLink
            .filter(
              (item) =>
                item.name !== "Register" &&
                item.name !== "Login" &&
                item.name !== "User-Dashboard" &&
                item.name !== "Blog-Dashboard"
            )
            .map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`transition ${
                  pathname === item.path
                    ? "text-black font-medium"
                    : "hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            ))}

          <div className="relative">
            <button
              onClick={() => setIsDashboardDropdownOpen(!isDashboardDropdownOpen)}
              className="hover:text-black cursor-pointer"
            >
              Dashboard
              <ChevronDown className="inline h-4 w-4 ml-1" />
            </button>

            {isDashboardDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md py-2">
                {navLink
                  .filter(
                    (item) =>
                      item.name === "User-Dashboard" ||
                      item.name === "Blog-Dashboard"
                  )
                  .map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-black"
                      onClick={() => setIsDashboardDropdownOpen(false)} // Close dropdown when clicking a link
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="hover:text-black cursor-pointer"
            >
              Account
              <ChevronDown className="inline h-4 w-4 ml-1" />
            </button>

            {isAccountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md py-2">
                {navLink
                  .filter(
                    (item) => item.name === "Register" || item.name === "Login"
                  )
                  .map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-black"
                      onClick={() => setIsAccountDropdownOpen(false)} // Close dropdown when clicking a link
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>

          <Link href="/cart"> 
            <Button variant="ghost" size="icon" className="relative cursor-pointer">
              <ShoppingCart className="h-5 w-5 text-gray-800 " />
              {itemsCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-medium">
                  {itemsCount}
                </div>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-3">
          {navLink
            .filter((item) => item.name !== "Register" && item.name !== "Login")
            .map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block text-sm ${
                  pathname === item.path
                    ? "text-black font-medium"
                    : "text-gray-600 hover:text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

          <div className="mt-2">
            <div className="text-sm text-gray-600">Account</div>
            <div className="ml-2 mt-2 space-y-2">
              {navLink
                .filter(
                  (item) => item.name === "Register" || item.name === "Login"
                )
                .map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block text-sm text-gray-600 hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>

          <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="cursor-pointer">
            <div className="flex items-center justify-between px-4 py-2 border rounded-lg">
              <span className="text-sm text-gray-700">Cart</span>
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {itemsCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-medium">
                    {itemsCount}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
