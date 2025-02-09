import DashBoardSideBar from "@/components/DashBoardSideBar";
import DashBoardTopNav from "@/components/DashBoardTopNav";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarProvider } from "@/context/SidebarContext"; // Import the provider

const Layout = async ({ children, params }) => {
  const id = (await params).id;

  return (
    <ProtectedRoute >
    <SidebarProvider> {/* Wrap everything inside the provider */}
      <div className="flex">
        <DashBoardSideBar id={id} />
        <main className="flex flex-col w-full lg:w-[80%]">
          <DashBoardTopNav />
          {children}
          <Footer />
        </main>
      </div>
    </SidebarProvider>
    </ProtectedRoute>
  );
};

export default Layout;
