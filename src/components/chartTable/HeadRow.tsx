import { Typography } from "@mui/material";

const HeadRow = () => {
  return (
    <div className="flex flex-row border-b-2 border-black">
      <div className="w-[70px] border-l-[1px] border-black ">
        <Typography
          sx={{ fontFamily: "Vazirmatn", fontSize: 14, textAlign: "center" }}
        >
          کد درس
        </Typography>
      </div>
      <div className="w-[170px] border-x-[1px] border-black">
        <Typography
          sx={{ fontFamily: "Vazirmatn", fontSize: 14, textAlign: "center" }}
        >
          اسم درس
        </Typography>
      </div>
      <div className="w-[40px] border-x-[1px] border-black">
        <Typography
          sx={{ fontFamily: "Vazirmatn", fontSize: 14, textAlign: "center" }}
        >
          واحد
        </Typography>
      </div>
      <div className="w-[100px] border-x-[1px] border-black">
        <Typography
          sx={{ fontFamily: "Vazirmatn", fontSize: 14, textAlign: "center" }}
        >
          {"پیشنیاز (همنیاز)"}
        </Typography>
      </div>
      <div className="w-[51px] border-r-[1px] border-black">
        <Typography
          sx={{ fontFamily: "Vazirmatn", fontSize: 14, textAlign: "center" }}
        >
          وضعیت
        </Typography>
      </div>
    </div>
  );
};

export default HeadRow;
