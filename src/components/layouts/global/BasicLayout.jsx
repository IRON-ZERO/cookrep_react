export default function BasicLayout({classNames, children}) {
  return <main className={`py-16 px-44 ${classNames}`}>{children}</main>;
}
