import NavList from "./_NavList";
import AuthNavList from "./_AuthNavList";
export default function HeaderNav() {
  return (
    <header>
      <NavList />
      <AuthNavList />
    </header>
  );
}
