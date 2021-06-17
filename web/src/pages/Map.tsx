import React, { useEffect, useState } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

import api from "../services/api";

import truckIcon from "../images/truck-front.svg";
import locationIcon from "../images/location.svg";

import "../styles/pages/map.css";

// Import Interfaces
import { ICar } from "../dtos/ICar";
import { ILocation } from "../dtos/ILocation";

import { useInterval } from "../hooks/useInterval";

function Map() {
  const mapTruckIcon = Leaflet.icon({
    iconUrl: truckIcon,
    iconSize: [60, 60],
    iconAnchor: [22, 55],
    popupAnchor: [10, -50],
  });

  const mapLocationIcon = Leaflet.icon({
    iconUrl: locationIcon,
    iconSize: [60, 60],
    iconAnchor: [22, 55],
    popupAnchor: [10, -50],
  });

  const [cars, setCars] = useState<ICar[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);

  useEffect(() => {
    api.get("/cars").then((response) => {
      setCars(response.data);
    });
    api.get("/locations").then((response) => {
      setLocations(response.data);
    });
  }, []);

  useInterval(() => {
    api.get("/cars").then((response) => {
      setCars(response.data);
    });
  }, 30000);

  return (
    <div id="page-map">
      {/* TODO Make header a React Component */}

      <header>
        <Link to="/">Mapa</Link>
        <Link to="/">Painel</Link>
        <Link to="/">Alertas</Link>
        <Link to="/form">Cadastro</Link>
      </header>

      <MapContainer
        center={[-23.67, -46.5]}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Show locations */}
        {locations.map((location) => {
          return (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={mapLocationIcon}
            >
              <Popup
                closeButton={false}
                minWidth={24}
                maxWidth={200}
                className="map-popup"
              >
                <b>{location.description}</b>
              </Popup>
            </Marker>
          );
        })}
        {/* Show cars */}
        {cars.map((car) => {
          return (
            <Marker
              key={car.id}
              position={[car.latitude, car.longitude]}
              icon={mapTruckIcon}
            >
              <Popup
                closeButton={false}
                minWidth={24}
                maxWidth={200}
                className="map-popup"
              >
                <b>
                  {car.prefix} {car.board} velocidade:{car.speed}
                </b>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
