/* global daum */
export const onClickAddressBtn = (setValue) => {
  new daum.Postcode({
    oncomplete: function (data) {
      setValue("country", "대한민국");
      setValue("city", data.roadAddress);
    },
  }).open();
};
