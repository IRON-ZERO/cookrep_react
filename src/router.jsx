import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import RecipeUpload from "./pages/recipe/RecipeUpload";
import RecipeList from "./pages/recipe/RecipeList.jsx";
import RecipeDetail from "./pages/recipe/RecipeDetail.jsx";
import RecipeEdit from "./pages/recipe/RecipeEdit.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import { authApi } from "./apis/auth/authApi.js";
import UserApiTest from "./components/pages/UserAPITest.jsx";
import Mypage from "./pages/mypage/Mypage";
import Profile from "./pages/mypage/Profile";
import Fridge from "./pages/mypage/Fridge";
import Freezer from "./pages/mypage/Freezer";
import Scrap from "./pages/mypage/Scrap";
import MyRecipes from "./pages/mypage/MyRecipes";

const checkAuth = async () => {
  try {
    await authApi.loggedIn();
    return true;
  } catch (err) {
    return false;
  }
};
const guestOnlyLoader = async () => {
  const isLoggedIn = await checkAuth();
  if (isLoggedIn) {
    return redirect("/");
  }
  return null;
};
const authRequiredLoader = async () => {
  const isLoggedIn = await checkAuth();
  if (!isLoggedIn) {
    return redirect("/login");
  }
  return null;
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/upload",
        element: <RecipeUpload />,
      },
      {
        path: "/mypage/recipes",
        element: <RecipeList />,
      },
      {
        path: "/mypage/recipe/:recipeId",
        element: <RecipeDetail />,
      },
      {
        path: "/mypage/recipe/edit/:recipeId",
        element: <RecipeEdit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: guestOnlyLoader,
  },
  {
    path: "/join",
    element: <Join />,
    loader: guestOnlyLoader,
  },
  {
    path: "/mypage",
    element: <Mypage />,
    loader: authRequiredLoader,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "fridge",
        element: <Fridge />,
      },
      {
        path: "freezer",
        element: <Freezer />,
      },
      {
        path: "scrap",
        element: <Scrap />,
      },
      {
        path: "recipes",
        element: <MyRecipes />,
      },
    ],
  },
]);
