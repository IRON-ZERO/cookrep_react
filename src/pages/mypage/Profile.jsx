import { useState } from "react";
import { useOutletContext } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../apis/user/userApi";
import MypageSidebar from "../../components/layouts/mypage/MypageSidebar";
import useWithdrawMutation from "../../hooks/auth/useWithdrawMutation";

export default function Profile() {
  // ─────────────────────────────────────────────
  // ✅ 선언부
  // ─────────────────────────────────────────────
  const queryClient = useQueryClient();
  const { user } = useOutletContext();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
      setIsEditing(false);
      alert("수정 완료!");
    },
  });

  const { mutate: withdraw } = useWithdrawMutation();

  // ─────────────────────────────────────────────
  // ✅ 로직부
  // ─────────────────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUserMutation.mutate({
      firstName: form.firstName || user.firstName,
      lastName: form.lastName || user.lastName,
      country: form.country || user.country,
      city: form.city || user.city,
    });
  };

  const handleWithdraw = () => {
    if (confirm("정말 탈퇴하시겠습니까?")) {
      withdraw();
    }
  };
  return (
    <div className="flex flex-1 h-full">
      {/* ───────────────────────────────
           프로필 메인 영역
         ─────────────────────────────── */}
      <section className="w-full flex flex-col p-20 gap-10">
        <h2 className="text-3xl font-bold">{user.nickname}님의 Profile</h2>

        <div className="border-2 border-gray-400 rounded-xl p-12">
          {/* VIEW MODE */}
          {!isEditing && (
            <div className="flex flex-col gap-10">
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ edit
                </button>
              </div>

              {/* 프로필 상단 */}
              <div className="flex items-center gap-10">
                <img
                  src="/images/icons/user-icon-1.png"
                  className="w-32 h-32 rounded-full"
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{user.nickname}</h3>
                  <span className="text-gray-600">{user.email}</span>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="flex gap-20">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-600">이름(성)</label>
                      <p>{user.firstName}</p>
                    </div>
                    <div>
                      <label className="text-gray-600">이름</label>
                      <p>{user.lastName}</p>
                    </div>
                    <div>
                      <label className="text-gray-600">이메일</label>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">Address</h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-600">Country</label>
                      <p>{user.country}</p>
                    </div>
                    <div>
                      <label className="text-gray-600">City</label>
                      <p>{user.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EDIT MODE */}
          {isEditing && (
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </button>
              </div>

              {/* 프로필 상단 */}
              <div className="flex items-center gap-10">
                <img
                  src="/images/icons/user-icon-1.png"
                  className="w-32 h-32 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold">{user.nickname}</h3>
                  <span className="text-gray-600">{user.email}</span>
                </div>
              </div>

              {/* 수정 폼 */}
              <div className="flex gap-20">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-600">이름(성)</label>
                      <input
                        name="firstName"
                        className="border p-2 w-full rounded-md"
                        placeholder={user.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="text-gray-600">이름</label>
                      <input
                        name="lastName"
                        className="border p-2 w-full rounded-md"
                        placeholder={user.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="text-gray-600">이메일</label>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">Address</h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-600">Country</label>
                      <input
                        name="country"
                        className="border p-2 w-full rounded-md"
                        placeholder={user.country}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="text-gray-600">City</label>
                      <input
                        name="city"
                        className="border p-2 w-full rounded-md"
                        placeholder={user.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700"
                >
                  수정
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 회원 탈퇴 */}
        <div className="text-right mt-10">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm cursor-pointer"
            onClick={() => {
              handleWithdraw();
            }}
          >
            회원 탈퇴
          </button>
        </div>
      </section>
    </div>
  );
}
