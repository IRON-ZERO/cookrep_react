import {useQuery} from "@tanstack/react-query";
import {openApi} from "../../apis/openApi/openApi";
/**
 * @typedef {Array} OpenApiResult
 * @property {String} ATT_FILE_NO_MAIN
 * @property {String} ATT_FILE_NO_MK
 * @property {String} HASH_TAG
 * @property {String} INFO_CAR
 * @property {string} INFO_ENG
 * @property {string} INFO_FAT
 * @property {string} INFO_NA
 * @property {string} INFO_PRO
 * @property {string} INFO_WGT
 * @property {string} MANUAL01
 * @property {string} MANUAL02
 * @property {string} MANUAL03
 * @property {string} MANUAL04
 * @property {string} MANUAL05
 * @property {string} MANUAL06
 * @property {string} MANUAL07
 * @property {string} MANUAL08
 * @property {string} MANUAL09
 * @property {string} MANUAL10
 * @property {string} MANUAL11
 * @property {string} MANUAL12
 * @property {string} MANUAL13
 * @property {string} MANUAL14
 * @property {string} MANUAL15
 * @property {string} MANUAL16
 * @property {string} MANUAL17
 * @property {string} MANUAL18
 * @property {string} MANUAL19
 * @property {string} MANUAL20
 * @property {string} MANUAL_IMG01
 * @property {string} MANUAL_IMG02
 * @property {string} MANUAL_IMG03
 * @property {string} MANUAL_IMG04
 * @property {string} MANUAL_IMG05
 * @property {string} MANUAL_IMG06
 * @property {string} MANUAL_IMG07
 * @property {string} MANUAL_IMG08
 * @property {string} MANUAL_IMG09
 * @property {string} MANUAL_IMG10
 * @property {string} MANUAL_IMG11
 * @property {string} MANUAL_IMG12
 * @property {string} MANUAL_IMG13
 * @property {string} MANUAL_IMG14
 * @property {string} MANUAL_IMG15
 * @property {string} MANUAL_IMG16
 * @property {string} MANUAL_IMG17
 * @property {string} MANUAL_IMG18
 * @property {string} MANUAL_IMG19
 * @property {string} MANUAL_IMG20
 * @property {string} RCP_NA_TIP
 * @property {string} RCP_NM
 * @property {string} RCP_PARTS_DTLS
 * @property {string} RCP_PAT2
 * @property {string} RCP_SEQ
 * @property {string} RCP_WAY2
 */

export default function useOpenApiQuery({start, end}) {
  const {data, isPending, isError, isSuccess} = useQuery({
    queryKey: ["getOpenAPIRecipeList"],
    queryFn: () => openApi.getOpenAPIRecipeList({start, end}),
  });
  return {data, isPending, isError, isSuccess};
}
