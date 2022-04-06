import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVideoToPlaylist, removeVideoFromPlaylist, setRoute, setCurrentVideo } from '../actions';

const PlaylistContent = () => {
    const dispatch = useDispatch();
    const selectedPlaylist = useSelector(state => state.selectedPlaylist);

    const videoURLinputRef = useRef(null);
    const videoURLSubmitRef = useRef(null);

    useEffect(() => {
        document.addEventListener('keyup', handleUrlSubmitFromEnterBtn);

        return () => {
            document.removeEventListener('keyup', handleUrlSubmitFromEnterBtn);
        }
    }, [])

    const handleUrlSubmit = () => {
        const currentUrl = videoURLinputRef.current.value;
        let videoID;

        if (!currentUrl.match('https://www.youtube.com/watch?')) {
            return;
        } else {
            videoID = currentUrl.split('=')[1].split('&')[0];
            for (let video of selectedPlaylist.videos) {
                if (video.id === videoID) return;
            }
        }

        dispatch(addVideoToPlaylist({
            name: selectedPlaylist.name,
            videoData: {
                url: videoURLinputRef.current.value,
                thumbnail: `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`,
                id: videoID
            }
        }));
        videoURLinputRef.current.value = '';
    }

    const handleVideoClick = (id) => {
        const embededVideoUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
        dispatch(setCurrentVideo(embededVideoUrl));
        dispatch(setRoute('fullscreenVid'))
    }

    const handleVideoRemoval = (id, index) => {
        dispatch(removeVideoFromPlaylist({
            id,
            name: selectedPlaylist.name
        }));
    }

    const handleUrlSubmitFromEnterBtn = (e) => {
        if (e.code === 'Enter' && e.target === videoURLinputRef.current) videoURLSubmitRef.current.click();
    }

    return (
        <div className='playlistContentContainer'>
            <header>
                {
                    selectedPlaylist.videos ?
                    <>
                        <h1>{selectedPlaylist.name}</h1>
                        <div className='addVideo'>
                            <input ref={videoURLinputRef} type='text' placeholder='Enter Video URL'></input>
                            <button ref={videoURLSubmitRef} onClick={handleUrlSubmit}>+</button>
                        </div>
                    </>
                    : <h3>Select a Playlist</h3>
                }
            </header>
            <div className='allVideos'>
                {
                    selectedPlaylist.videos?.map((video, index) => {
                        return (
                            <div key={index} className='singleVideo'>
                                <h2 onClick={() => handleVideoRemoval(video.id, index)}>-</h2>
                                <div className='thumbnailContainer'>
                                    <img onClick={() => handleVideoClick(video.id)} src={video.thumbnail} alt={video.url}/>
                                </div>
                                <a href={video.url} target='_blank' rel='noopener noreferrer'>Watch On YouTube</a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PlaylistContent;