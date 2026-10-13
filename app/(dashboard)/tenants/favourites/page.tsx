"use client"
import Card from '@/components/Card';
import Header from '@/components/Header';
import LoadingComponent from '@/components/Loading'
import Not_Found from '@/components/Not_Found';
import { Property } from '@/state';
import { useGetUserQuery } from '@/state/Auth/AuthSlice';
import React from 'react'

const Favourites = () => {
  const { 
      data: authData, 
      isLoading,
      isError
     } = useGetUserQuery();
     
  const favouriteProperties = authData?.data.userInfo?.favourites;
  console.log(favouriteProperties)
  if (isLoading) { <Not_Found/>}
  (isError || !authData) && <Not_Found/>
  return (
    <div className='p-2 md:p-5'>
      <Header 
        title= "Favourited  Properties"
        subtitle='Browse and manage your saved property listings'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ltr'>
        {favouriteProperties?.map((property: Property) => {
          return (
          
                      <Card
                        key={property._id}
                        property={property}
                        isFavorite = {true}
                        onFavoriteToggle={() => {}}
                        showFavoriteButton={false}
                        propertyLink={`/tenants/residences/${property._id}`}
                      />
          )})
        }
      </div>
      {!favouriteProperties || favouriteProperties.length === 0 && (
        <Not_Found/>
      )}
    </div>
  )
}

export default Favourites
