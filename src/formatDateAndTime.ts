import { dateAndTime } from "./types/userTypes";

export const formatClassDateAndTime = (dateAndTime: dateAndTime) => {
  const arr: string[] = [];
  Object.entries(dateAndTime).forEach(([key, value]: [string, any]) => {
    if (key !== "exam") {
      let day;
      if (key === "saturday") {
        day = "شنبه";
      } else if (key === "sunday") {
        day = "یکشنبه";
      } else if (key === "monday") {
        day = "دوشنبه";
      } else if (key === "tuesday") {
        day = "سه شنبه";
      } else if (key === "wednesday") {
        day = "چهارشنبه";
      }
      const string = day + " ساعت " + value.from + " تا " + value.to;
      arr.push(string);
    }
  });
  return arr;
};

export const formatExamDateAndTime = (dateAndTime: dateAndTime) => {
  const date = ` تاریخ ${
    dateAndTime.exam === undefined ? "---" : dateAndTime.exam?.date
  }`;
  const time = ` ساعت ${
    dateAndTime.exam === undefined ? "---" : dateAndTime.exam?.time
  }`;
  return [date, time];
};

export const e2p = (s: string) =>
  // @ts-ignore
  s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
