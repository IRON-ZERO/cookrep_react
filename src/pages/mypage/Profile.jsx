import { useState } from "react";
import { useOutletContext } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../apis/user/userApi";
import useWithdrawMutation from "../../hooks/auth/useWithdrawMutation";
import {
  ErrorToast,
  SucceedToast,
} from "../../components/layouts/mypage/modal/Modal";
import ConfirmModal from "../../components/layouts/mypage/modal/ConfirmModal";

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

  // 토스트 상태
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
      setIsEditing(false);
      setSuccessToast("수정 완료!");
    },
    onError: (err) => {
      setErrorToast(err?.message || "수정 중 오류가 발생했습니다.");
    },
  });

  const { mutate: withdraw } = useWithdrawMutation({
    onErrorCallback: (error) => {
      setErrorToast(error?.message || "회원 탈퇴에 실패했습니다.");
    },
  });
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  // ─────────────────────────────────────────────
  // ✅ 로직부
  // ─────────────────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력값 앞뒤 공백 제거
    const firstName = form.firstName?.trim() || user.firstName;
    const lastName = form.lastName?.trim() || user.lastName;
    const country = form.country?.trim() || user.country;
    const city = form.city?.trim() || user.city;

    // 이름/성 필수 입력값 검사
    if (!firstName || !lastName) {
      setErrorToast("이름과 성을 모두 입력해주세요.");
      return;
    }

    updateUserMutation.mutate({
      firstName,
      lastName,
      country,
      city,
    });
  };

  const handleWithdraw = () => {
    setShowWithdrawConfirm(true);
  };

  const handleConfirmWithdraw = () => {
    withdraw();
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold">{user.nickname}님의 프로필</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* VIEW MODE */}
          {!isEditing && (
            <div className="space-y-4 p-6">
              {/* Edit Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  ✏️ 수정
                </button>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
                <img
                  src="/images/icons/user-icon-1.png"
                  alt={`${user.nickname}의 프로필 이미지`}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {user.nickname}
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">{user.email}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  개인 정보
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="text-xs font-medium text-gray-600">
                      성
                    </label>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                      {user.firstName || "-"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="text-xs font-medium text-gray-600">
                      이름
                    </label>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                      {user.lastName || "-"}
                    </p>
                  </div>
                  <div className="col-span-2 bg-gray-50 p-3 rounded-lg">
                    <label className="text-xs font-medium text-gray-600">
                      이메일
                    </label>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                      {user.email}
                    </p>
                  </div>
                  {errorToast && (
                    <ErrorToast
                      message={errorToast}
                      onClose={() => setErrorToast(null)}
                    />
                  )}
                  {successToast && (
                    <SucceedToast
                      message={successToast}
                      onClose={() => setSuccessToast(null)}
                    />
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  주소 정보
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="text-xs font-medium text-gray-600">
                      국가
                    </label>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                      {user.country || "-"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="text-xs font-medium text-gray-600">
                      도시
                    </label>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                      {user.city || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Withdraw Button */}
              <div className="flex justify-end pt-3 border-t border-gray-300">
                <button
                  onClick={() => handleWithdraw()}
                  className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  회원 탈퇴
                </button>
              </div>
            </div>
          )}

          {showWithdrawConfirm && (
            <ConfirmModal
              title="회원 탈퇴"
              message="정말 탈퇴하시겠습니까? 탈퇴하면 계정 정보는 복구할 수 없습니다."
              onClose={() => setShowWithdrawConfirm(false)}
              onConfirm={handleConfirmWithdraw}
            />
          )}

          {/* EDIT MODE */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {/* Cancel Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 text-sm bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  취소
                </button>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-4 border-b pb-4">
                <img
                  src="/images/icons/user-icon-1.png"
                  alt={`${user.nickname}의 프로필 이미지`}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {user.nickname}
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">{user.email}</p>
                </div>
              </div>

              {/* Personal Information Form */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  개인 정보
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      성
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder={user.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      이름
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder={user.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information Form */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  주소 정보
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      국가
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder={user.country}
                      onChange={handleChange}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      도시
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder={user.city}
                      onChange={handleChange}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="submit"
                  className="px-4 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  저장
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
