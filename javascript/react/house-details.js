import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import ImagesSlider from "./image-slide-show";
import Util from "../../utility";

class HouseDetails extends React.Component {
  state = {
    house: {},
    LOADING: "Loading",
    ERROR: "",
    dateFormat: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    Util.fetch(`http://localhost:8080/api/houses/${id}`)
      .then((house) => this.setState({ house, LOADING: "" }))
      .catch((err) => this.setState({ ERROR: err.message, LOADING: "" }));
  }

  render() {
    const { house, ERROR, dateFormat } = this.state;
    if (ERROR) return <p>{ERROR}</p>;
    if (!house.id) return <p>Loading...</p>;

    return (
      <div id="house-details">
        <ImagesSlider {...this.state} />

        <div id="house-map">
          <YMaps query={{ lang: "en-US" }}>
            <Map
              width="100%"
              height="200px"
              defaultState={{
                center: [
                  house.location_coordinates_lat.toFixed(2),
                  house.location_coordinates_lng.toFixed(2),
                ],
                zoom: 5,
              }}>
              <Placemark
                geometry={[house.location_coordinates_lat, house.location_coordinates_lat]}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                properties={{
                  hintContent: house.title,
                  balloonContent: `<span>€${house.price_value}</span>`,
                }}
              />
            </Map>
          </YMaps>
        </div>
      </div>
    );
  }
}

export default HouseDetails;
