import React, { useEffect, useState } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import {EditControl} from 'react-leaflet-draw';
import "leaflet-draw/dist/leaflet.draw.css";  
import { Link } from "react-router-dom";

import api from "../services/api";

import truckIcon from "../images/truck-front.svg";
import locationIcon from "../images/location.svg";

import "../styles/pages/map.css";

// Import Interfaces
import { ICar } from "../dtos/ICar";
import { ILocation } from "../dtos/ILocation";

import { useInterval } from "../hooks/useInterval";

function Form() {
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

  const [mapLayer, setMapLayer]=useState([]);

  // @ts-ignore
  const _created = (e)=>{
    
    console.log(e);
    
    const {layerType,layer}=e;
    const {_leaflet_id}=layer;

    const latLngs=layer.getLatLngs()[0];

    const latIni=latLngs[0].lat;
    const latEnd=latLngs[2].lat;

    const lngIni=latLngs[0].lng;
    const lngEnd=latLngs[2].lng;

    
    const pos={
      latIni,latEnd,lngIni,lngEnd
    }
    //@ts-ignore
    setMapLayer(pos);
//    setMapLayer(layers=>[...layers,{id:_leaflet_id,latlngs:layer.getLatLngs()[0]}]);


  };




  return (
    <div id="page-map">
      {/* TODO Make header a React Component */}

      <header>
        <Link to="/"> {'< Voltar'} </Link>

      </header>

      <MapContainer
        center={[-23.67, -46.5]}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
      >
        <FeatureGroup>
          {/** @ts-ignore */  }
          <EditControl position="topright"
           onCreated={_created} draw={{circle:false,
            polygon:false,marker:false,polyline:true,
            circlemarker:false}}
     />
        </FeatureGroup>
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />


      </MapContainer>
      <div>
          <pre className="text-left">{JSON.stringify(mapLayer)}</pre>
          </div>
    </div>

  );
}

export default Form;
