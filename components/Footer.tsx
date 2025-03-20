"use client";


import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">YourBrand</h2>
          <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
