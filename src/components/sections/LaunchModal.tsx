"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket } from "lucide-react";
import { Button } from "@/components/ui";

interface LaunchModalProps {
  onClose?: () => void;
}

export function LaunchModal({ onClose }: LaunchModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleScrollToForm = () => {
    handleClose();
    // Small delay to let modal close animation complete
    setTimeout(() => {
      const formSection = document.getElementById("early-access-form");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
              {/* Left Content */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium">
                    <Rocket className="w-4 h-4" />
                    Early Access
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Get Early Access to MetrixAI
                </h2>

                <p className="text-blue-100 text-base sm:text-lg mb-6 leading-relaxed">
                  Be among the first to experience MetrixAI. Join our early access program and transform how your organization develops and retains talent.
                </p>

                <p className="text-white/80 text-sm sm:text-base mb-8">
                  For more info, contact us at:<br />
                  <a href="mailto:info@metrixai.io" className="text-white font-semibold hover:underline">
                    info@metrixai.io
                  </a>
                </p>

                <Button
                  onClick={handleScrollToForm}
                  size="lg"
                  className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Join the Waitlist
                </Button>
              </div>

              {/* Right Image */}
              <div className="hidden lg:block relative bg-gradient-to-br from-violet-100 to-blue-100">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-10 right-10 w-32 h-32 bg-blue-300/30 rounded-full blur-2xl" />
                  <div className="absolute bottom-20 left-10 w-40 h-40 bg-violet-300/30 rounded-full blur-2xl" />
                </div>

                {/* Placeholder Dashboard Image */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Browser chrome */}
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-white rounded-md px-3 py-1.5 text-xs text-gray-400 border border-gray-200">
                          app.metrixai.io
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-24 bg-gray-800 rounded" />
                        <div className="h-8 w-20 bg-blue-600 rounded-lg" />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Employees", value: "2,847", color: "bg-blue-500" },
                          { label: "Skills", value: "12.5K", color: "bg-violet-500" },
                        ].map((stat, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-3">
                            <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                              <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chart Placeholder */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-xs font-medium text-gray-700 mb-3">Growth Trend</div>
                        <div className="flex items-end justify-between h-16 gap-1">
                          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="space-y-2">
                        {[
                          { name: "Sarah J.", status: "Ready" },
                          { name: "Mike C.", status: "In Progress" },
                        ].map((person, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-violet-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {person.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full ${person.status === "Ready" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                              {person.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <button
                onClick={handleClose}
                className="lg:hidden absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
