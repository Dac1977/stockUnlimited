// import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4 items-center sm:items-start">
          <h1 className="text-5xl font-bold text-center sm:text-left">Dashboard</h1>
          <p className="text-xl text-center sm:text-left">Dashboard de stock</p>
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
