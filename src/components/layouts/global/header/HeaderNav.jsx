import NavList from "./_NavList";
import AuthNavList from "./_AuthNavList";
export default function HeaderNav() {
  return (
    <header
      className="fixed top-0 flex justify-between items-center p-10 bg-(--ck-white) 
      w-full h-44 **:text-2xl **:font-bold shadow"
    >
      <NavList />
      <AuthNavList />
    </header>
  );
}
