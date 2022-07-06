import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../auth/LoginFormModal';
import './Header.css';

import { searchResultsType } from '../../store/search';

import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [searchString, setSearchString] = useState('');
  const [divStyle, setDivStyle] = useState({ visibility: 'hidden' });
  const searchResults = useSelector((state) => Object.values(state?.search));
  // const searchResultsArr = Object.assign([], searchResults);

  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$ search results****', searchResults);
  console.log(
    '################ searchResultssearchResultssearchResults',
    searchResults[0]?.Events[0]?.name
  );

  const tester = searchResults[0]?.Events;

  useEffect(() => {
    if (searchString !== '') {
      dispatch(searchResultsType(searchString));
    }
  }, [dispatch, searchString]);

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__icon"
          src="https://cdn.discordapp.com/attachments/920377762068447282/989333770492584007/OpenMenu_1.png"
          alt=""
        />
      </Link>

      <div className=" header__center">
        <div>
          <input
            placeholder="Search experiences"
            type="search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="navbar-search-input-field"
            onFocus={(e) => setDivStyle({ visibility: 'visible' })}
          />
          <SearchIcon />
          <div style={divStyle} className="search-results-parent-div">
            {searchString !== '' &&
              searchResults?.map((type) => (
                <div className="name-in-results">
                  {type.Events.map((event, index) => (
                    <a
                      key={event.id}
                      href={`/events/${event?.id}`}
                      className="a-link-single-result"
                    >
                      <div>{event.name}</div>
                    </a>
                  ))}

                  {/* {type?Events?.map((event) => (
                        <div>{event.name}</div>
                      ))} */}
                  {console.log('!!!!!!!!!!!!!!!!!!!', type)}

                  {/* {`${type?.Events[0]?.name} `} */}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="header__right">
        <Link to="/events/new" style={{ textDecoration: 'none' }}>
          <p className="nav-host">Become a host</p>
        </Link>
        <LanguageIcon />
        <ProfileButton user={user} />
      </div>
    </div>
  );
}

// function Header({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = <ProfileButton user={sessionUser} />;
//   } else {
//     sessionLinks = (
//       <>
//         <LoginFormModal />
//         <NavLink to="/signup">Sign Up</NavLink>
//       </>
//     );
//   }

//   return (
//     <ul>
//       <li>
//         <NavLink exact to="/">
//           Home
//         </NavLink>
//         {isLoaded && sessionLinks}
//       </li>
//     </ul>
//   );
// }

export default Header;
