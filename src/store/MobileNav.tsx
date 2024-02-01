"use client";

import Image from "next/image";
import Link from "next/link";

import useOutsideClick from "@/store/NavigationBar";
import { useMobileNavOpenStore } from "@/store/use-mobile-nav-store";

import { cn } from "@/lib/utils";

const MobileNav = () => {
  const { open, setOpen, toggle } = useMobileNavOpenStore();
  const ref = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  return (
    <div className="fixed top-[10%] z-50 ltr:left-0 rtl:right-0 md:hidden">
      <div className="flex">
        <div
          className={cn(
            "py-13 text-gray-tertiary flex flex-col items-center gap-4 rounded-e-3xl border bg-[#D9D9D9] transition-all duration-500",
            open ? "h-fit w-14" : "w-0"
          )}
          ref={ref}
        >
          <div
            className={cn(
              "hover:fill-yellow-primary flex items-center justify-center rounded-lg fill-[#999999] p-2 text-center transition-all duration-700",
              !open &&
                "opacity-0 transition-all ltr:-translate-x-10 rtl:translate-x-10"
            )}
          >
            kjvgycyfkjnmpoib
          </div>
          <div
            className={cn(
              "hover:fill-yellow-primary flex items-center justify-center rounded-lg fill-[#999999] p-2 text-center transition-all duration-700",
              !open &&
                "opacity-0 transition-all ltr:-translate-x-10 rtl:translate-x-10"
            )}
          >
            kjvgycyfkjnmpoib
          </div>
        </div>
        {!open && (
          <div
            onClick={toggle}
            className="text-gray-tertiary inset-y-0 flex w-9 cursor-pointer items-center justify-center rounded-e-2xl border border-r-0 bg-[#D9D9D9] pe-1 text-center"
          >
            <svg
              width="16"
              height="45"
              viewBox="0 0 16 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ltr:rotate-180 rtl:rotate-0"
            >
              <path
                d="M7.95455 0L0 7.95455L7.95455 15.9091L10.9375 12.9261L5.96591 7.95455L10.9375 2.98295L7.95455 0Z"
                fill="#999999"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
