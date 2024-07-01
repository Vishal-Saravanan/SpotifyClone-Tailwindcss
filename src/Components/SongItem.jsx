import React, { useContext } from 'react';
import { playerContext } from '../Context/PlayerContext';

const SongItem = ({ name, image, desc, id }) => {
  const { playSongId } = useContext(playerContext);

  const handlePlaySong = () => {
    playSongId(id); // Pass the id to playSongId function
  };

  return (
    <div onClick={handlePlaySong} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded' src={image} alt='' />
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  );
};

export default SongItem;
