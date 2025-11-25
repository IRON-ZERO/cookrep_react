import {Outlet} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUserDetail} from "../../apis/user/userApi";
import MypageSidebar from "../../components/layouts/mypage/MypageSidebar";
import footer from "../../components/layouts/global/footer/FooterCont";
import ScrollToTop from "../../components/layouts/mypage/ScrollToTop";

export default function Mypage() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDetail"],
    queryFn: getUserDetail,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>유저 정보를 불러오는데 실패했습니다.</div>;
  if (!user) return <div>유저 정보가 없습니다.</div>;
  return (
    <div className="flex flex-col">
      <div className="flex">
        <MypageSidebar user={user} />
        <div className="flex-1 p-10">
          <ScrollToTop />
          <Outlet context={{user}} />
        </div>
      </div>
      <div>{footer()}</div>
    </div>
  );
}
