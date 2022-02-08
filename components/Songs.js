import { useRecoilState } from 'recoil';
import { playListListState } from '../atoms/playlistAtom';
import Song from './Song';

function Songs() {
  const playlist = useRecoilState(playListListState);
  //console.log(playlist);
  //console.log(playlist);
  return (
    <div className='px-6 flex flex-col mt-3 space-y-2 pb-28 text-white'>
      {playlist?.[0]?.tracks?.items?.map((track, i) => {
        console.log('track>>>>>', track);
        return <Song key={track.track.id} track={track} order={i} />;
      })}
    </div>
  );
}

export default Songs;
