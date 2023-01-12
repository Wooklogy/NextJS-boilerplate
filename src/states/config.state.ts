import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist()
// 핵심은 atom을 이용해 unique한 key값과 초기값을 넣어주는 것입니다.
export const principalState = atom({ key: "principal", default: "Jane Doe" , effects_UNSTABLE:[persistAtom]});

// // 만약 새로고침&페이지 이동시에도 데이터를 유지하고 싶다면 다음과 같이 선언합니다.
// // 핵심은 effects_UNSTABLE:[persistAtom]을 추가하는 것 입니다.
// export const principalState = atom({ key: "principal", default: "Jane Doe",effects_UNSTABLE: [persistAtom], });
