import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currenttrackidState, isPlayingState } from '../atoms/songAtom';
import useSonginfo from '../hooks/useSonginfo';
import useSpotify from '../hooks/useSpotify';
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { VolumeUpIcon } from '@heroicons/react/outline';
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { debounce } from 'lodash';

function Player() {
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currenttrackidState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSonginfo();
  //console.log(songInfo);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data?.body?.is_playing);
        });
      });
    }
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 300),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [session, spotifyApi, currenttrackidState]);

  return (
    <div
      className='h-24 bg-gradient-to-b from-black to-gray-900 text-white
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8
    '
    >
      <div className='flex items-center space-x-2'>
        <img
          className='hidden md:inline h-10 v-10'
          src={songInfo?.album?.images?.[0].url}
          alt=''
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon className='w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out' />
        <RewindIcon className='w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out' />
        {isPlaying ? (
          <PauseIcon
            className='w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out text-[#18D860]'
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className='w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out'
            onClick={handlePlayPause}
          />
        )}
        <FastForwardIcon className='w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out' />
        <ReplyIcon className='w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out' />
      </div>

      <div className='flex items-center space-x-3 md:space-x-4 justify-end p-5'>
        <VolumeDownIcon
          className='w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out'
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type='range'
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
          className='w-14 md:w-36 '
        />
        <VolumeUpIcon
          className='w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out'
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;
