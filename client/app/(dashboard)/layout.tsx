import Sidebar from "@/components/Sidebar";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isAuth = isAuthenticated();

  // if(!isAuth){
  //   redirect('/login')
  // }
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}