import Navbar from "@/app/component/navbar";
import Sidebar from "@/app/component/sidebar";
import Timeline from "../component/progressbar";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
