import { Typography } from "@mui/material";

type EndRowDataProps = {
  totalUnits: number;
  totalPassedUnits?: number;
  totalGrade?: number;
};

const EndRow = ({
  totalUnits,
  totalPassedUnits,
  totalGrade,
}: EndRowDataProps) => {
  return (
    <div className="flex flex-row items-center justify-between px-2">
      <Typography sx={{ fontFamily: "Vazirmatn", fontSize: 14 }}>
        جمع واحد ها : {totalUnits}
      </Typography>
      {totalGrade && totalPassedUnits && (
        <>
          <Typography sx={{ fontFamily: "Vazirmatn", fontSize: 14 }}>
            جمع واحد های گذرانده : {totalPassedUnits}
          </Typography>
          <Typography sx={{ fontFamily: "Vazirmatn", fontSize: 14 }}>
            معدل : {totalGrade?.toFixed(2)}
          </Typography>
        </>
      )}
    </div>
  );
};

export default EndRow;
