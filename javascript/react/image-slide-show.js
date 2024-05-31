import React from "react";

class ImagesSlider extends React.Component {
  state = { images: [], index: 0 };

  imageBtn = e => {
    this.setState({ index: Number(e.target.value) });
  };
  swapImage = e => {
    let index = this.state.index;
    if (e.target.name === "next") {
      index = index >= this.state.images.length ? 0 : (index += 1);
    } else {
      index = index <= 0 ? this.state.images.length : (index -= 1);
    }
    this.setState({ index });
  };
  componentWillMount() {
    const house = this.props.house;
    const images = house.images && house.images.split(",");
    this.setState({ images });
  }

  render() {
    const { images, index } = this.state;
    if (!images || !images[0]) return <p className="no-images">No images...</p>;

    return (
      <div id="images-slideshow">
        <span id="image-number">
          {index} / {images.length}
        </span>
        <img src={images[index]} alt={images[index]} className="image-item" />
        <button id="previous" name="previous" onClick={this.swapImage}>
          &#10094;
        </button>
        <button id="next" name="next" onClick={this.swapImage}>
          &#10095;
        </button>
        <div id="dots">
          {images.map((el, i) => {
            let classN = i === index ? "dot active" : "dot";
            return (
              <button
                className={classN}
                value={i}
                onClick={this.imageBtn}
                key={i}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ImagesSlider;
