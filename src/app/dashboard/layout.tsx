import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import MobileNav from "@/components/MobileNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-4 sm:p-6 pb-24 md:pb-6 overflow-y-auto">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
