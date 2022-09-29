import { atom } from "recoil";

export const openSearchModal = atom({
  key: "textState",
  default: false,
});

export const searchId = atom<string | null>({
  key: "searchId",
  default: "",
});
