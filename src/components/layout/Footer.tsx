import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Demo", href: "/demo" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "mailto:info@metrixai.io" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 mb-4 sm:mb-0">
              <Link href="/" className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                <Image
                  src="/metrix-logo-main.png"
                  alt="MetrixAI"
                  width={32}
                  height={32}
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <span>MetrixAI</span>
              </Link>
              <p className="text-sm sm:text-base text-gray-400 max-w-sm leading-relaxed">
                MetrixAI helps HR leaders see who is ready, who is at risk, and who is next — so leadership continuity is never left to chance.
              </p>
              <div className="mt-4 sm:mt-6">
                <a
                  href="mailto:info@metrixai.io"
                  className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                >
                  info@metrixai.io
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Product</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Company</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Legal</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-4 sm:py-6">
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            &copy; {currentYear} MetrixAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
