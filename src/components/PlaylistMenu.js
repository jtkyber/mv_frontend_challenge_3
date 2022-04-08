import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPlaylist, removePlaylist, updatePlaylistInput, setSelectedPlaylist, setPlaylists, toggleMobilePlaylists, setRoute } from '../redux/actions';

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
        const localPlaylists = JSON.parse(localStorage.getItem('userPlaylists'));
        const localSelectedPlaylist = JSON.parse(localStorage.getItem('userSelectedPlaylist'));

        dispatch(setPlaylists(localPlaylists || []));
        dispatch(setSelectedPlaylist(localSelectedPlaylist || {}));

        document.addEventListener('keyup', handleSubmitFromEnterBtn);

        return () => {
            document.removeEventListener('keyup', handleSubmitFromEnterBtn);
        }
    }, [dispatch])
    
    useEffect(() => {
        localStorage.setItem('userPlaylists', JSON.stringify(playlists));
        localStorage.setItem('userSelectedPlaylist', JSON.stringify(selectedPlaylist));
    }, [playlists, selectedPlaylist])

    const addNewPlaylist = () => {
        if (!playlistInput) return;

        for (let playlist of playlists) {
            if (playlist.name === playlistInput) return;
        }

        playlistInputRef.current.value = '';

        dispatch(addPlaylist(playlistInput));
        dispatch(updatePlaylistInput(''));
    }

    const handlePlaylistItemClick = (e, playlist) => {
        if (e.target.tagName === 'H2' || e.target.tagName === 'BUTTON') return;

        const playlistTemp = {...playlist};
        
        dispatch(setRoute('home'));
        dispatch(setSelectedPlaylist(playlistTemp));
    }

    const handlePlaylistRemoval = (name, index) => {
        if (name === selectedPlaylist.name) dispatch(setSelectedPlaylist(playlists[index + 1] || playlists[index - 1] || {}))
        dispatch(removePlaylist(index));
    }

    const handleSubmitFromEnterBtn = (e) => {
        if (e.code === 'Enter' && e.target === playlistInputRef.current) submitBtnRef.current.click();
    }

    const handlePlaylistTabClick = (e) => {
        if (e.target.offsetHeight < 50) {
            dispatch(toggleMobilePlaylists(true))
        } else if (playlistMenuContainerRef.current.classList.contains('expanded') && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
            dispatch(toggleMobilePlaylists(false))
        }
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
                <input maxLength='15' ref={playlistInputRef} onChange={(e) => dispatch(updatePlaylistInput(e.target.value))} type='text' placeholder='Enter Playlist Name'></input>
                <button ref={submitBtnRef} onClick={addNewPlaylist}>+</button>
            </div>
        </div>
    );
};

export default PlaylistMenu;