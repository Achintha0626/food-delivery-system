import React from "react";

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        © {new Date().getFullYear()} Eato. All rights reserved.
      </div>
    </footer>
  );
}
