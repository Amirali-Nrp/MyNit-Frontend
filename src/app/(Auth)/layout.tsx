"use client";

import React from "react";

import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-[url('/assets/nit-map.png')] bg-cover text-white">
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="sm"
          className="mx-12 rounded-xl bg-white bg-opacity-40 p-12 backdrop-blur-sm"
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/assets/logo.png" />
            <Typography
              component="h1"
              variant="h5"
              sx={{
                margin: "20px",
                fontFamily: "Vazirmatn",
                fontSize: "21px",
                fontWeight: "550",
              }}
            >
              سامانه دانشجویی دانشگاه نوشیروانی بابل
            </Typography>
            {children}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
