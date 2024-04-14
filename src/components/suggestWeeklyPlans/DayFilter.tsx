import React, { useEffect } from "react";

import { DAY_FILTERS } from "@/constants/index.constants";
import { useFilteredDaysStorage } from "@/storage/storage";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";

export default function DayFilter() {
  // const [state, setState] = React.useState<string[]>([]);
  const { days, setDays } = useFilteredDaysStorage();

  const addDay = (day: string) => {
    setDays([...days, day]);
    // console.log("added", day);
  };

  const removeDay = (inDay: string) => {
    const checkedDays = days;
    const temp: string[] = [];
    for (const day in checkedDays) {
      if (checkedDays[day] !== inDay) {
        // @ts-ignore
        temp.push(checkedDays[day]);
      }
    }
    // console.log("removed");
    setDays(temp);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      addDay(event.target.name);
    } else {
      removeDay(event.target.name);
    }
  };

  // console.log("state", days);

  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{ fontFamily: "Vazirmatn" }}>
          زمان های خالی از درس :
        </FormLabel>
        <FormGroup>
          <Grid container>
            {DAY_FILTERS.map((day) => (
              <Grid item>
                <FormControlLabel
                  control={<Checkbox onChange={handleChange} name={day} />}
                  label={<Typography fontFamily="vazirmatn">{day}</Typography>}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </FormControl>
    </Box>
  );
}
