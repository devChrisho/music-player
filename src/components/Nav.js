import { FaMusic } from 'react-icons/fa';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1>iMusic</h1>
      <button
        onClick={() => {
          setLibraryStatus(!libraryStatus);
        }}
      >
        Library
        <FaMusic />
      </button>
    </nav>
  );
};

export default Nav;
