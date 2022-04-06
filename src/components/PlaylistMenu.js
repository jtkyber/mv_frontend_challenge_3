import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPlaylist, removePlaylist, updatePlaylistInput, setSelectedPlaylist, setPlaylists } from '../actions';

const PlaylistMenu = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists);
    const playlistInput = useSelector(state => state.playlistInput);
    const selectedPlaylist = useSelector(state => state.selectedPlaylist);

    const playlistInputRef = useRef(null);
    const submitBtnRef = useRef(null);

    useEffect(() => {
        const localPlaylist = JSON.parse(localStorage.getItem('userPlaylists'));
        const localSelectedPlaylist = JSON.parse(localStorage.getItem('userSelectedPlaylist'));
        dispatch(setPlaylists(localPlaylist));
        dispatch(setSelectedPlaylist(localSelectedPlaylist));

        document.addEventListener('keyup', handleSubmitFromEnterBtn);

        return () => {
            document.removeEventListener('keyup', handleSubmitFromEnterBtn);
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem('userPlaylists', JSON.stringify(playlists));
        localStorage.setItem('userSelectedPlaylist', JSON.stringify(selectedPlaylist));
    }, [playlists, selectedPlaylist])

    const addNewPlaylist = () => {
        if (!playlistInput) return;
        dispatch(addPlaylist(playlistInput));
        playlistInputRef.current.value = '';
        dispatch(updatePlaylistInput(''));
    }

    const handlePlaylistItemClick = (e, playlist) => {
        if (e.target.tagName === 'H2') return;
        const playlistTemp = {...playlist};
        dispatch(setSelectedPlaylist(playlistTemp));
    }

    const handlePlaylistRemoval = (name, index) => {
        if (name === selectedPlaylist.name) {
            dispatch(setSelectedPlaylist(playlists[index + 1] || playlists[index - 1] || {}));
        }
        dispatch(removePlaylist(index));
    }

    const handleSubmitFromEnterBtn = (e) => {
        if (e.code === 'Enter' && e.target === playlistInputRef.current) submitBtnRef.current.click();
    }

    return (
        <div className='playlistMenuContainer'>
            <h2>Playlists</h2>
            <div className='playlistMenu'>
                {
                    playlists.length ?
                        playlists.map((playlist, index) => {
                            return (
                                <div onClick={(e) => handlePlaylistItemClick(e, playlist)} key={index} className={`playlistItem ${playlist.name === selectedPlaylist.name ? 'selectedPlaylist' : null}`}>
                                    <h3>{playlist.name}</h3>
                                    <h2 onClick={() => handlePlaylistRemoval(playlist.name, index)}>-</h2>
                                </div>
                            )
                        })
                    : <h3 className='playlistPlaceholder'>Create a playlist to get started!</h3>
                }
            </div>
            <div className='addNewPlaylist'>
                <input ref={playlistInputRef} onChange={(e) => dispatch(updatePlaylistInput(e.target.value))} type='text' placeholder='Enter Playlist Name'></input>
                <button ref={submitBtnRef} onClick={addNewPlaylist}>+</button>
            </div>
        </div>
    );
};

export default PlaylistMenu;