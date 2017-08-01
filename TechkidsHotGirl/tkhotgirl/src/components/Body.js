import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Masonry from 'react-masonry-component';

import Image from './Image';

const masonryOptions = {
  // set itemSelector so .grid-sizer is not used in layout
  itemSelector: '.Image',
  // use element for option
  columnWidth: '.Image',
  percentPosition: true
};

class Body extends Component {
  render() {

    const images = [
      {
        "id" : 1,
        "imageUrl" : "http://www.vatcss.info/TechKidsGirls/1.png",
        "view" : 857,
        "date" : "07/05/12",
        "plus" : 588,
        "posterAvatar" : "http://www.vatcss.info/TechKidsGirls/1.png",
        "posterName" : "Dzungggg",
        "posterTitle" : "HRC Photo",
        "content" : "Lorem ipsum dolor sit amet, te possim inimicus ius. Alii ullam at corper pri ad, per nulla luptatum te, in qui delenit nostrum. Nam ad labores."
      },
      {
        "id" : 2,
        "imageUrl" : "http://www.vatcss.info/TechKidsGirls/3.png",
        "view" : 857,
        "date" : "07/05/12",
        "plus" : 588,
        "posterAvatar" : "http://www.vatcss.info/TechKidsGirls/2.png",
        "posterName" : "Sannnn",
        "posterTitle" : "HRC Photo",
        "content" : "Lorem ipsum dolor sit amet, te possim inimicus ius. Alii ullam at corper pri ad, per nulla luptatum te, in qui delenit nostrum. Nam ad labores."
      }
    ];

    const childElements = images.map(function(element){
      return (
        <Image {...element} />
      );
    });

    return (
      <div className="Body">
        <div className="container">
          <Masonry
                className={'list-images'} // default ''
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
                {childElements}
            </Masonry>
        </div>
      </div>
    );
  }
}

export default Body;
