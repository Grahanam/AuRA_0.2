import { createSlice } from "@reduxjs/toolkit";

import {
  fetchJam,
  fetchSingleJam,
  fetchTrackSearch,
  savePlaylist,
} from "../../actions/jam/jamaction";

export const jamSlice = createSlice({
  name: "jam",
  initialState: {
    jam: {},
    jams: [],
    playlist: {},
    jamConnector: {},
    playlistloading: false,
    playlisterror: null,
    playlists: [],
    loading: false,
    error: null,
    search: "",
    trackloading: false,
    trackerror: null,
    tracks: [],
    saveloading: false,
    saveerror: null,
  },
  reducers: {
    getquery: (state, action) => {
      state.search = action.payload;
    },
    updateJamConnector: (state, action) => {
      state.jamConnector.jam.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleJam.pending, (state) => {
        state.playlistloading = true;
        state.playlisterror = null;
      })
      .addCase(fetchSingleJam.fulfilled, (state, action) => {
        state.playlistloading = false;
        state.jam = action.payload;
      })
      .addCase(fetchSingleJam.rejected, (state, action) => {
        state.playlistloading = false;
        state.playlisterror = action.error.message;
      })

      .addCase(fetchJam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJam.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.jams = action.payload.jam;
        state.jamConnector = action.payload.connector;
      })
      .addCase(fetchJam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchTrackSearch.pending, (state) => {
        state.trackloading = true;
        state.trackerror = null;
      })
      .addCase(fetchTrackSearch.fulfilled, (state, action) => {
        state.trackloading = false;
        state.tracks = action.payload;
      })
      .addCase(fetchTrackSearch.rejected, (state, action) => {
        state.trackloading = false;
        state.trackerror = action.error.message;
      })

      .addCase(savePlaylist.pending, (state) => {
        state.saveloading = true;
        state.saveerror = null;
      })
      .addCase(savePlaylist.fulfilled, (state, action) => {
        state.saveloading = false;
        // state.tracks=action.payload;
      })
      .addCase(savePlaylist.rejected, (state, action) => {
        state.saveloading = false;
        state.saveerror = action.error.message;
      });
  },
});

export const { getquery, updateJamConnector } = jamSlice.actions;

export default jamSlice.reducer;
