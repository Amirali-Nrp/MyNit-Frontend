// import { TCourse } from "@/types/courses";
import { Eligible, TSchedule } from "@/types/userTypes";

export const getCourseWeeklyPlan = (course: Eligible) => {
  const { dateAndTime } = course;
  const result: TSchedule[] = [];
  let i = 0;
  for (const [day, time] of Object.entries(dateAndTime)) {
    if (day !== "exam") {
      result[i] = {
        day: "",
        time: {
          from: "",
          to: "",
        },
        courseName: "",
        courseID: "",
        totalUnit: 0,
        practicalUnit: 0,
        remainingCapacity: 0,
        professor: "",
        description: "",
      };
      // @ts-ignore
      result[i].day = day;
      // @ts-ignore
      result[i].time = time as { from: string; to: string };
      // @ts-ignore
      result[i].courseName = course.courseName;
      // @ts-ignore
      result[i].courseID = course.courseID;
      // @ts-ignore
      result[i].totalUnit = course.totalUnit;
      // @ts-ignore
      result[i].practicalUnit = course.practicalUnit;
      // @ts-ignore
      result[i].remainingCapacity = course.capacity - course.registeredCount;
      // @ts-ignore
      result[i].professor = course.professor;
      // @ts-ignore
      result[i].description = course.description || "";
      i++;
    }
  }
  return result;
};
