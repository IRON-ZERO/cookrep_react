export default function AuthLayout({img, children}) {
  return (
    <main className="p-16 h-full text-(--ck-white) relative overflow-hidden flex justify-center">
      <div className={`${img}`} />
      <div className="absolute top-0 sm:top-0 sm:right-0 min-w-full sm:min-w-[33%] h-full sm:bg-slate-900/80 sm:flex justify-center items-center p-16">
        <div className="border rounded-md p-5 glass-white flex flex-col gap-10 items-center h-full overflow-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
