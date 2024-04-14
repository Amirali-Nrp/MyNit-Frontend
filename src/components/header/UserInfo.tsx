"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import useTest from "@/core/api/use-test";
import { usePreSelectDataStorage, useStudentStorage } from "@/storage/storage";
import { IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";
import { User2 } from "lucide-react";
import { AiFillCaretDown } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { set } from "zod";

import { Student } from "@/types/userTypes";
import { logOut } from "@/lib/actions/logout.action";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const UserInfo = (props: any) => {
  // const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setStudentId } = useStudentStorage();
  const { setCourseData } = usePreSelectDataStorage();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { studentId } = useStudentStorage();

  const {
    data: studentInfo,
    isLoading,
    isSuccess,
    isError,
  } = useTest(studentId);

  // const [studentInfo, setStudentInfo] = React.useState<Student>();

  // React.useEffect(() => {
  //   console.log("inja");
  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.get(
  //         `http://0.0.0.0:8080/units?stu_id=${props.id}`
  //       );
  //       setStudentInfo(result.data);
  //       console.log("fetchidam", result.data);
  //     } catch {
  //       console.log("nah");
  //     }
  //   };
  //   fetchData();
  // }, []);

  // console.log("mordim", studentInfo);
  const router = useRouter();

  const handleLogOut = async () => {
    // console.log("log out");
    const res = await logOut();
    if (res) {
      router.push("/Login");
    }
    setTimeout(() => {
      setStudentId(null);
      setCourseData([]);
      Cookies.remove("token");
    }, 500);
  };

  return (
    <div className="flex flex-row items-center gap-3" style={props.style}>
      <IconButton
        onClick={handleClick}
        className="gap-2 rounded-[10px] text-black"
        data-testid="button"
      >
        <Typography
          data-testid="username"
          // className="hidden sm:flex"
          sx={{ fontFamily: "Vazirmatn" }}
        >
          {studentInfo?.name}
        </Typography>
        <Avatar />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
          style: {
            border: "1px solid #002145",
            borderRadius: "5px",
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* <MenuItem
          sx={{
            fontFamily: "Vazirmatn",
            fontSize: 15,
            gap: 2,
            justifyContent: "end",
          }}
          onClick={handleClose}
          disableRipple
        >
          مشاهده پروفایل
          <User2 size={20} />
        </MenuItem>
        <Divider sx={{ my: 0.5, backgroundColor: "#002145" }} />
        <MenuItem
          sx={{
            fontFamily: "Vazirmatn",
            fontSize: 15,
            gap: 2,
            justifyContent: "end",
          }}
          onClick={handleClose}
          disableRipple
        >
          پیام ها
          <IoMdNotifications size={20} />
        </MenuItem>
        <Divider sx={{ my: 0.5, backgroundColor: "#002145" }} /> */}
        <MenuItem
          sx={{
            fontFamily: "Vazirmatn",
            fontSize: 15,
            gap: 2,
            justifyContent: "end",
          }}
          onClick={() => void handleLogOut()}
          disableRipple
        >
          خروج
          <TbLogout size={20} />
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default UserInfo;
