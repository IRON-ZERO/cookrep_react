export default function AuthLayout({img, children}) {
  return (
    <main className="p-16 h-full text-(--ck-white) relative overflow-hidden flex">
      <div className={`${img}`} />
      <div className="border-2 rounded-md p-5 glass-white right-0 flex flex-col gap-10 ml-auto items-center">
        {children}
      </div>
    </main>
  );
}
