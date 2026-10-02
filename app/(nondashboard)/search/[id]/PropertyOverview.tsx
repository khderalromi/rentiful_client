import { useGetPropertyQuery } from '@/state/Auth/AuthSlice';
import { MapPin, Star } from 'lucide-react';
import React from 'react'

const PropertyOverview = ({ propertyId }: PropertyOverviewProps) => {
  const {
    data: property,
    isLoading,
    isError
  } = useGetPropertyQuery({ propertyId });
  console.log(property)
  if (isLoading) return <div>Loading...</div>
  if (isError || !property) return <div>Error fetching property details</div>
  return (
    /*Headers*/
    <div className='mb-4'>
      <div className='text-sm text-gray-500 mb-1'>
        {property.data.locationId?.country} / {property.data.locationId?.state} / {" "}
        <span className='font-semibold text-gray-600'>
          {property.data.locationId?.city}
        </span>
      </div>
      <h1 className='text-3xl font-bold my-5'>{property.data?.name}</h1>
      <div className='flex justify-between items-center'>
        <span className='flex items-center text-gray-500'>
          <MapPin className='w-4 h-4 mr-1 text-gray-700' />
          {property.data?.loactionId?.city} , {property.data?.locationId?.state}, {" "}
          {property.data?.locationId?.country}
        </span>
        <div className='flex justify-between items-center gap-3'>
          <span className='flex items-center text-yellow-500'>
            <Star className='w-4 h-4 mr-1 fill-current' />
            {property.data?.Averageratings} ({property.data?.numberOfReviews}{" "}
            Reviews)
          </span>
          <span className='text-green-600'>Verified Listings</span>
        </div>
      </div>

      {/*Details*/}
      <div className='border border-primary-200 rounded-xl p-6 mb-6'>
        <div className='flex justify-between items-center gap-4 px-5'>
          <div className='text-sm text-gray-500'>Monthly Rent</div>
          <div className='font-semibold'>
            ${property.data?.pricePerMonth}
          </div>


          <div className='border-l border-gray-300 h-10'></div>
          <div>
            <div className='text-sm text-gray-500'>Bedrooms</div>
            <div className='font-semibold'>{property.data?.beds} bd</div>
          </div>

          <div className='border-l border-gray-300 h-10'></div>
          <div>
            <div className='text-sm text-gray-500'>Bathrooms</div>
            <div className='font-semibold'>{property.data?.baths} ba</div>
          </div>

          <div className='border-l border-gray-300 h-10'></div>
          <div>
            <div className='text-sm text-gray-500'>squareFeet</div>
            <div className='font-semibold'>{property.data?.squareFeet} sq ft</div>
          </div>
        </div>
      </div>

      {/*Summary*/}
      <div className='my-16'>
        <h2 className='text-xl font-semibold mb-5'> About {property.data?.name}</h2>
        <p className='text-gray-500 leading-7'>
          {property.data?.description}
        </p>
      </div>
    </div>


  );
};

export default PropertyOverview;
