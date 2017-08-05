import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Masonry from 'react-masonry-component';

import Image from './Image';
import $ from 'jquery';

const masonryOptions = {
  // set itemSelector so .grid-sizer is not used in layout
  itemSelector: '.Image',
  // use element for option
  columnWidth: '.Image',
  percentPosition: true
};

class Body extends Component {
  constructor() {
    super();
    this.state = {
      images        : [],
      displayImages : [],
      pageNo        : 1,
      isLoading     : false,
      searchString  : ''
    }

    this.searchFor = this.searchFor.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
    this.requestNextPage = this.requestNextPage.bind(this);

  }

  componentDidMount() {
    this.requestNextPage();
    setInterval(() => {
      this.requestNextPage();
    }, 5000);

    $(window).on('scroll', this.checkScroll.bind(this));

    setTimeout(() => {
      this.searchFor('hahhaa');
    }, 2000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchString != this.props.searchString) {
      this.searchFor(nextProps.searchString);
    }
  }

  searchFor(searchString) {
    var displayImages = this.state.images.filter((image) => {
      if (image.title.indexOf(searchString) > -1) return true;
      if (image.content.indexOf(searchString) > -1) return true;
      return false;
    });

    this.setState({
      displayImages : displayImages,
      searchString  : searchString,

    })
  }

  checkScroll() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
      if(!this.state.isLoading) this.requestNextPage();
    }
  }

  requestNextPage() {
    this.setState({
      isLoading: true
    });

    $.ajax({
      url: 'api/image/getAll/' + this.state.pageNo,
      type: 'get'
    }).done((data) => {

      setTimeout(() => {
        this.setState({
          images: this.state.images.concat(data),
          pageNo: this.state.pageNo+1
        });
      }, 500);

      this.searchFor(this.state.searchString);

    }).fail((err) => {
      console.error(err);
    }).always(() => {
      this.setState( {
        isLoading: false
      });
    });
  }

  render() {
    // const images = [
    //   {
    //     "id" : 1,
    //     "imageUrl" : "http://www.vatcss.info/TechKidsGirls/1.png",
    //     "view" : 857,
    //     "date" : "07/05/12",
    //     "plus" : 588,
    //     "posterAvatar" : "http://www.vatcss.info/TechKidsGirls/1.png",
    //     "posterName" : "Dzungggg",
    //     "posterTitle" : "HRC Photo",
    //     "content" : "Lorem ipsum dolor sit amet, te possim inimicus ius. Alii ullam at corper pri ad, per nulla luptatum te, in qui delenit nostrum. Nam ad labores."
    //   },
    //   {
    //     "id" : 2,
    //     "imageUrl" : "http://www.vatcss.info/TechKidsGirls/3.png",
    //     "view" : 857,
    //     "date" : "07/05/12",
    //     "plus" : 588,
    //     "posterAvatar" : "http://www.vatcss.info/TechKidsGirls/2.png",
    //     "posterName" : "Sannnn",
    //     "posterTitle" : "HRC Photo",
    //     "content" : "Lorem ipsum dolor sit amet, te possim inimicus ius. Alii ullam at corper pri ad, per nulla luptatum te, in qui delenit nostrum. Nam ad labores."
    //   }
    // ];

    const childElements = this.state.images.map(function(element){
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
            { this.state.isLoading && <div className="text-center"><img src="/loading.gif" alt="loading" /></div> }
        </div>
      </div>
    );
  }
}

export default Body;
