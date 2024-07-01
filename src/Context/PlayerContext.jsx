import React, { createContext, useRef, useState, useEffect } from 'react';
import { songsData } from '../assets/assets';

export const playerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playSongId = async (id) => {
        await pause(); // Pause the current track
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    };

    useEffect(() => {
        const updateTime = () => {
            const currentMinute = Math.floor(audioRef.current.currentTime / 60);
            const currentSecond = Math.floor(audioRef.current.currentTime % 60);
            const totalMinute = Math.floor(audioRef.current.duration / 60);
            const totalSecond = Math.floor(audioRef.current.duration % 60);

            setTime({
                currentTime: {
                    minute: currentMinute,
                    second: currentSecond
                },
                totalTime: {
                    minute: totalMinute,
                    second: totalSecond
                }
            });

            // Calculate progress percentage for the seek bar
            const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            seekBar.current.style.width = `${progress}%`;
        };

        audioRef.current.ontimeupdate = updateTime;

        return () => {
            audioRef.current.ontimeupdate = null;
        };
    }, [playStatus]);

    const previous = async () => {
        if (track.id > 0) {
            await pause(); // Pause the current track
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await pause(); // Pause the current track
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const seekSong = (e) => {
        const newTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playSongId,
        previous,
        next,
        seekSong
    };

    return (
        <playerContext.Provider value={contextValue}>
            {props.children}
        </playerContext.Provider>
    );
};

export default PlayerContextProvider;
