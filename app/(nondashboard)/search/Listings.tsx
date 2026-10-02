import Card from '@/components/Card';
import CardCompact from '@/components/CardCompact';
import { Property } from '@/state';
import { useAddFavouritePropertyMutation, useGetPropertiesQuery, useGetUserQuery, useRemoveFavouritePropertyMutation } from '@/state/Auth/AuthSlice';
import { useAppSelector } from '@/state/redux';
import { filter } from 'lodash';
import React from 'react'

const Listings = () => {
    
    const { data: authData } = useGetUserQuery();
    const userInfo = authData?.user;
    const [addFavourite] = useAddFavouritePropertyMutation();
    const [removeFavourite] = useRemoveFavouritePropertyMutation();
    const viewMode = useAppSelector((state) => state.global.viewMode)
    const filters = useAppSelector((state) => state.global.filters)
    console.log(authData)
     const {
        data: properties,
        isError,
        isLoading
    } = useGetPropertiesQuery(filters);
    console.log(authData?.data)
    //console.log(properties)
    const handleFavouriteToggle = async (propertyId :  string) => {
        if (!authData) return ;
        console.log("000")
        const isfavorite = authData?.data.userInfo?.favourites.some(
          (fav : Property) => fav._id === propertyId
        );

        if (isfavorite) {
          console.log("11111")
        await removeFavourite({propertyId})
    } else {console.log("22222")
      console.log(authData)
      await addFavourite({propertyId})
    }
  }

  if (isLoading) return <div>....loading</div>;
  if (isError || !properties) return <div>failed to fetch data</div>
  return (
    <div className='w-full'>
      <h3 className='text-sm px-4 font-bold'>
        {properties.data.length}
        <span className='text-gray-700 font-normal'>
          Places in {filters?.city}
        </span>
      </h3>
      <div className='flex'>
        <div className='p-4 w-full'>
          {properties?.data.map((property:Property) => 
            viewMode === "grid" ? 
            <Card
              key={property._id}
              property={property}
              isFavorite = {
                authData.data?.userInfo?.favourites.some(
                  (fav:Property) => fav._id === property._id
                ) || false
              }
              onFavoriteToggle={() => handleFavouriteToggle(property._id)}
              showFavoriteButton={!!authData}
              propertyLink={`search/${property._id}`}
            />
            : 
            <CardCompact
              key={property._id}
              property={property}
              isFavorite = {
                authData.data?.userInfo?.favourites.some(
                  (fav:Property) => fav._id === property._id
                ) || false
              }
              onFavoriteToggle={() => handleFavouriteToggle(property._id)}
              showFavoriteButton={!!authData}
              propertyLink={`search/${property._id}`}
            />
            
          )}
        </div>
      </div>
    </div>
   
  )
}

export default Listings
