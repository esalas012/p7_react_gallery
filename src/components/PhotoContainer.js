import React from 'react';

//imports photo component
import Photo from './Photo';

//passes the url and key props to the Photo Component and displays results.
const PhotoContainer = (props) => {
  let results= props.images;
  let photos = results.map(photo =>{
      return(
        <Photo
          url={`https://farm66.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`}
          key={photo.id}
        />
      )
    });

  return (
    <div className="photo-container">
        <h2>{props.text}</h2>
        <ul>
          {photos}
        </ul>

    </div>
  );
}

export default PhotoContainer;
