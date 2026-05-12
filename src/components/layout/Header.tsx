"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Solutions", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center justify-between h-14 sm:h-16 lg:h-20"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-gray-900"
            >
              <Image
                src="/metrix-logo-main.png"
                alt="MetrixAI"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9"
              />
              <span>MetrixAI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/demo">
                <Button size="sm">Request a Demo</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src="/metrix-logo-main.png"
                      alt="MetrixAI"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                    <span>MetrixAI</span>
                  </Link>
                  <button
                    type="button"
                    className="p-2 text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="p-4 border-t space-y-3">
                  <Link
                    href="/demo"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button className="w-full">Request a Demo</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
