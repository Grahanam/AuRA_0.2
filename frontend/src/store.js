
import {configureStore} from '@reduxjs/toolkit'

import artistreducer from './features/search/artistSlice';
import authreducer from './features/Auth/authSlice'
import searchreducer from './features/search/searchSlice'
import genrereducer from './features/Genre/genreSlice'
import locationreducer from './features/Location/locationslice'
import playerreducer from './features/player/playerSlice'
import playlistreducer from './features/Playlist/playlistSlice'
import albumreducer from './features/Album/albumSlice'
import trackreducer from './features/Track/trackSlice'

const store = configureStore({
    reducer:{
        artist:artistreducer,
        auth:authreducer,
        search:searchreducer,
        genre:genrereducer,
        location:locationreducer,
        player:playerreducer,
        playlist:playlistreducer,
        album:albumreducer,
        track:trackreducer
    },
})

export default store;