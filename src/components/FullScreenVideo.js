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
            <svg onClick={() => dispatch(setRoute('home'))} width="502" height="201" viewBox="0 0 502 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8474 89.8902C5.99294 94.7829 5.99293 106.217 13.8474 111.11L141.891 190.872C150.217 196.059 161 190.072 161 180.262V147.5H482C488.904 147.5 494.5 141.904 494.5 135V65C494.5 58.0964 488.904 52.5 482 52.5H161V20.7378C161 10.9282 150.217 4.94129 141.891 10.128L13.8474 89.8902Z" stroke="#00D7FF" strokeWidth="15"/>
            </svg>
            <iframe id='frame' src={currentVideo} title={currentVideo} allow="fullscreen" frameBorder="0" ></iframe>
        </div>
    );
};

export default FullScreenVideo;