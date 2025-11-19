import {Link} from "react-router";

export default function FooterCont() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col p-10 gap-5 bg-(--ck-subTxt-dark) text-(--ck-white)">
      <div className="flex gap-10 items-center">
        <Link to="/" className="w-44">
          <img src="/images/logos/logo_3.png" alt="로고이미지" />
        </Link>
        <div>
          <h4 className="text-2xl font-bold">CooKRep</h4>
          <span className="font-bold">Recipe, Fresh Taste, Successful!!</span>
        </div>
      </div>
      <p className="self-end">&copy; {year} CooKRep. All Rights reserved.</p>
    </footer>
  );
}
