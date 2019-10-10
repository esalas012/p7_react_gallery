import React from 'react';

import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';

const MainContainer = (props) => {
  return(
    <div className="container">
      <h1>Photo Gallery</h1>
      <SearchForm onSearch={props.search} route={props.route}/>
      <MainNav />
      {
        (props.images.length>0)
          ?<PhotoContainer
            images={props.images}
            text={props.text}
          />
          :<li className="not-found">
            <h3>No Results Found</h3>
            <p>Your search did not return any results. Please try again.</p>
          </li>
      }

    </div>
  )

}

export default MainContainer;
