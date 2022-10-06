import { atom } from "recoil";

export const overFlow = atom({
  key: "overflow",
  default: false,
});

export const openSearchModal = atom({
  key: "textState",
  default: false,
});

export const searchId = atom<string | null>({
  key: "searchId",
  default: "",
});
