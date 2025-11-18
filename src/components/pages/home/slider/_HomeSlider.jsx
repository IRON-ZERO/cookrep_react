import React from "react";
import HomeSliderLayout from "./_HomeSliderLayout";
import HomeSliderLoadingItem from "./_HomeSliderLoadingItem";

/**
 * @param {OpenAPIResult} data
 * @param {int} index
 * @returns {React.ReactNode}
 */
export default function HomeSlider({data, index}) {
  return (
    <HomeSliderLayout classNames="">
      <p className="absolute flex gap-2 right-6 bottom-18 z-50 text-(--ck-white) text-2xl *:px-3 *:py-1 *:rounded-xl">
        <span className="bg-(--ck-red)">{data.RCP_WAY2}</span>
        <span className="bg-(--ck-green)">{data.RCP_PAT2}</span>
      </p>
      <span className="absolute block z-50 text-[250px] font-bold -left-3 -bottom-25 -skew-12 rotate-12 text-(--ck-subTxt)">
        {index}
      </span>
      <h3 className="absolute text-4xl font-bold z-50 bottom-6 right-6 text-(--ck-white)">
        {data.RCP_NM}
      </h3>
      {data ? (
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
