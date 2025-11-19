import {Outlet} from "react-router-dom";
import HeaderNav from "./components/layouts/global/header/HeaderNav";
import FooterCont from "./components/layouts/global/footer/FooterCont";

function App() {
  return (
    <div className="h-full">
      <HeaderNav />
      <Outlet />
      <FooterCont />
    </div>
  );
}

export default App;
