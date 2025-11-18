import { BASE_URL } from "../baseUrl";

export const authApi = {
  // LOGIN
  login: async (data) => {
    const response = await fetch(`${BASE_URL}/api/loginByNickname`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.userId,
        password: data.password,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.msg || "로그인에 실패했어요.");
    }
    return responseData;
  },
  // JOIN
  join: async (data) => {
    const response = await fetch(`${BASE_URL}/api/join`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.msg || "회원가입에 실패했어요.");
    }
    return responseData;
  },
  // LOGOUT
  logout: async () => {
    const response = await fetch(`${BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("로그아웃 중 오류가 발생했습니다.");
    }
    return responseData;
  },
  // LOGGED IN USER
  loggedIn: async () => {
    const response = await fetch(`${BASE_URL}/api/check`, {
      method: "GET",
      credentials: "include",
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("로그인 후 이용 가능해요.");
    }
    return responseData;
  },
};
