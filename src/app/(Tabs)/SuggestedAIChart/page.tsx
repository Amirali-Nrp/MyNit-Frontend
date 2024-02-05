"use client";

import useGetChart from "@/core/api/use-getchart";
import useTest from "@/core/api/use-test";
import { useStudentStorage } from "@/storage/storage";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

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
          className="my-24 w-4/5 items-center rounded-xl border-2 border-[#002] bg-white p-20 px-48"
          style={{ direction: "rtl" }}
        >
          <Grid
            container
            spacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ justifyContent: "center" }}
          >
            {studentInfo &&
              studentInfo.remaining_terms.map((chart, Idx) => {
                return (
                  <Grid key={Idx} xs={8} className="flex justify-center">
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
