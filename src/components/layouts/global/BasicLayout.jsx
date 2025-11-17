export default function BasicLayout({classNames, children}) {
  return <main className={`p-16 ${classNames}`}>{children}</main>;
}
