import Footer from "@/components/footer/Footer";
// import SessionProvider from "@/components/providers/sessionProvider";
import { SidebarProvider } from "@/components/sideBar/SidebarContex";

// import { auth } from "../../../auth";
import HeaderCard from "../../components/header/HeaderCard";
import Sidebar from "../../components/sideBar/Sidebar";

const BaseLayout = async ({ children }: any) => {
  // const session = await auth();

  return (
    <>
      {/* <SessionProvider userId={session?.user.id}> */}
        <HeaderCard />
        <SidebarProvider>
          <Sidebar />
          <main className="layout__main-content flex justify-center">
            {children}
          </main>
        </SidebarProvider>
        {/* <Footer /> */}
      {/* </SessionProvider> */}
    </>
  );
};

export default BaseLayout;
