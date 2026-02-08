import SellerHeader from "./_component/Header";
import SellerSidebar from "./_component/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">
        {/* Sidebar */}
        <div className="xl:block hidden">
          <SellerSidebar />
        </div>

        <div className="w-full bg-background">
          {/* Top Header */}
          <SellerHeader />

          {/* Body Content */}
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-2">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
