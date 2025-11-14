import {Outlet} from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <h1>app</h1>
      <Main />
      <Outlet />
    </div>
  );
}

export default App;
