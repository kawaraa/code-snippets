import React from "react";
import { YMaps, Map, Placemark, GeoObject } from "react-yandex-maps";

class HousesMap extends React.Component {
  state = { center: [40.36, 20.9], zoom: 3 };

  render() {
    const { houses, LOADING, ERROR } = this.props;
    if (LOADING) return <p>{LOADING}</p>;
    if (ERROR) return <p className="error">{ERROR}</p>;
    if (!houses || !houses[0]) return <p className="no-item">No Results...</p>;

    return (
      <div id="maps">
        <YMaps query={{ lang: "en-US" }}>
          <Map width="100%" height="60vh" defaultState={this.state}>
            {houses.map((el, i) => {
              let images = el.images.split(",");
              return (
                <Placemark
                  key={i}
                  geometry={[
                    el.location_coordinates_lat,
                    el.location_coordinates_lat
                  ]}
                  modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                  properties={{
                    hintContent: el.title,
                    balloonContent: `
                <a href="/houses/${el.id}">€${el.price_value}</a>
                <img src=${images[0]}>`
                  }}
                />
              );
            })}
          </Map>
        </YMaps>
      </div>
    );
  }
}

export default HousesMap;

{
  /* 
  // searchControlProvider: "yandex#search"

  <Placemark
  geometry={[52.368, 4.9036]}
  modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
  properties={{
    iconContent: "1",
    hintContent: "Title",
    balloonContent: `
                <p>vuvivibhibhibi</p>
                <img src="https://cdn-v3.huislijn.nl/objects/9cd7395abed6916f0f45e294ebc7e74cf651702c/afe4738d0015f41f3615a37e7654fb41b1ba9b0f/m.jpg"
                height="352" width="352">`
  }}
// options={{
//   iconLayout: "default#image",
//   iconImageHref: "images/myIcon.gif",
//   iconImageSize: [30, 42],
//   iconImageOffset: [-3, -42]
// }}
/> */
}
