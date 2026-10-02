
import { useGetPropertyQuery } from '@/state/Auth/AuthSlice';
import { Compass, MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const PropertyLocation = ({ propertyId }: PropertyDetailsProps) => {
    const {
        data: property,
        isLoading,
        isError
    } = useGetPropertyQuery({ propertyId });
    console.log(property)

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (isLoading || isError || !property || !mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef?.current,
            style: "mapbox://styles/khder99/cmubekbqi006c01sje3o828gm",
            center:[
            property.data?.locationId?.location?.coordinates?.[0],
            property.data?.locationId?.location?.coordinates?.[1]
            ],
            zoom: 14
        });
        const marker = new mapboxgl.Marker()
            .setLngLat([
                property.data?.locationId?.location?.coordinates?.[0],
                property.data?.locationId?.location?.coordinates?.[1]
            ]).addTo(map);
         const markerElement = marker.getElement();
            const path = markerElement.querySelector("path[fill='#3FB1CE']");
            if (path) path.setAttribute("fill", "#000000")

        
        return () => map.remove()
    }, [property, isError, isLoading]);

    if (isLoading) return <div>Loading...</div>
    if (isError || !property) return <div>Error fetching property details</div>

    return (
        <div className='py-16'>
            <h3 className='text-xl font-semibold text-primary-800 dark:text-primary-100'>
                Map And Location
            </h3>
            <div className='flex justify-between items-center text-sm text-primary-500 mt-2'>
                <div className='flex items-center text-gray-500'>
                    <MapPin className='w-4 h-4 text-gray-700'/>
                    Property Address
                    <span className='ml-2 font-semibold text-gray-700'>
                        {property.data?.locationId?.city || "Address Not Availabl"}
                    </span>
                </div>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(
                    property.data?.locationId?.city || ""
                )}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex justify-between items-center hover:underline gap-2 text-primary-700'
                >
                    <Compass className='w-4 h-4'/>
                    Get Direction 
                </a>
            </div>
            <div className='relative mt-4 h-[300px] rounded-lg overflow-hidden'
                ref={mapContainerRef}
            />
        </div>
    );
};

export default PropertyLocation;
