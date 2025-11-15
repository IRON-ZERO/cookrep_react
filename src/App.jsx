import {Outlet} from "react-router-dom";
import Main from "./pages/Main";
import HeaderNav from "./components/layouts/global/header/HeaderNav";

function App() {
  return (
    <div>
      <HeaderNav />
      <h1>app</h1>
      <Main />
      <Outlet />
    </div>
  );
}

export default App;
