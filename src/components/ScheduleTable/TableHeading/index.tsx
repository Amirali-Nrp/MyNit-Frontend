import React from "react";

import { TABLE_HEADER_TIME_LIST } from "@/constants/index.constants";
import { e2p } from "@/formatDateAndTime";
import { Grid, Typography } from "@mui/material";

function TableHeading() {
  return (
    <>
      {TABLE_HEADER_TIME_LIST.map((time, idx) => (
        <Grid
          key={time}
          item
          xs={(1 / TABLE_HEADER_TIME_LIST.length) * 12}
          sx={{
            border: "0.1px solid #000000",
            display: "flex",
            alignItems: "center",
            p: 1,
            justifyContent: "space-around",
            wordBreak: "break-word",
            direction: "rtl",
            fontFamily: "Vazirmatn",
          }}
        >
          {idx !== 0 ? (
            <p className="text-center text-[0.75rem]">
              {e2p(time.split("-")[0])} تا {e2p(time.split("-")[1])}
            </p>
          ) : (
            <p className="text-center text-[14px]">{time}</p>
          )}
        </Grid>
      ))}
    </>
  );
}

export default TableHeading;
