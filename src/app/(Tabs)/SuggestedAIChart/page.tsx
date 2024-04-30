"use client";

import useGetChart from "@/core/api/use-getchart";
import useTest from "@/core/api/use-test";
import { useStudentStorage } from "@/storage/storage";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import ChartTable from "@/components/chartTable/ChartTable";

export default function SuggestedAIChart() {
  const { studentId } = useStudentStorage();

  const {
    data: studentInfo,
    isLoading,
    isSuccess,
    isError,
  } = useTest(studentId);

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div
          className="m-24 w-full items-center rounded-xl border-2 border-[#002] bg-white py-16"
          style={{ direction: "rtl" }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, lg: 2, xl: 3 }}
          >
            {studentInfo &&
              studentInfo.remaining_terms.map((chart, Idx) => {
                return (
                  <Grid key={Idx} item xs={1} className="flex justify-center">
                    <ChartTable
                      semester={chart.term_number}
                      courses={chart.courses}
                      totalUnits={chart.total_units}
                      isRemaining={true}
                    />
                  </Grid>
                );
              })}
          </Grid>
          {/* <Typography fontFamily={"Vazirmatn"} className="mr-28 mt-12 text-lg">
            مجموع واحد های پاس شده : {studentInfo?.passed_units}
          </Typography> */}
        </div>
      )}
    </>
  );
}
