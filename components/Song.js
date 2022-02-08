import { useRecoilState } from 'recoil';
import { currenttrackidState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currenttrackidState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      onClick={playSong}
      className='rounded-lg cursor-pointer hover:bg-gray-700 py-4 px-5 text-gray-500 grid grid-cols-2'
    >
      <div className='flex items-center space-x-4'>
        <p>{order + 1}</p>
        <img
          className='h-10 v-10'
          src={track?.track?.album.images[0].url}
          alt=''
        />
        <div>
          <p className='w-36 lg:w-64 truncate'>{track.track.name}</p>
          <p className='w-40'>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className='md:ml-0 justify-between ml-auto flex items-center'>
        <p className='hidden md:inline'>{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
