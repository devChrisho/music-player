import React, { useEffect } from "react";
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import EVENTS from "./firebase/events";
import { logFirebaseEvent } from "./firebase/logFirebaseEvent";

function App({ isDarkTheme, setIsDarkTheme }) {
  // log to firebase tracker when app loads
  useEffect(() => {
    logFirebaseEvent(EVENTS.VIEW.LANDING, "");
  }, []);

  // !var States
  const [songs, setSongs] = React.useState(data());
  const [currentSong, setCurrentSong] = React.useState(songs[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [songInfo, setSongInfo] = React.useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = React.useState(false);

  // !exp Ref
  const audioRef = React.useRef(null);

  const timeUpdateHandler = (e) => {
    // !exp currentTime and duration are audio element built in attributes (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

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

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    // @ts-ignore
    if (isPlaying) audioRef?.current?.play();
  };

  return (
    <div
      className={`App ${libraryStatus ? "library-active" : ""}`}
      id={isDarkTheme ? "darkMode" : "lightMode"}>
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
        onTimeUpdate={timeUpdateHandler}
        //this event occurs when meta data is loaded
        onLoadedMetadata={timeUpdateHandler}
        //this passes this element as audioRef like document.querySelector
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
    </div>
  );
}

export default App;
