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

        // Grab playlists and selected playlist from local storage if available
        dispatch(setPlaylists(localPlaylists || []));
        dispatch(setSelectedPlaylist(localSelectedPlaylist || {}));

        document.addEventListener('keyup', handleSubmitFromEnterBtn);

        return () => {
            document.removeEventListener('keyup', handleSubmitFromEnterBtn);
        }
    }, [dispatch])
    
    useEffect(() => {
        // Update playlists and selected playlist in local storage every time they change
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

        // Exit out of video player if user is there
        dispatch(setRoute('home'));
        // Set the selected playlist with the playlist that was passed in
        dispatch(setSelectedPlaylist({...playlist}));
    }

    const handlePlaylistRemoval = (name, index) => {
        // Change selected playlist and exit out of video player if removed playlist is same as selected, 
        // then remove clicked playlist based on it's index in the array
        if (name === selectedPlaylist.name) {
            dispatch(setRoute('home'));
            dispatch(setSelectedPlaylist(playlists[index + 1] || playlists[index - 1] || {}))
        }
        dispatch(removePlaylist(index));
    }

    const handleSubmitFromEnterBtn = (e) => {
        // Map enter key to submit button if input is focused
        if (e.code === 'Enter' && e.target === playlistInputRef.current) submitBtnRef.current.click();
    }

    const handlePlaylistTabClick = (e) => {
        // Expand and shrink playlist menu if it is in the form of a tab (smaller/mobile devices)
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