import { Facebook, Instagram, Youtube, Github, X } from "lucide-react";
const Footer = () => {
  const primaryLinks = [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ];
  const socialIcons = [
    { Icon: Facebook, href: "https://facebook.com", ariaLabel: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com", ariaLabel: "Instagram" },
    { Icon: X, href: "https://twitter.com", ariaLabel: "Twitter (X)" },
    { Icon: Github, href: "https://github.com", ariaLabel: "GitHub" },
    { Icon: Youtube, href: "https://youtube.com", ariaLabel: "YouTube" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6">
          {primaryLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm hover:text-white transition duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex justify-center space-x-6 pb-6 border-b border-gray-800 mb-6">
          {socialIcons.map((social) => (
            <a
              key={social.ariaLabel}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="text-gray-400 hover:text-white transition duration-300 transform hover:scale-110"
            >
              <social.Icon size={24} />
            </a>
          ))}
        </div>
        <p className="text-sm">
          &copy; {currentYear} Warka, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
