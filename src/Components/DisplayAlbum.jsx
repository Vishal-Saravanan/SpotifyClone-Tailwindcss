import React, { useContext } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { albumsData, assets, songsData } from '../assets/assets';
import { playerContext } from '../Context/PlayerContext';

const DisplayAlbum = () => {
    const { id } = useParams();
    const albumData = albumsData[id];  // Fetching album data by its id
    const { playSongId } = useContext(playerContext);  // Corrected useContext usage

    return (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={albumData.image} alt="Album Cover" />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5' src={assets.spotify_logo} alt="Spotify Logo" />
                        <b>Spotify</b>
                        • 1,323,154 likes
                        • <b>50 songs,</b>
                        about 2hr 30 min
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p className='col-span-1'><b className='mr-4'>#</b>Title</p>
                <p className='col-span-1'>Album</p>
                <p className='col-span-1 hidden sm:block'>Date Added</p>
                <div className='col-span-1 flex justify-center'>
                    <img className='w-4' src={assets.clock_icon} alt="Clock Icon" />
                </div>
            </div>
            <hr />
            {
                songsData.map((item, index) => (
                    <div onClick={() => playSongId(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer'>
                        <div className='col-span-1 flex items-center'>
                            <p className='text-white'>
                                <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                                <img className='inline w-10 mr-5' src={item.image} alt="" />
                                {item.name}
                            </p>
                        </div>
                        <p className='col-span-1'>{albumData.name}</p>
                        <p className='col-span-1 text-[15px] hidden sm:block'>5 days ago</p>
                        <p className='col-span-1 text-[15px] text-center'>{item.duration}</p>
                    </div>
                ))
            }
        </>
    );
};

export default DisplayAlbum;
