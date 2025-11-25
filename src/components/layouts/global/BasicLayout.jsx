export default function BasicLayout({classNames, children}) {
  return (
    <main className={`py-16 px-10 sm:px-24 md:px-44 ${classNames}`}>
      {children}
    </main>
  );
}
