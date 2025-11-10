export default function AuthLayout({classNames, children}) {
  return (
    <main className={`p-16 h-full text-(--ck-white) ${classNames}`}>
      {children}
    </main>
  );
}
