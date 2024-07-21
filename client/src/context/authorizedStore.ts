import { create } from "zustand";

type AuthorizedStoreType = {
  isAuthorized: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
};

const AuthorizedStore = create<AuthorizedStoreType>((set) => ({
  isAuthorized: false,
  setIsAuthorized: (isAuthorized) => set(() => ({ isAuthorized })),
}));

export default AuthorizedStore;
