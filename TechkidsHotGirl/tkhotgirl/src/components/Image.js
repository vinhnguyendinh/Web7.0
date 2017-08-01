import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Image extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 Image">
          <img className="img-responsive" src={this.props.imageUrl} alt={this.props.posterName} />
          <div className="Image_info">
            <h3>{this.props.posterName}</h3>
            <p>{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Image;
