import React from "react";
import HomeSliderLayout from "./_HomeSliderLayout";
import HomeSliderLoadingItem from "./_HomeSliderLoadingItem";
import CookTypeBadge from "../shared/_CookTypeBadge";

/**
 * @param {OpenAPIResult} data
 * @param {number} index
 * @returns {React.ReactNode}
 */
export default function HomeSlider({data, index}) {
  return (
    <HomeSliderLayout>
      <CookTypeBadge
        way={data.RCP_WAY2}
        type={data.RCP_PAT2}
        classNames="right-6 bottom-18"
      />
      <span className="absolute block z-30 text-[250px] font-bold -left-3 -bottom-25 -skew-12 rotate-12 text-(--ck-subTxt)">
        {index}
      </span>
      <h3 className="absolute text-4xl font-bold z-30 bottom-6 right-6 text-(--ck-white)">
        {data.RCP_NM}
      </h3>
      {data.ATT_FILE_NO_MK ? (
        <img
          src={data.ATT_FILE_NO_MK}
          alt={data.RCP_NM}
          className="size-[500px] brightness-50"
        />
      ) : (
        <HomeSliderLoadingItem />
      )}
    </HomeSliderLayout>
  );
}
