import { AiOutlineHome } from "react-icons/ai";
import { CiViewList, CiViewTable } from "react-icons/ci";
import { GiMeal } from "react-icons/gi";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";

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
    icon: CiViewTable,
  },
  {
    name: "چارت پیشنهادی هوشمند",
    href: "/SuggestedAIChart",
    icon: CiViewTable,
  },
  {
    name: "پیش ثبت نام",
    href: "/PreCourseSelect",
    icon: GrCheckboxSelected,
  },
  {
    name: "پیشنهاد برنامه هفتگی",
    href: "/SuggestWeeklyPlans",
    icon: GrCheckboxSelected,
  },
  {
    name: "لیست",
    href: "/ManageStudents",
    icon: CiViewList,
  },
  {
    name: "آرشیو آموزشی",
    href: "https://nitacademy.ir/",
    icon: PiFilmReel,
  },
  {
    name: "رزرو غذا",
    href: "https://food.nit.ac.ir",
    icon: GiMeal,
  },
];

export const admin_routes = [
  {
    name: "پنل ادمین",
    href: "/AdminPanel",
    icon: MdAdminPanelSettings,
  },
];
