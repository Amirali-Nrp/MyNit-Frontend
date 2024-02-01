"use client";

import { useState } from "react";

import useTest from "@/core/api/use-test";
import { useStudentStorage } from "@/storage/storage";

import UserInfo from "./UserInfo";

const HeaderCard = () => {
  return (
    <div className="sticky top-0 z-50 flex h-[72px] w-full flex-row items-center justify-between border-t-[5px] border-t-[#002145] bg-white shadow-lg shadow-[#002145] sm:h-24">
      <UserInfo style={{ marginLeft: "20px" }} />
      <img
        className="mr-[10px] h-[49.3px] w-[42.3px] sm:h-[74px] sm:w-[63.5px]"
        src="/assets/Logo_Dark.png"
      />
    </div>
  );
};

export default HeaderCard;
