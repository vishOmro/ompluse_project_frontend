import Navbar from "@/app/component/navbar";
import Sidebar from "@/app/component/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
