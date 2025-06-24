import Navbar from "@/app/component/navbar";
import Sidebar from "@/app/component/sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

