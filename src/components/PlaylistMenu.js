import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPlaylist, removePlaylist, updatePlaylistInput, setSelectedPlaylist, setPlaylists, toggleMobilePlaylists } from '../actions';

const PlaylistMenu = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists);
    const playlistInput = useSelector(state => state.playlistInput);
    const selectedPlaylist = useSelector(state => state.selectedPlaylist);
    const mobilePlaylistsExpanded = useSelector(state => state.mobilePlaylistsExpanded);

    const playlistInputRef = useRef(null);
    const submitBtnRef = useRef(null);
    const playlistMenuContainerRef = useRef(null);

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

        if (playlistMenuContainerRef.current.classList.contains('expanded')) {
            // playlistMenuContainerRef.current.classList.add('shrunk');
            dispatch(toggleMobilePlaylists(false))
        }
    }

    const handlePlaylistRemoval = (name, index) => {
        if (name === selectedPlaylist.name) dispatch(setSelectedPlaylist(playlists[index + 1] || playlists[index - 1] || {}))
        dispatch(removePlaylist(index));
    }

    const handleSubmitFromEnterBtn = (e) => {
        if (e.code === 'Enter' && e.target === playlistInputRef.current) submitBtnRef.current.click();
    }

    const handlePlaylistTabClick = (e) => {
        if (e.target.offsetHeight < 50) dispatch(toggleMobilePlaylists(true))
    }

    return (
        <div ref={playlistMenuContainerRef} onClick={handlePlaylistTabClick} className={`playlistMenuContainer ${mobilePlaylistsExpanded ? 'expanded' : null}`}>
            <h2 className='playlistHeaderText'>Playlists</h2>
            <div className='playlistMenu'>
                {
                    playlists.length ?
                        playlists.map((playlist, index) => {
                            return (
                                <div onClick={(e) => handlePlaylistItemClick(e, playlist)} key={index} className={`playlistItem ${playlist.name === selectedPlaylist.name ? 'selectedPlaylist' : null}`}>
                                    <h3 className='playlistItemName'>{playlist.name}</h3>
                                    <button className='playlistRemovalBtn' onClick={() => handlePlaylistRemoval(playlist.name, index)}>
                                        <h2>-</h2>
                                    </button>
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