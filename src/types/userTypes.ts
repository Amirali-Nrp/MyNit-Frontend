import { from } from "stylis";

export interface Course {
  id: number;
  name: string;
  units: number;
  lesson_group: number;
  pre_reqs: Reqs[];
  co_reqs: Reqs[];
  passed: string;
  mark: number;
}

export interface Term {
  term_number: number;
  courses: Course[];
  total_units: number;
  total_passed?: number;
  grade?: number;
}

export interface dateAndTime {
  sunday?: { from: string; to: string };
  saturday?: { from: string; to: string };
  monday?: { from: string; to: string };
  tuesday?: { from: string; to: string };
  wednesday?: { from: string; to: string };
  exam?: { date: string; time: string };
}

export interface Eligible {
  collegeID: string;
  collegeName: string;
  groupID: number;
  groupName: string;
  courseID: string;
  courseName: string;
  totalUnit: number;
  practicalUnit: number;
  capacity: number;
  registeredCount: number;
  waitListCount: number;
  gender: string;
  professor: string;
  dateAndTime: dateAndTime;
  description: string;
}

export interface Reqs {
  id: number;
  name: string;
}

export interface Student {
  student_id: number;
  name: string;
  passed_units: number;
  terms: Term[];
  remaining_terms: Term[];
  eligibles: Eligible[];
}

export type TSchedule = {
  day: string;
  time: {
    from: string;
    to: string;
  };
  courseName: string;
  courseID: string;
  totalUnit: number;
  practicalUnit: number;
  remainingCapacity: number;
  professor: string;
  description: string;
};

export type TDailyPlan = {
  courseID: string;
  courseName: string;
  totalUnit: number;
  practicalUnit: number;
  professor: string;
  description: string;
  time: { from: string; to: string };
};
export type TWeeklyPlan = { [day: string]: TDailyPlan[] };
