export default function OpenApiError(props) {
  return (
    <li {...props}>
      <p>
        금일 데이터 이용한도를 모두 사용하였거나 공공데이터 서버가 닫쳤습니다.
        관리자에게 문의하세요.
      </p>
    </li>
  );
}
