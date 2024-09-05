"use client";

import React, { useRef, useState } from "react";

import { usePreSelectDataStorage } from "@/storage/storage";
import showToast from "@/utils/showToast";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import domtoimage from "dom-to-image"; // Import dom-to-image for DOM capture
import Cookies from "js-cookie";
import * as XLSX from "xlsx";

import { Eligible } from "@/types/userTypes";

import CourseSelect from "@/components/preCourseSelect/CourseSelect";
import ScheduleTable from "@/components/ScheduleTable";

export default function PreCourseSelect() {
  const [isLoading, setIsLoading] = useState(false);
  const { courseData, setCourseData } = usePreSelectDataStorage();
  const scheduleTableRef = useRef<HTMLDivElement>(null); // Reference to the ScheduleTable

  const handleSave = () => {
    setIsLoading(true);
    const Ids = courseData.map((data) => data.courseID);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/units/choose`,
        {
          selected: Ids,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then(() =>
        showToast(
          <p style={{ fontFamily: "Vazirmatn" }}>با موفقیت ذخیره شد</p>,
          "success",
          3000
        )
      )
      .catch(() =>
        showToast(
          <p style={{ fontFamily: "Vazirmatn" }}>خطایی رخ داد</p>,
          "error",
          3000
        )
      );
    setIsLoading(false);
  };

  function handleGetExel(data: any[], fileName: string): void {
    const translations: { [key: string]: string } = {
      collegeID: "شناسه دانشکده",
      collegeName: "نام دانشکده",
      groupID: "شناسه گروه",
      groupName: "نام گروه",
      courseID: "شناسه درس",
      courseName: "نام درس",
      totalUnit: "واحد کل",
      practicalUnit: "واحد عملی",
      capacity: "ظرفیت",
      registeredCount: "تعداد ثبت نامی",
      waitListCount: "تعداد لیست انتظار",
      gender: "جنسیت",
      professor: "استاد",
      dateAndTime: "زمان و تاریخ",
      saturday: "شنبه",
      monday: "دوشنبه",
      sunday: "یک‌شنبه",
      tuesday: "سه‌شنبه",
      from: "از",
      to: "تا",
      exam: "امتحان",
      date: "تاریخ",
      time: "زمان",
      description: "توضیحات",
    };

    const translatedData = data.map((item) => {
      let translatedItem: any = {};

      Object.keys(item).forEach((key) => {
        if (typeof item[key] === "object" && item[key] !== null) {
          translatedItem[translations[key] || key] = {};
          Object.keys(item[key]).forEach((subKey) => {
            translatedItem[translations[key] || key][
              translations[subKey] || subKey
            ] = item[key][subKey];
          });
        } else {
          translatedItem[translations[key] || key] = item[key];
        }
      });

      return translatedItem;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(translatedData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob: Blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleGetPNG = () => {
    setIsLoading(true);
    if (scheduleTableRef.current) {
      // Capture the DOM element and convert it to PNG
      domtoimage
        .toPng(scheduleTableRef.current, {
          quality: 1, // High-quality output
          bgcolor: "#ffffff", // White background for PNG
        })
        .then((dataUrl) => {
          // Create a download link for the PNG
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "Schedule.png"; // Set the file name
          link.click(); // Trigger the download
        })
        .catch((error) => {
          console.error("Error capturing ScheduleTable as PNG:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="my-24 flex w-4/5 flex-col gap-6">
      <div ref={scheduleTableRef} className="schedule-table">
        {/* Add CSS class for RTL */}
        <ScheduleTable />
      </div>
      <CourseSelect
        store={courseData}
        setStore={(data: Eligible[]) => setCourseData(data)}
      />
      <Button
        variant="contained"
        sx={{ fontFamily: "Vazirmatn", width: "100%" }}
        onClick={() => {
          handleSave();
          handleGetExel(courseData, "CourseData");
          handleGetPNG();
        }}
      >
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <CircularProgress size={25} color="inherit" />
          </div>
        ) : (
          <span>ذخیره</span>
        )}
      </Button>
    </div>
  );
}
