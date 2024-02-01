import React from "react";

import {
  useCourseFilterStorage,
  useStudentStorage,
  useSuggestedPlansStorage,
} from "@/storage/storage";
import showToast from "@/utils/showToast";
import { Button } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

import { Eligible } from "@/types/userTypes";

import CourseSelect from "@/components/preCourseSelect/CourseSelect";

import BgCard from "../providers/BgCard";
import DayFilter from "./DayFilter";

export default function SelectFilters() {
  const { filteredCourses, setFilteredCourses } = useCourseFilterStorage();
  const { studentId } = useStudentStorage();
  const { setPlans } = useSuggestedPlansStorage();

  const handleSubmit = () => {
    let message;
    if (filteredCourses.length === 0) {
      console.log("no courses");
      message = <p style={{ fontFamily: "Vazirmatn" }}>درسی انتخاب نشده است</p>;
      showToast(message, "error", 3000);
      return null;
    }

    let totalSelectedUnits = 0;
    for (const course of filteredCourses) {
      totalSelectedUnits += course.totalUnit;
    }

    if (totalSelectedUnits < 12) {
      console.log("less than 12 units");
      message = (
        <p style={{ fontFamily: "Vazirmatn" }}>
          !کمتر از ۱۲ واحد انتخاب کرده اید
        </p>
      );
      showToast(message, "error", 3000);
      return null;
    }
    // console.log({
    //   courses: [...filteredCourses],
    // });
    axios
      .put(
        "http://0.0.0.0:8080/units",
        {
          courses: [...filteredCourses],
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.length === 0) {
          message = (
            <p style={{ fontFamily: "Vazirmatn" }}>برنامه ی مناسبی یافت نشد</p>
          );
          showToast(message, "error", 3000);
        }
        setPlans(response.data);
        console.log("incoming plans", response.data);
      });
  };

  return (
    <BgCard>
      <DayFilter />
      <CourseSelect
        disableCheck={true}
        store={filteredCourses}
        setStore={(data: Eligible[]) => setFilteredCourses(data)}
      />
      <Button
        type="button"
        style={{
          backgroundColor: "#1976d2",
          margin: 10,
          fontFamily: "Vazirmatn",
        }}
        variant="contained"
        onClick={handleSubmit}
      >
        تایید
      </Button>
    </BgCard>
  );
}
