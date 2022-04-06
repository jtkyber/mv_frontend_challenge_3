export const addPlaylist = (input) => {
    return {
        type : 'ADD_PLAYLIST',
        payload: input
    }
}

export const removePlaylist = (input) => {
    return {
        type : 'REMOVE_PLAYLIST',
        payload: input
    }
}

export const updatePlaylistInput = (input) => {
    return {
        type : 'UPDATE_PLAYLIST_INPUT',
        payload: input
    }
}

export const setSelectedPlaylist = (input) => {
    return {
        type : 'SET_SELECTED_PLAYLIST',
        payload: input
    }
}

export const addVideoToPlaylist = (input) => {
    return {
        type : 'ADD_VIDEO_TO_PLAYLIST',
        payload: input
    }
}

export const removeVideoFromPlaylist = (input) => {
    return {
        type : 'REMOVE_VIDEO_FROM_PLAYLIST',
        payload: input
    }
}

export const setRoute = (input) => {
    return {
        type : 'SET_ROUTE',
        payload: input
    }
}

export const setCurrentVideo = (input) => {
    return {
        type : 'SET_CURRENT_VIDEO',
        payload: input
    }
}

export const setPlaylists = (input) => {
    return {
        type : 'SET_PLAYLISTS',
        payload: input
    }
}

export const toggleMobilePlaylists = (input) => {
    return {
        type : 'TOGGLE_MOBILE_PLAYLISTS',
        payload: input
    }
}