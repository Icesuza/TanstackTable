"use client";

import Link from "next/link";
import { navLink } from "./menu";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Badge, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";

export default function NavbarComponent() {
  const pathname = usePathname();
  const { itemsCount } = useAppSelector((state) => state.cart); 
  useEffect(() => {
    const toggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (toggle && mobileMenu) {
      const handleClick = () => {
        mobileMenu.classList.toggle("hidden");
      };
      toggle.addEventListener("click", handleClick);

      return () => {
        toggle.removeEventListener("click", handleClick);
      };
    }
  }, []);
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
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
            <Link
              href="#"
              className="bg-white text-indigo-700 px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold"
            >
              Get Started
            </Link>
            {/* Cart Button with Badge */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {/* Show badge only if there are items in cart */}
                {itemsCount > 0 && (
                  <Badge
                    fontVariant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemsCount}
                  </Badge>
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

        <Link
          href="#"
          className="block bg-white text-indigo-700 text-center px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold mt-2"
        >
          Get Started
        </Link>
        {/* Cart Button with Badge */}
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {/* Show badge only if there are items in cart */}
            {itemsCount > 0 && (
              <Badge
                fontVariant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {itemsCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
