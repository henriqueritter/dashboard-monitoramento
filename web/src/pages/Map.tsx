import React, {useEffect, useState} from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import mapMarker from '../images/truck-front.svg';

import './map.css';

import api from '../services/api';

interface ICar{
    id:number;
    prefix?:string;
    board:string;
    latitude:number;
    longitude: number;
    speed:number;
}

function Map(){

    const mapIcon=Leaflet.icon({
        iconUrl: mapMarker, 
        iconSize: [60,60], 
        iconAnchor:[22,55], 
        popupAnchor: [10, -50]
    });

    const [cars, setCars] = useState<ICar[]>([]);

    useEffect(() => {
        api.get('/').then((response)=>{
            setCars(response.data);
        });
    }, []);

    console.log(typeof cars);
    console.log(cars);

    return(
        <div id="page-map">
            <h1>Test</h1>
            <MapContainer 
                center={[-23.67, -46.50]}
                zoom={10}
                style={{width:"100%", height:"100%"}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {cars.map((car)=>{
                    return(
                        <Marker
                            key={car.id} 
                            position={[car.latitude, car.longitude]}
                            icon={mapIcon}
                        >
                            <Popup 
                                closeButton={false}
                                minWidth={24}
                                maxWidth={24}
                                className="map-popup"
                            >
                                <b>{car.prefix} {car.board} velocidade:{car.speed}</b>
                            </Popup>
                        </Marker>
                    );
                })}
                

            </MapContainer>
        </div>
    )
}

export default Map;