import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVideoToPlaylist, removeVideoFromPlaylist, setRoute, setCurrentVideo } from '../redux/actions';
import VideoPlayer from "./VideoPlayer";

const PlaylistContent = () => {
    const dispatch = useDispatch();

    const selectedPlaylist = useSelector(state => state.selectedPlaylist);
    const route = useSelector(state => state.route);

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

        // Extract the YouTube video ID if the URL is valid
        // Do nothing if video is already present in the selected playlist
        if (currentUrl.match('https://www.youtube.com/watch?')) {
            videoID = currentUrl.split('=')[1].split('&')[0];

            for (let video of selectedPlaylist.videos) {
                if (video.id === videoID) return;
            }
        } else if (currentUrl.match('https://youtu.be/')) {
            videoID = currentUrl.split('https://youtu.be/')[1];

            for (let video of selectedPlaylist.videos) {
                if (video.id === videoID) return;
            }
        } else return;

        dispatch(addVideoToPlaylist({
            name: selectedPlaylist.name,
            videoData: {
                url: `https://www.youtube.com/watch?v=${videoID}`,
                thumbnail: `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
                id: videoID
            }
        }));

        videoURLinputRef.current.value = '';
    }

    const handleVideoClick = (id) => {
        // Set URL for video player, then replace thumbnails with video player by changing the route
        const embededVideoUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;

        dispatch(setCurrentVideo(embededVideoUrl));
        dispatch(setRoute('fullscreenVid'))
    }

    const handleVideoRemoval = (id) => {
        dispatch(removeVideoFromPlaylist({
            id,
            name: selectedPlaylist.name
        }));
    }

    const handleUrlSubmitFromEnterBtn = (e) => {
        // Map enter key to submit button if input is focused
        if (e.key === 'Enter' && e.target === videoURLinputRef.current) videoURLSubmitRef.current.click();
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
                    : <h3 className='playlistContentPlaceholder'>Select a Playlist</h3>
                }
            </header>
            
            {
                route === 'home' ?
                    <div className='allVideos'>
                        {
                            selectedPlaylist.videos?.map((video, index) => {
                                return (
                                    <div key={index} className='singleVideo'>
                                        <button className='videoRemovalBtn' onClick={() => handleVideoRemoval(video.id)}>
                                            <h2>-</h2>
                                        </button>
                                        <div className='thumbnailContainer'>
                                            <img onClick={() => handleVideoClick(video.id)} src={video.thumbnail} alt={video.url}/>
                                        </div>
                                        <a href={video.url} target='_blank' rel='noopener noreferrer'>Watch On YouTube</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                : <VideoPlayer />
            }
        </div>
    );
};

export default PlaylistContent;