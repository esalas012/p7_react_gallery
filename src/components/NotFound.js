import React from 'react';
import SearchForm from './SearchForm';
import MainNav from './MainNav';

const NotFound = (props) => {
  return(
    <div className="container">
      <h1>Photo Gallery</h1>
      <SearchForm onSearch={props.search} route={props.route}/>
      <MainNav />
      <li className="not-found">
        <h3>Sorry the page you were looking for was not found</h3>
        <p>Please try again.</p>
      </li>
    </div>
  )
}

export default NotFound;
