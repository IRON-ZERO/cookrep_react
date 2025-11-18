import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../../apis/user/userApi";
import MypageSidebar from "../../components/layouts/mypage/MypageSidebar";

export default function Mypage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userDetail"],
    queryFn: getUserDetail,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <MypageSidebar user={user} />
      <div className="flex-1 p-10">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}
