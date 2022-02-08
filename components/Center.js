import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListListState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';
const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function Center() {
  const { data: session } = useSession();
  //console.log(session);
  const [color, setColor] = useState('');
  const [opa, setOpa] = useState('');
  const playlistId = useRecoilValue(playlistState);
  const [playlistlist, setPlaylistlist] = useRecoilState(playListListState);
  const spotifyApi = useSpotify();
  useEffect(() => {
    setColor(shuffle(colors).pop());
    //setOpa('bg-' + (color.slice(0, -3) + '300').slice(5));
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylistlist(data.body);
      })
      .catch((err) => console.log('Something went wrong!!', err));
  }, [spotifyApi, playlistId]);

  console.log(playlistlist);

  /* useEffect(() => {
    setOpa('bg-' + (color.slice(0, -3) + '300').slice(5));
  }, [color]); */
  // console.log(opa);
  return (
    <div className='flex-grow overflow-y-scroll h-screen scrollbar-hide'>
      <header className='absolute top-5 right-8'>
        <div
          onClick={() => signOut()}
          className={`bg-black bg-opacity-40 text-white cursor-pointer rounded-full ${opa} p-1 pr-2 flex items-center space-x-3 opacity-90 hover:opacity-80`}
        >
          <img
            className='rounded-full w-10 h-10'
            src={session?.user.image}
            alt=''
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className='h5 w-5' />
        </div>
      </header>
      <section
        className={`p-8 flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}
      >
        <img
          className='shadow-2xl w-44 h-44'
          src={playlistlist?.images?.[0]?.url}
        />
        <div>
          <p>Playlist</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
            {playlistlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
