"use client"
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppSelector } from '@/state/redux';
import { useGetPropertiesQuery } from '@/state/Auth/AuthSlice';
import { Property } from '@/state';
import { BounceLoader, ClipLoader, DotLoader, GridLoader, MoonLoader, PuffLoader } from "react-spinners";
import { motion } from "framer-motion";
import MapFallback from './MapFallback';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
console.log(mapboxgl.accessToken)
const Map = () => {

  //const mapRef = useRef()
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const filters = useAppSelector((state) => state.global.filters);
  console.log(filters)
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const {
    data: properties,
    isLoading,
    isError,
    error: error
  } = useGetPropertiesQuery(filters);
  isError && console.log(error)
  properties && console.log(properties)

  useEffect(() => {
    if (isLoading || isError || !properties || !mapContainerRef.current) return ;
  
    if (mapRef.current) {
      mapRef.current.remove();
    }
    const map = new mapboxgl.Map({
      container: mapContainerRef?.current,
      style: "mapbox://styles/khder99/cmubekbqi006c01sje3o828gm",
      center:
        filters?.coordinates?.[0] !== null &&
          filters?.coordinates?.[1] !== null
          ? filters.coordinates
          : [36.2765, 33.5138],
      zoom: 9
    })
    const propertiesData = properties?.data
    properties?.data?.forEach((property: Property) => {
      const marker = createPropertyMarker(property, map);
      const markerElement = marker.getElement();
      const path = markerElement.querySelector("path[fill='#3FB1CE']");
      if (path) path.setAttribute("fill", "#000000")
    })
    const resizeMap = () => setTimeout(() => map.resize(), 700);
    resizeMap()
    return () => map.remove()
  },[properties, filters])

//[isloading, isError,properties, filter.coordinates]
  if (isLoading) return <PuffLoader color="#010302" />
  if (isError || !properties || properties.data.length == 0) return (
    <div className='basis-5/12 h-1/2 grow relative'>
      <MapFallback onRetry={() => window.location.reload()} />
    </div>
  );
  return (
    <div className='basis-5/12 h-screen grow relative rounded-xl'>
      <div
        className='map-container rounded-xl '
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "100%"
        }}
      > </div>


    </div>
  )
}

const createPropertyMarker = (property: Property | any, map: mapboxgl.Map) => {
  const Marker = new mapboxgl.Marker()
    .setLngLat([
      property.locationId.location.coordinates[0],
      property.locationId.location.coordinates[1]
    ])
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `
       <div class="marker-popup">
            <div class="marker-popup-image-container">
              ${property.photoUrls[0] ? `<img src="${property.photoUrls[0]}" class="marker-popup-image" />` : `<div class="marker-popup-image fallback-n"></div>`}
            </div>
            <div class="marker-popup-content">
              <a href="/search/${property._id}" target="_blank" class="marker-popup-title">${property.name}</a>
              <p class="marker-popup-price">$${property.pricePerMonth} <span class="marker-popup-unit"> /month </span></p>
            </div>
          </div>
          `
      )
    )
    .addTo(map);
  return Marker;
}

export default Map
