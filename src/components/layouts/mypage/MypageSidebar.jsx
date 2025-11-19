import { NavLink } from "react-router-dom";
import useLogoutMutation from "../../../hooks/auth/useLogoutMutation";
import { useLocation } from "react-router";

export default function MypageSidebar({ user }) {
  const { mutate } = useLogoutMutation();
  return (
    <aside className="w-[320px] bg-gray-300 flex flex-col items-center p-6">
      {/* 로고 */}
      <NavLink to="/" className="mb-6">
        <img src="/images/logos/logo_1.png" alt="logo" className="w-48 mb-4" />
      </NavLink>

      {/* 프로필 박스 */}
      <div className="text-center mb-10">
        <img
          src="/images/icons/user-icon-1.png"
          className="w-20 h-20 rounded-full border-2 border-gray-200 mx-auto mb-2"
        />
        <h3 className="font-bold text-lg">{user?.nickname}</h3>
        <p className="text-sm text-gray-700">{user?.email}</p>
      </div>

      {/* 네비게이션 */}
      <nav className="flex flex-col gap-5 w-full">
        <SidebarItem
          to="/mypage/profile"
          icon="/images/icons/profile_icon.png"
          label="프로필"
        />
        <SidebarItem
          to="/mypage/fridge"
          icon="/images/icons/fridge_icon.png"
          label="내 냉장고"
        />
        <SidebarItem
          to="/mypage/freezer"
          icon="/images/icons/fridge_icon.png"
          label="내 냉동고"
        />
        <SidebarItem
          to="/mypage/scrap"
          icon="/images/icons/scraped_deactive.png"
          label="내 스크랩"
        />
        <SidebarItem
          to="/mypage/recipes"
          icon="/images/icons/recipe.png"
          label="내 레시피"
        />
      </nav>

      {/* 로그아웃 */}
      <div className="mt-20">
        <button
          className="text-sm text-gray-700 hover:text-black underline-none cursor-pointer"
          onClick={() => mutate()}
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}

/* ────────────────────────────────────────────
   네비게이션 아이템 컴포넌트
──────────────────────────────────────────── */
function SidebarItem({ to, icon, label }) {
  const location = useLocation();
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 w-full px-5 py-4 rounded-lg shadow-md
        transition-all text-gray-800
        ${
          isActive ||
          (to == "/mypage/profile" && location.pathname == "/mypage")
            ? "bg-gray-200 font-semibold"
            : "bg-gray-300"
        }
        hover:bg-gray-200
      `
      }
    >
      <img src={icon} className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );
}
