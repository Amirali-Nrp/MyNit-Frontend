"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookie from "js-cookie";

import "@/components/login/button.css";

import showToast from "@/utils/showToast";

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    let message = null;
    const data = new FormData(event.currentTarget);
    const signupData = {
      id: data.get("studentNumber"),
      name: data.get("name"),
      password: data.get("password"),
    };
    // console.log("signupData", signupData);
    if (signupData.id == "") {
      message = (
        <p style={{ fontFamily: "Vazirmatn" }}>
          لطفا شماره دانشجویی را وارد نمایید
        </p>
      );
      showToast(message, "error", 3000);
      setIsLoading(false);

      return null;
    }
    if (signupData.name == "") {
      message = (
        <p style={{ fontFamily: "Vazirmatn" }}>لطفا نام را وارد نمایید</p>
      );
      showToast(message, "error", 3000);
      setIsLoading(false);

      return null;
    }
    if (signupData.password == "") {
      message = (
        <p style={{ fontFamily: "Vazirmatn" }}>لطفا رمزعبور را وارد نمایید</p>
      );
      showToast(message, "error", 3000);
      setIsLoading(false);

      return null;
    }
    const res = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, signupData)
      .then((res) => {
        if (res.status == 200) {
          Cookie.set("token", res.data["access token"], {
            expires: 1,
            secure: true,
          });
          router.push(`/Home`);
        }
      })
      .catch((err) => {
        // console.log(err);
        message = <p style={{ fontFamily: "Vazirmatn" }}>خطایی رخ داد</p>;
        showToast(message, "error", 3000);
      });
    setIsLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, direction: "rtl" }}
    >
      <Typography
        sx={{
          fontFamily: "Vazirmatn",
          textAlign: "center",
          fontSize: "21px",
          fontWeight: "550",
        }}
      >
        ثبت نام
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="studentNumber"
        label="شماره دانشجویی"
        name="studentNumber"
        // autoComplete=""
        autoFocus
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
        InputProps={{
          sx: { borderRadius: 50, color: "white" },
          inputMode: "numeric",
          // pattern: "[0-9]*",
        }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn", color: "white" },
        }}
        // helperText={}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="name"
        label="نام"
        type="text"
        id="name"
        autoComplete="current-password"
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
        InputProps={{ sx: { borderRadius: 50, color: "white" } }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn", color: "white" },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="رمزعبور"
        type="password"
        id="password"
        autoComplete="current-password"
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
        InputProps={{ sx: { borderRadius: 50, color: "white" } }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn", color: "white" },
        }}
      />
      {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={
          <Typography fontFamily="Vazirmatn">مرا به خاطر بسپار</Typography>
        }
        sx={{ marginLeft: 1, direction: "rtl" }}
      /> */}
      <Typography
        sx={{
          fontFamily: "Vazirmatn",
          // textAlign: "center",
          fontSize: "16px",
          // fontWeight: "550",
        }}
      >
        حساب کاربری دارید؟{" "}
        <Link href="/Login" color="#00e5ff">
          وارد شوید
        </Link>
      </Typography>
      <button className="button-48">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <span>ثبت نام</span>
        )}
      </button>
    </Box>
  );
}
