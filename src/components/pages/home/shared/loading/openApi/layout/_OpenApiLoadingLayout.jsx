export default function HomeSliderLayout({classNames = "", onClick, children}) {
  return (
    <li
      onClick={onClick}
      className={`relative flex flex-col justify-center items-center bg-gray-300 overflow-hidden ${classNames}`}
    >
      {children}
    </li>
  );
}
