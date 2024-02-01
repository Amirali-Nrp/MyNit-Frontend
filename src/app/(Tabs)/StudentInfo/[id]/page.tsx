"use client";

import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

import { Student } from "@/types/userTypes";

import ChartTable from "@/components/chartTable/ChartTable";

export default function StudentInfo({
  params: { id },
}: {
  params: { id: number };
}) {
  const [studentInfo, setStudentInfo] = useState<Student>();

  useEffect(() => {
    axios
      .post(
        "http://0.0.0.0:8080/students",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => setStudentInfo(res.data))
      .catch((err) => console.log("err in Student Info", err));
  }, []);

  return (
    <>
      {
        // isLoading ? (
        //   <p>loading</p>
        // ) :
        <div className="my-24 w-4/5 items-center" style={{ direction: "rtl" }}>
          <Grid
            container
            spacing={5}
            // className="gap-5"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ justifyContent: "center" }}
          >
            {studentInfo &&
              studentInfo.terms?.map((chart, Idx) => {
                return (
                  <Grid key={Idx} xs={6} className="flex justify-center">
                    <ChartTable
                      semester={chart.term_number}
                      courses={chart.courses}
                      totalUnits={chart.total_units}
                      totalPassedUnits={chart.total_passed}
                      totalGrade={chart.grade}
                    />
                  </Grid>
                );
              })}
          </Grid>
          <Typography fontFamily={"Vazirmatn"} className="mr-28 mt-12 text-lg">
            مجموع واحد های پاس شده : {studentInfo?.passed_units}
          </Typography>
        </div>
      }
    </>
  );
}
