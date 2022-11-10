import React, { useEffect, useState } from "react";
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import EVENTS from "./firebase/events";
import { logFirebaseEvent } from "./firebase/logFirebaseEvent";
import { collection, onSnapshot } from "firebase/firestore";
import db from "./firebase/firebaseConfig";
import { Bars } from "react-loader-spinner";

function App({ isDarkTheme, setIsDarkTheme }) {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = React.useState(data());
  const [currentSong, setCurrentSong] = React.useState(songs[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [songInfo, setSongInfo] = React.useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = React.useState(false);

  const audioRef = React.useRef(null);

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    // @ts-ignore
    if (isPlaying) audioRef?.current?.play();
  };

  const collectionRef = collection(db, "songs");

  // log to firebase tracker when app loads
  useEffect(() => {
    logFirebaseEvent(EVENTS.VIEW.LANDING, "");
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(collectionRef, (querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      setSongs(items);
      setIsLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div
      className={`App ${libraryStatus ? "library-active" : ""}`}
      id={isDarkTheme ? "darkMode" : "lightMode"}>
      {!isLoading ? (
        <>
          <Nav
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
            setIsDarkTheme={setIsDarkTheme}
            isDarkTheme={isDarkTheme}
          />
          <Song currentSong={currentSong} isPlaying={isPlaying} />
          <Player
            currentSong={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioRef={audioRef}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
          />
          <Library
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            libraryStatus={libraryStatus}
          />
          <audio
            //this event occurs when the time is updated
            onTimeUpdate={(event) =>
              timeUpdateHandler(event, songInfo, setSongInfo)
            }
            //this event occurs when meta data is loaded
            onLoadedMetadata={(event) =>
              timeUpdateHandler(event, songInfo, setSongInfo)
            }
            //this passes this element as audioRef like document.querySelector
            ref={audioRef}
            src={currentSong.audio}
            onEnded={songEndHandler}
          />
        </>
      ) : (
        <div
          style={{
            margin: "0 auto",
            marginTop: "50%",
          }}>
          <Bars color={isDarkTheme ? "#81789b" : "#606060"} />
        </div>
      )}
    </div>
  );
}

export default App;

// Helper function
const timeUpdateHandler = (event, songInfo, setSongInfo) => {
  // !exp currentTime and duration are audio element built in attributes (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
  const currentTime = event.target.currentTime;
  const duration = event.target.duration;

  // calculate percentage
  const roundedCurrent = Math.round(currentTime);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration) * 100);

  setSongInfo({
    ...songInfo,
    currentTime,
    duration,
    animationPercentage: animation,
  });
};
