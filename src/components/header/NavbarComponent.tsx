"use client";

import Link from "next/link";
import { navLink } from "./menu";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export default function NavbarComponent() {
  const { itemsCount } = useAppSelector((state) => state.cart);
  const pathname = usePathname();

  useEffect(() => {
    const toggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (toggle && mobileMenu) {
      const handleClick = () => {
        mobileMenu.classList.toggle("hidden");
      };
      toggle.addEventListener("click", handleClick);

      // Cleanup event listener on unmount
      return () => {
        toggle.removeEventListener("click", handleClick);
      };
    }
  }, []);
  return (
    <nav className="bg-blue-500 shadow-lg fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* <!-- Logo --> */}
          <div className="flex-shrink-0 text-white text-2xl font-bold">
            MyBrand
          </div>

          {/* <!-- Desktop Menu --> */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
            {navLink.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`${
                  pathname === item.path ? "text-amber-300" : ""
                }hover:text-yellow-300 transition`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* <!-- Desktop Button --> */}
          <div className="hidden md:block">
            <a
              href="#"
              className="bg-white text-indigo-700 px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold"
            >
              Get Started
            </a>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="ml-4 relative hover:bg-transparent cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5 text-white" />
                {itemsCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-600 rounded-full h-4 w-4 p-2 flex items-center justify-center border-2 border-white shadow font-bold text-white">
                    <span className="text-[8px]">{itemsCount}</span>
                  </div>
                )}
              </Button>
            </Link>
          </div>

          {/* <!-- Mobile Menu Button --> */}
          <div className="md:hidden">
            <button
              id="menu-toggle"
              className="text-white focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile Menu --> */}
      <div
        id="mobile-menu"
        className="md:hidden hidden px-4 pb-4 space-y-2 text-white font-medium"
      >
        {navLink.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`${
              pathname === item.path ? "text-black" : ""
            }hover:text-yellow-300 transition`}
          >
            {item.name}
          </Link>
        ))}
        <a
          href="#"
          className="block bg-white text-indigo-700 text-center px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold mt-2"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
