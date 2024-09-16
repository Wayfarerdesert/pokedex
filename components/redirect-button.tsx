// components/RedirectButton.tsx
"use client"; // Mark this as a Client Component
import React from "react";
import { useRouter } from "next/navigation";

const RedirectButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/"); // Redirect to the home page
  };

  return (
    <button
      className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:border-gray-600"
      onClick={handleClick}
    >
      Go to Home
    </button>
  );
};

export default RedirectButton;
