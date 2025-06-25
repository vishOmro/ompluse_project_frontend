import Navbar from "@/app/component/navbar";
import Sidebar from "@/app/component/sidebar";
import TimeLine from "@/app/component/progressbarphone"

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <TimeLine />
        {children}
      </div>
    </>
  );
}
