import Timeline2 from "@/app/component/progressbarcreate";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Timeline2 />
      {children}
    </div>
  );
}
