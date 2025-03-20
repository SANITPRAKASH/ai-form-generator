import { useRouter } from "next/navigation";
import React from "react";


const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Looks like you&apos;re lost 🧐</p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default PageNotFound;
