import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRoute } from '../actions';

const FullScreenVideo = () => {
    const dispatch = useDispatch();
    const currentVideo = useSelector(state => state.currentVideo);
    
    useEffect(() => {
        
    })

    return (
        <div className='fullscreenVideoContainer'>
            <button onClick={() => dispatch(setRoute('home'))}>Back</button>
            <iframe id='frame' src={currentVideo} title={currentVideo} allow="fullscreen" frameBorder="0" ></iframe>
        </div>
    );
};

export default FullScreenVideo;