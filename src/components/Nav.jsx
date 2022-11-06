import React from "react";
import { FaMusic } from "react-icons/fa";
import { EVENTS, logFirebaseEvent } from "../firebase";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1>iMusic</h1>
      <button
        onClick={() => {
          logFirebaseEvent(EVENTS.CLICK.LIBRARY_ICON);
          setLibraryStatus(!libraryStatus);
        }}>
        Library
        <FaMusic />
      </button>
    </nav>
  );
};

export default Nav;
