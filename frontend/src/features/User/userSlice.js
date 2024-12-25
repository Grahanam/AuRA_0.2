import { createSlice } from "@reduxjs/toolkit";
import { googleAuth } from "../../actions/auth/authaction";
import Cookie from "universal-cookie";
import {
  fetchSingleUser,
  fetchUserSearch,
} from "../../actions/user/useraction";

const cookie = new Cookie();

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userSearch: [],
    userId: "",
    gId: "",
    mainId: "",
    picture: "",
    search: "",
    loading: false,
    error: null,
    userloading: false,
    usererror: null,
  },
  reducers: {
    getquery: (state, action) => {
      state.search = action.payload;
    },
    setUserSearchEmpty: (state, action) => {
      state.userSearch = [];
    },
    removeUserData: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUserSearch.pending, (state) => {
        state.userloading = true;
        state.usererror = null;
      })
      .addCase(fetchUserSearch.fulfilled, (state, action) => {
        state.userloading = false;
        state.userSearch = action.payload;
      })
      .addCase(fetchUserSearch.rejected, (state, action) => {
        state.userloading = false;
        state.usererror = action.error.message;
      });
  },
});

export const { removeUserData, getquery, setUserSearchEmpty } =
  userSlice.actions;

export default userSlice.reducer;
