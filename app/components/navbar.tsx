"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="text-gray-600  fixed top-0 w-full  z-40 bg-[#6366F1]">
      <div className="  flex flex-wrap  p-5 mx-auto  container flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-indigo-500 p-2 bg-white  rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-white text-xl">Tailblocks</span>
        </Link>
        <nav className="md:ml-auto  flex flex-wrap text-white items-center text-base justify-center">
          <Link href={"/"} className="mr-5 hover:text-gray-900">
            Home page
          </Link>
          <Link href={"/all-products"} className="mr-5 hover:text-gray-900">
            All Products
          </Link>
        </nav>
        <div className="flex gap-x-2">
          {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Button
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button> */}
          <button
            onClick={() => router.push("/login")}
            className="inline-flex  cursor-pointer items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Login In
          </button>
          <button
            onClick={() => router.push("/sign-up")}
            className="inline-flex cursor-pointer  duration-300 ease-in-out   items-center bg-transparent border-gray-200  border-2 text-white hover:text-black  py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
