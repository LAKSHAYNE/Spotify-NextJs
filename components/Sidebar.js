import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import SpotifyAPI from '../lib/spotify';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylist] = useState([]);
  const { data: session, status } = useSession();
  const [playlistId, setPlaylistId] = useRecoilState(playlistState);
  //console.log(session);
  useEffect(() => {
    if (SpotifyAPI.getAccessToken()) {
      //console.log('ushdiuwhd >>>>', SpotifyAPI.getAccessToken());
      SpotifyAPI.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, SpotifyAPI]);

  return (
    <div className='pb-36 lg:text-xs text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>Library</p>
        </button>
        <hr className='border-t-[0.1px] border-zinc-900' />
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          <p>Liked Song</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p>Your episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-zinc-900' />
        {playlists?.map((item) => {
          return (
            <p
              key={item.id}
              onClick={() => setPlaylistId(item.id)}
              className='hover:text-white cursor-pointer'
            >
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
