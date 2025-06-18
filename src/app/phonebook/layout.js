import Navbar from "@/app/component/navbar";
import Sidebar from "@/app/component/sidebar";
import ProgressBar from "@/app/component/progressbarcampaign";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col">{children}</div>
      </div>
    </>
  );
}
