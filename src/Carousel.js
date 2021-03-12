import { Component } from "react";

class Carousel extends Component {
  state = { active: 0 };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({active: +e.target.dataset.index}) // + symbol is used to convert string to a number
  }

  render() {
    const { active } = this.state; // state is mutable
    const { images } = this.props; // props is coming from parents and is read-only
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" className="carousel-bigger"/>
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              data-index={index}
              className={`carousel-smaller-img ${index === active ? "active" : ""}`}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
