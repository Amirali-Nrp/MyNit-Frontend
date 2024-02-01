import { Key } from "lucide-react";
import { create, State } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { Eligible, Student, TWeeklyPlan } from "@/types/userTypes";

// interface StudentStore {
//   studentInfo: Student | null,
//   setStudentData: (info: Student) => void;
// }

// export const useStudentStorage = create<StudentStore>((set) => ({
//   studentInfo: null,
//   setStudentData: (info) => set((state) => ({ ...state, studentInfo: info })),
// }));

// import { create } from 'zustand'

export interface StudentState {
  studentId: string | null;
  setStudentId: (student: string | null) => void | any;
}

export interface PreselectStateIds {
  courseIDs: string[];
  setCourseIDs: (course: string[]) => void;
}

export interface PreselectStateData {
  courseData: Eligible[];
  setCourseData: (course?: Eligible[]) => void;
}

interface weeklyPlanState {
  weeklyPlan: TWeeklyPlan;
  setWeeklyPlan: (courseList?: TWeeklyPlan) => void;
}

export interface filteredCoursesState {
  filteredCourses: Eligible[];
  setFilteredCourses: (data?: Eligible[]) => void;
}

export interface SuggestedPlansState {
  plans: { courses: Eligible[]; totalUnits: string }[];
  setPlans: (plans: { courses: Eligible[]; totalUnits: string }[]) => void;
}

export interface FilteredDaysState {
  days: string[];
  setDays: (days: string[]) => void;
}

export const useSuggestedPlansStorage = create<SuggestedPlansState>((set) => ({
  plans: [],
  setPlans: (plans) => set(() => ({ plans: plans })),
}));

export const useStudentStorage = create<StudentState>((set) => ({
  studentId: null,
  setStudentId: (Id) => set(() => ({ studentId: Id })),
}));

export const usePreSelectStorage = create<PreselectStateIds>((set) => ({
  courseIDs: [],
  setCourseIDs: (ids) => set(() => ({ courseIDs: ids })),
}));

export const usePreSelectDataStorage = create<PreselectStateData>((set) => ({
  courseData: [],
  setCourseData: (Datas) => set(() => ({ courseData: Datas })),
}));

export const useWeeklyPlanStorage = create<weeklyPlanState>((set) => ({
  weeklyPlan: {},
  setWeeklyPlan: (courseList) => set(() => ({ weeklyPlan: courseList })),
}));

export const useCourseFilterStorage = create<filteredCoursesState>((set) => ({
  filteredCourses: [],
  setFilteredCourses: (data) => set(() => ({ filteredCourses: data })),
}));

export const useFilteredDaysStorage = create<FilteredDaysState>((set) => ({
  days: [],
  setDays: (days) => set(() => ({ days: days })),
}));

// export interface ChartDataProps {
//     term_number: number;
//     courses: {
//       id: number;
//       name: string;
//       units: number;
//       pre_reqs: number[];
//       co_reqs: number[];
//       passed: string;
//       mark: number;
//     }[];
//     total_units: number;
//     total_passed: number;
//     grade: number;
//   }

//   export interface PreSelectDataProps {
//     id: number;
//     name : string;
//     units: number;
//     lesson_group: number;
//     pre_reqs: number[];
//     co_reqs: number[];
//     passed: string;
//     mark: number;
// }

// export interface studentDataProps {
//     student_id: string,
//     name: string,
//     passed_units: number,
//     terms: ChartDataProps[],
//     eligibles: PreSelectDataProps[]
// }

// interface storageProps extends State {
//     studentInfo: studentDataProps | null,
//     setStudentData: (info: studentDataProps) => void
// }
