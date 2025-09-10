/*
** utils/user-store.tsx
**
** User state data storage with zustand.
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import { create } from "zustand";

const user_store = (set, get) => ({
  user_error: "None",
  reset: () => {
    set({
      user_error: "None",
    });
  },
});

const userStore = create(user_store);

export default userStore;

// CREATE / RESET
//import { useEffect } from "react";
//import userStore from "@/utils/user-store";
//const userStoreReset = userStore((state) => state.reset);
//useEffect(() => {
//    userStoreReset();
//}, [userStoreReset]);

// RESET
//import userStore from "@/utils/user-store";
//const userStoreReset = userStore((state) => state.reset);
//userStoreReset();

// GET (non-reactive)
//   --> to react on state change, see: https://github.com/pmndrs/zustand?tab=readme-ov-file
//import userStore from "@/utils/user-store";
//userStore((state) => ({
//  user_error: state.user_error,
//}));
// --- or ---
//user_error = userStore.getState().user_error;

// SET
//import userStore from "@/utils/user-store";
//userStore.setState({ user_error: "test" });