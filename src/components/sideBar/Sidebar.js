"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiOutlineHome } from "react-icons/ai";
import { CiViewTable } from "react-icons/ci";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { cn } from "@/lib/utils";

import { SidebarContext } from "./SidebarContex";
import { routes as sidebarItems } from "@/constants/routes";
import Cookies from "js-cookie";
import { admin_routes } from "@/constants/routes";

import "./styles.css";
import axios from "axios";
import { isAborted } from "zod";

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const Sidebar = () => {
  const pathname = usePathname();

  const size = useWindowSize();

  const { isCollapsed, toggleSidebarcollapse, setClose } =
    useContext(SidebarContext);

  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    axios.post("http://0.0.0.0:8080/authorize", {
      access_token: Cookies.get("token")
    })
    .then(res => setIsAdmin(res.data.admin)).
    catch (err => console.log("error in sidebar", err))
  }, [])


  useEffect(() => {
    if (size.width < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [size]);

  return (
    <div className="fixed right-0 z-50 py-14" style={{height: isMobile && isCollapsed ? "80%" : ""}}>
      {isMobile && !isCollapsed ? (
        <button className="btn mt-14" onClick={toggleSidebarcollapse}>
          {isCollapsed ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
        </button>
      ) : (
        ""
      )}
      <aside
        className={cn(
          `sidebar  ${
            isMobile ? "w-0" : "w-[5.3rem]"
          } border-0 border-black bg-white bg-opacity-50`,
          !isCollapsed &&
            `${
              isMobile ? "w-[5.3rem]" : "w-[17rem]"
            } border-2 border-r-0 bg-opacity-100`
        )}
        onMouseEnter={() => setClose(false)}
        onMouseLeave={() => setClose(true)}
        data-collapse={isCollapsed}
      >
        <div className="sidebar__top">
          <p className={`sidebar__logo-name  ${isMobile ? "hidden" : ""}`}>
            پنل کاربری
          </p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li
                className={`sidebar__item ${
                  isMobile && isCollapsed ? "hidden" : ""
                }`}
                key={name}
              >
                <Link
                  className={`sidebar__link h-[44.78px] overflow-hidden ${
                    pathname === href ? "sidebar__link--active" : ""
                  }`}
                  style={{
                    backgroundColor: name === "آرشیو آموزشی" ? "#ffc043" : name === "رزرو غذا" ? "#ff8ccb" : ""
                  }}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span
                    className={`sidebar__name 
                     ${isMobile ? "hidden" : ""}`}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            );
          })}
          {isAdmin ? 
          admin_routes.map(({name, href, icon: Icon}) => {
            return (
              <li
                className={`sidebar__item ${
                  isMobile && isCollapsed ? "hidden" : ""
                }`}
                key={name}
              >
                <Link
                  className={`sidebar__link h-[44.78px] overflow-hidden ${
                    pathname === href ? "sidebar__link--active" : ""
                  }`}
                  style={{
                    backgroundColor: "#1cfc85",
                    color: "black"
                  }}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span
                    className={`sidebar__name 
                     ${isMobile ? "hidden" : ""}`}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            )
          })
          : ""}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
