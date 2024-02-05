import { AiOutlineHome } from "react-icons/ai";
import { BsCalendar3Week } from "react-icons/bs";
import { CiViewList, CiViewTable } from "react-icons/ci";
import { FaUniversity } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { GrCheckboxSelected } from "react-icons/gr";
import { LuBrainCircuit } from "react-icons/lu";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { TiDocumentAdd } from "react-icons/ti";

export const routes = [
  {
    name: "صفحه اصلی",
    href: "/Home",
    icon: AiOutlineHome,
  },
  {
    name: "ترم های گذشته و جاری",
    href: "/Chart",
    icon: CiViewTable,
  },

  {
    name: "چارت پیشنهادی دانشکده",
    href: "/SuggestedCollegeChart",
    icon: FaUniversity,
  },
  {
    name: "چارت پیشنهادی هوشمند",
    href: "/SuggestedAIChart",
    icon: LuBrainCircuit,
  },
  {
    name: "پیش ثبت نام",
    href: "/PreCourseSelect",
    icon: GrCheckboxSelected,
  },
  {
    name: "پیشنهاد برنامه هفتگی",
    href: "/SuggestWeeklyPlans",
    icon: BsCalendar3Week,
  },
  {
    name: "افزودن اطلاعات",
    href: "/AddCourses",
    icon: TiDocumentAdd,
  },
  {
    name: "آرشیو آموزشی",
    href: "https://nitacademy.ir/",
    icon: PiFilmReel,
  },
  // {
  //   name: "رزرو غذا",
  //   href: "https://food.nit.ac.ir",
  //   icon: GiMeal,
  // },
];

export const admin_routes = [
  {
    name: "پنل ادمین",
    href: "/AdminPanel",
    icon: MdAdminPanelSettings,
  },
];

export const authed_routes = [
  "/Home",
  "/Chart",
  "/SuggestedCollegeChart",
  "/SuggestedAIChart",
  "/PreCourseSelect",
  "/SuggestWeeklyPlans",
  "/ManageStudents",
  "/AdminPanel",
  "/AddCourses",
];
