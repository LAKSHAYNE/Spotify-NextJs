import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currenttrackidState } from '../atoms/songAtom';
import useSpotify from './useSpotify';

function useSonginfo() {
  const spotifyApi = useSpotify();
  const [songInfo, setSongInfo] = useState(null);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currenttrackidState);
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}

export default useSonginfo;
