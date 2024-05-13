import Sidebar from "@/components/Sidebar";
import EditDialog from "@/components/EditDialog";
import Image from "next/image";
import MainDisplay from "@/components/MainDisplay";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  ">
      {/* <EditDialog/>
       */}
      <Sidebar />
      <MainDisplay />
    </main>
  );
}
