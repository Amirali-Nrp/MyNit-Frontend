"use client";

import * as React from "react";

import { WEEK_DAYS_DICTIONARY } from "@/constants/index.constants";
import useTest from "@/core/api/use-test";
import {
  formatClassDateAndTime,
  formatExamDateAndTime,
} from "@/formatDateAndTime";
import {
  usePreSelectDataStorage,
  usePreSelectStorage,
  useStudentStorage,
  useWeeklyPlanStorage,
} from "@/storage/storage";
import { isInterfering } from "@/utils/calculateDayRow";
import showToast from "@/utils/showToast";
import sortedPlan from "@/utils/sortDailyPlans";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CheckBox from "@mui/material/Checkbox";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GoCheckCircleFill } from "react-icons/go";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { set } from "zod";

import { Eligible } from "@/types/userTypes";

const columns: GridColDef[] = [
  {
    field: "courseID",
    headerName: "کد درس",
    width: 100,
    cellClassName: "ltr",
  },
  {
    field: "courseName",
    headerName: "نام درس",
    width: 250,
    editable: false,
  },
  {
    field: "professor",
    headerName: "استاد ارائه دهنده",
    width: 200,
    editable: false,
  },
  {
    field: "capacity",
    headerName: "ظرفیت",
    width: 150,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "totalUnit",
    headerName: "تعداد واحد ها",
    type: "number",
    width: 150,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "classDateAndTime",
    headerName: "زمان برگزاری",
    width: 250,
    renderCell(params) {
      return (
        <div className="flex-col">
          {formatClassDateAndTime(params.row.dateAndTime).map((item) => (
            <Typography
              key={item}
              variant="body2"
              fontFamily={"Vazirmatn"}
              className="my-3"
            >
              {item}
            </Typography>
          ))}
        </div>
      );
    },
  },
  {
    field: "examDateAndTime",
    headerName: "زمان برگزاری امتحان",
    width: 170,
    renderCell(params) {
      return (
        <div className="flex-col">
          {formatExamDateAndTime(params.row.dateAndTime).map((item) => (
            <Typography
              key={item}
              variant="body2"
              fontFamily={"Vazirmatn"}
              className="my-3"
            >
              {item}
            </Typography>
          ))}
        </div>
      );
    },
  },
  {
    field: "gender",
    headerName: "گروه",
    type: "string",
    width: 100,
    editable: false,
    // align: "center",
    // headerAlign: "center",
  },
];

interface props {
  data: Eligible[];
  disableCheck?: boolean;
  courseData: Eligible[];
  setCourseData: (data: Eligible[]) => void;
}

export default function List({
  data,
  disableCheck,
  courseData,
  setCourseData,
}: props) {
  const { courseIDs, setCourseIDs } = usePreSelectStorage();

  const { studentId } = useStudentStorage();

  const {
    data: studentInfo,
    isLoading,
    isSuccess,
    isError,
  } = useTest(studentId);

  // React.useEffect(() => {
  //   const selectionModel = courseIDs;
  //   setCourseIDs(selectionModel);

  //   if (
  //     courseIDs !== undefined &&
  //     courseIDs !== null &&
  //     courseIDs.length !== 0
  //   ) {
  //     const filteredData = studentInfo?.eligibles.filter((item) =>
  //       courseIDs.includes(item.courseID)
  //     );
  //     console.log("lollist", filteredData);
  //     setCourseData(filteredData);
  //   } else {
  //     setCourseData([]);
  //   }
  // }, [courseIDs]);

  // console.log("courseData", courseData);
  // console.log("courseIDs", courseIDs);
  // console.log("data", data);

  const { weeklyPlan } = useWeeklyPlanStorage();

  const handleToggle = (course: Eligible) => {
    if (courseData.findIndex((c) => c.courseID === course.courseID) !== -1)
      setCourseData(
        courseData.filter((item) => item.courseID !== course.courseID)
      );
    else setCourseData([...courseData, course]);
  };

  const toggleCaller = (item: Eligible) => {
    if (courseData.find((c) => c.courseID === item.courseID)) {
      return handleToggle(item);
    }

    const days = Object.keys(weeklyPlan);
    let interferenceDays = [];
    let interferenceCourses = [];
    for (const day of days) {
      // @ts-ignore
      const sorted = sortedPlan(weeklyPlan[day]);
      for (let i = 0; i < sorted.length; i++) {
        // @ts-ignore
        const currentItemTime = item.dateAndTime[day] as {
          from: string;
          to: string;
        };
        if (currentItemTime) {
          const comparableTime = `${currentItemTime.from}-${currentItemTime.to}`;
          if (
            isInterfering(
              comparableTime,
              // @ts-ignore
              `${sorted[i].time.from}-${sorted[i].time.to}`
            )
          ) {
            interferenceDays.push(day);
            interferenceCourses.push(
              // @ts-ignore
              `${sorted[i].courseName} (گروه ${
                // @ts-ignore
                sorted[i].courseID.split("_")[1]
              })`
            );
            interferenceCourses.push(
              `${item.courseName} (گروه ${item.courseID.split("_")[1]})`
            );
          }
        }
      }
    }

    if (interferenceDays.length > 0) {
      // @ts-ignore
      const interferingCourses = [...new Set(interferenceCourses)];
      const message = (
        <p style={{ fontFamily: "Vazirmatn" }}>
          تداخل درس های{" "}
          {interferingCourses.map((c, i, a) => (
            <>
              <Box component="span" sx={{ color: "primary.main" }}>
                {c}
              </Box>
              {a.length > 1 && i !== a.length - 1 ? " و " : ""}
            </>
          ))}{" "}
          در روز
          {interferenceDays.length >= 2 ? "های" : ""}{" "}
          {interferenceDays.map((d, i, a) => (
            <>
              <Box component="span" sx={{ color: "secondary.main" }}>
                {
                // @ts-ignore
                WEEK_DAYS_DICTIONARY[d as Days]
                }
              </Box>
              {a.length > 1 && i !== a.length - 1 ? " و " : ""}
            </>
          ))}
        </p>
      );
      showToast(message, "error", 3000);
      return 0;
    }

    interferenceCourses = [];

    for (const course of courseData) {
      if (course.courseID !== item.courseID) {
        if (item.dateAndTime.exam) {
          if (item.dateAndTime.exam.date === course.dateAndTime.exam?.date) {
            const time = item.dateAndTime["exam"] as {
              date: string;
              time: string;
            };
            if (time.time && course.dateAndTime.exam?.time) {
              if (isInterfering(time.time, course.dateAndTime.exam?.time)) {
                // console.log(
                //   `in ${item.courseName} ba in ${course.courseName} tadakhol dare`
                // );
                interferenceCourses.push(
                  `${course.courseName} (گروه ${course.courseID.split("_")[1]})`
                );
              }
            }
          }
        }
      }
    }

    if (interferenceCourses.length > 0) {
      // @ts-ignore
      const interferingCourses = [...new Set(interferenceCourses)];
      const message = (
        <p style={{ fontFamily: "Vazirmatn" }}>
          تداخل امتحان های{" "}
          {interferingCourses.map((c, i, a) => (
            <>
              <Box component="span" sx={{ color: "primary.main" }}>
                {c}
              </Box>
              {a.length > 1 && i !== a.length - 1 ? " و " : ""}
            </>
          ))}{" "}
          با امتحان{" "}
          {
            <Box component="span" sx={{ color: "primary.main" }}>
              {item.courseName} (گروه {item.courseID.split("_")[1]}){" "}
            </Box>
          }
        </p>
      );
      showToast(message, "error", 3000);
      return 0;
    }

    return handleToggle(item);
  };

  return (
    <Box sx={{ height: 450, width: "100%", direction: "rtl" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
            {
              display: "none",
            },
          fontFamily: "Vazirmatn",
        }}
        rows={data}
        columns={columns}
        slots={{
          baseCheckbox: (props) => (
            <CheckBox
              {...props}
              icon={<MdOutlineRadioButtonUnchecked size={20} />}
              checkedIcon={<GoCheckCircleFill size={20} />}
            />
          ),
        }}
        getRowId={(row) => row.courseID}
        rowSelectionModel={courseData.map((c) => c.courseID)}
        // onRowSelectionModelChange={(params: GridRowParams) =>
        //   setCourseIDs(params)
        // }
        rowHeight={70}
        onCellClick={(p) =>
          !disableCheck ? toggleCaller(p.row) : handleToggle(p.row)
        }
        // onRowSelectionModelChange={(p) => p.}

        //   setCourseIDs(p);
        // }}

        checkboxSelection
        disableColumnMenu
        hideFooterPagination
        hideFooter
      />
    </Box>
  );
}
