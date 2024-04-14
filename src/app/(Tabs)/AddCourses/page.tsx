"use client";

import React, { useEffect, useState } from "react";

import showToast from "@/utils/showToast";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const AddCourses = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [tbody, settbody] = useState("");

  const handleClick = async () => {
    setIsLoading(true);
    let message = null;
    if (tbody == "") {
      message = (
        <p style={{ fontFamily: "Vazirmatn" }}>لطفا اطلاعات خود را وارد کنید</p>
      );
      showToast(message, "error", 3000);
      setIsLoading(false);

      return null;
    }
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/units/upload`,
        {
          raw_html: tbody.replace(/"/g, '\\"'),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .catch((err) => {
        message = <p style={{ fontFamily: "Vazirmatn" }}>خطایی رخ داد</p>;
        showToast(message, "error", 3000);
      });
    setIsLoading(false);
  };

  return (
    <div
      className="m-10 flex flex-col gap-2"
      style={{ fontFamily: "Vazirmatn" }}
      dir="rtl"
    >
      <h1 data-testid="h1">
        {"تگ <tbody>...</tbody> کپی شده ی خود را وارد کنید"}
      </h1>
      <input
        className="rounded-full p-3"
        type="text"
        placeholder="تگ tbody"
        value={tbody}
        onChange={(e) => settbody(e.target.value)}
      />
      <button
        className="h-8 rounded-full bg-sky-500"
        data-testid="submit-button"
        onClick={handleClick}
      >
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <span>ورود</span>
        )}
      </button>
    </div>
  );
};

export default AddCourses;
