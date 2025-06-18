import Timeline from "../../component/progressbar";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Timeline />
      {children}
    </div>
  );
}
