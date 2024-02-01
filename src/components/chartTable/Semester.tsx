import { Typography } from "@mui/material";

const Semester = ({ id }: any) => {
  return (
    <div className="h-[26px] border-b-2 border-black">
      <Typography sx={{ fontFamily: "Vazirmatn", textAlign: "center" }}>
        ترم {id}
      </Typography>
    </div>
  );
};

export default Semester;
