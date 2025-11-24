import React from "react";
import HomeSliderLayout from "../layout/_OpenApiLoadingLayout";
import {OpenApiLoadingItemCircle} from "../layout/_OpenApiLoadingItem";
import CookTypeBadge from "../../../_CookTypeBadge";

/**
 * @param {OpenAPIResult} data
 * @param {number} index
 * @returns {React.ReactNode}
 */
export default function HomeSlider({data, index, onClick}) {
  return (
    <HomeSliderLayout
      classNames="size-[200px] rounded-full group cursor-pointer"
      onClick={() => onClick(data.RCP_SEQ)}
    >
      <CookTypeBadge
        way={data.RCP_WAY2}
        type={data.RCP_PAT2}
        classNames="top-8"
      />
      <span className="absolute block z-20 text-[200px] font-bold left-0 -bottom-25 -skew-12 rotate-12 text-(--ck-subTxt)">
        {index}
      </span>
      <h3
        className={`absolute text-sm font-bold z-30 bottom-6 right-7 text-(--ck-white) truncate overflow-hidden text-right ${
          data.RCP_NM.length > 10 ? "w-32 text-wrap" : "w-72"
        }`}
      >
        {data.RCP_NM}
      </h3>
      {data.ATT_FILE_NO_MK ? (
        <img
          src={data.ATT_FILE_NO_MK}
          alt={data.RCP_NM}
          loading="lazy"
          className="w-full h-full brightness-50"
        />
      ) : (
        <OpenApiLoadingItemCircle />
      )}
    </HomeSliderLayout>
  );
}
