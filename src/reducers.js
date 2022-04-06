import { combineReducers } from 'redux';

const initialState = {
    playlists: [],
    playlistInput: '',
    selectedPlaylist: {},
    route: 'home',
    currentVideo: {}
}

const playlists = (state = initialState.playlists, action) => {
    switch(action.type) {
        case 'SET_PLAYLISTS':
            return action.payload;
        case 'ADD_PLAYLIST':
            return [{
                name: action.payload,
                videos: []
            }, ...state];
        case 'REMOVE_PLAYLIST':
            const playlistsTemp1 = [...state];
            playlistsTemp1.splice(action.payload, 1);
            return playlistsTemp1;
        case 'ADD_VIDEO_TO_PLAYLIST':
            const playlistsTemp2 = [...state];
            for (let playlist of playlistsTemp2) {
                if (playlist.name === action.payload.name) {
                    playlist.videos = [...playlist.videos, action.payload.videoData];
                }
            }
            return playlistsTemp2;
        case 'REMOVE_VIDEO_FROM_PLAYLIST':
            const playlistsTemp3 = [...state];
            for (let playlist of playlistsTemp3) {
                if (playlist.name === action.payload.name) {
                    for (let video of playlist.videos) {
                        if (video.id === action.payload.id) {
                            const index = playlist.videos.indexOf(video);
                            playlist.videos.splice(index, 1);
                        }
                    }
                }
            }
            return playlistsTemp3;
        default:
            return state;
    }
}

const playlistInput = (state = initialState.playlistInput, action) => {
    switch(action.type) {
        case 'UPDATE_PLAYLIST_INPUT':
            return action.payload;
        default:
            return state;
    }
}

const selectedPlaylist = (state = initialState.selectedPlaylist, action) => {
    switch(action.type) {
        case 'SET_SELECTED_PLAYLIST':
            return action.payload;
        case 'ADD_VIDEO_TO_PLAYLIST':
            const playlistTemp = {...state};
            playlistTemp.videos = [...playlistTemp.videos, action.payload.videoData];
            return playlistTemp;
        case 'REMOVE_VIDEO_FROM_PLAYLIST':
            const playlistTemp2 = {...state};
            for (let video of playlistTemp2.videos) {
                if (video.id === action.payload.id) {
                    const index = playlistTemp2.videos.indexOf(video);
                    playlistTemp2.videos.splice(index, 1);
                }
            }
            return playlistTemp2;
        default:
            return state;
    }
}

const route = (state = initialState.route, action) => {
    switch(action.type) {
        case 'SET_ROUTE':
            return action.payload;
        default:
            return state;
    }
}

const currentVideo = (state = initialState.currentVideo, action) => {
    switch(action.type) {
        case 'SET_CURRENT_VIDEO':
            return action.payload;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    playlists,
    playlistInput,
    selectedPlaylist,
    route,
    currentVideo
})

export default allReducers;