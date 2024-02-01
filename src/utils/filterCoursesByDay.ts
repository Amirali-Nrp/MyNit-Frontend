import { useEffect } from "react";

import {
  useCourseFilterStorage,
  useFilteredDaysStorage,
} from "@/storage/storage";
import { set } from "zod";

import { Eligible } from "@/types/userTypes";

export const filterCoursesByDay = (studentEligibles: Eligible[]) => {
  const { days } = useFilteredDaysStorage();

  let courses = studentEligibles;
  if (days.includes("شنبه صبح")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.saturday?.from !== "08:00" &&
          item.dateAndTime.saturday?.from !== "10:00"
      );
  }
  if (days.includes("شنبه غروب")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.saturday?.from !== "13:30" &&
          item.dateAndTime.saturday?.from !== "15:30" &&
          item.dateAndTime.saturday?.from !== "17:00" &&
          item.dateAndTime.saturday?.from !== "17:30"
      );
  }
  if (days.includes("یکشنبه صبح")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.sunday?.from !== "08:00" &&
          item.dateAndTime.sunday?.from !== "10:00"
      );
  }
  if (days.includes("یکشنبه غروب")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.sunday?.from !== "13:30" &&
          item.dateAndTime.sunday?.from !== "15:30" &&
          item.dateAndTime.sunday?.from !== "17:00" &&
          item.dateAndTime.sunday?.from !== "17:30"
      );
  }
  if (days.includes("دوشنبه صبح")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.monday?.from !== "08:00" &&
          item.dateAndTime.monday?.from !== "10:00"
      );
  }
  if (days.includes("دوشنبه غروب")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.monday?.from !== "13:30" &&
          item.dateAndTime.monday?.from !== "15:30" &&
          item.dateAndTime.monday?.from !== "17:00" &&
          item.dateAndTime.monday?.from !== "17:30"
      );
  }
  if (days.includes("سه شنبه صبح")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.tuesday?.from !== "08:00" &&
          item.dateAndTime.tuesday?.from !== "10:00"
      );
  }
  if (days.includes("سه شنبه غروب")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.tuesday?.from !== "13:30" &&
          item.dateAndTime.tuesday?.from !== "15:30" &&
          item.dateAndTime.tuesday?.from !== "17:00" &&
          item.dateAndTime.tuesday?.from !== "17:30"
      );
  }
  if (days.includes("چهارشنبه صبح")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.wednesday?.from !== "08:00" &&
          item.dateAndTime.wednesday?.from !== "10:00"
      );
  }
  if (days.includes("چهارشنبه غروب")) {
    courses =
      courses &&
      courses.filter(
        (item) =>
          item.dateAndTime.wednesday?.from !== "13:30" &&
          item.dateAndTime.wednesday?.from !== "15:30" &&
          item.dateAndTime.wednesday?.from !== "17:00" &&
          item.dateAndTime.wednesday?.from !== "17:30"
      );
  }

  const { setFilteredCourses } = useCourseFilterStorage();

  useEffect(() => {
    setFilteredCourses([]);
  }, [days]);

  return courses;
};
