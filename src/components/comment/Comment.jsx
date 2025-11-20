import { useEffect, useState } from "react";

export default function Comment({ recipeId, loginUserId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 댓글 불러오기
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comment/recipe/${recipeId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("댓글을 불러오지 못했습니다.");
        return res.json();
      })
      .then((data) => setComments(data))
      .catch((err) => console.error("댓글 불러오기 오류:", err));
  }, [recipeId]);

  // 댓글 작성
  const writeComment = () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comment`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId, contents: newComment, userId: loginUserId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("댓글 작성에 실패했습니다.");
        return res.json();
      })
      .then((saved) => {
        setComments((prev) => [...prev, { ...saved, owner: true }]);
        setNewComment("");
      })
      .catch((err) => {
        console.error("댓글 작성 오류:", err);
        alert("댓글 작성 중 오류가 발생했습니다.");
      });
  };

  // 댓글 삭제
  const deleteComment = (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comment/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setComments((prev) => prev.filter((c) => c.commentId !== commentId));
          alert("댓글이 삭제되었습니다.");
        } else {
          alert("댓글 삭제에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.error("댓글 삭제 오류:", err);
        alert("댓글 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="mt-14 border-t border-gray-300 pt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 댓글</h2>

      {/* 댓글 목록 */}
      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li
              key={c.commentId}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">
                  {c.nickname || c.userId}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{c.contents}</p>

              {/* 작성자만 삭제 버튼 표시 */}
              {c.owner && (
                <button
                  className="text-red-500 text-sm mt-2 hover:underline"
                  onClick={() => deleteComment(c.commentId)}
                >
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">아직 댓글이 없습니다.</p>
      )}

      {/* 댓글 입력창 */}
      <div className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-orange-300"
          rows="3"
        />
        <button
          onClick={writeComment}
          disabled={!newComment.trim()}
          className={`mt-3 px-5 py-2 rounded-lg transition ${
            newComment.trim()
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
}
