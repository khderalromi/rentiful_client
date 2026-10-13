"use client"
import Card from '@/components/Card';
import Header from '@/components/Header';
import LoadingComponent from '@/components/Loading'
import Not_Found from '@/components/Not_Found';
import { Property } from '@/state';
import { useGetManagerPropertiesQuery, useGetUserQuery } from '@/state/Auth/AuthSlice';
import React from 'react'

const Properties = () => {
  //const { data: authData } = useGetUserQuery();
     
  const {
    data:managerProperties,
    isLoading,
    isError
  } = useGetManagerPropertiesQuery()
  
  console.log(managerProperties)
  if (isLoading) { <LoadingComponent/>}
  (isError || !managerProperties) && <Not_Found/>
  return (
    <div className='p-2 md:p-5'>
      <Header 
        title= "My  Properties"
        subtitle='View and manage your property listings'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ltr'>
        {managerProperties?.data?.map((property: Property) => {
          return (
          
                      <Card
                        key={property._id}
                        property={property}
                        isFavorite = {false}
                        onFavoriteToggle={() => {}}
                        showFavoriteButton={false}
                        propertyLink={`/managers/properties/${property._id}`}
                      />
          )})
        }
      </div>
      {!managerProperties || managerProperties.length === 0 && (
        <Not_Found/>
      )}
    </div>
  )
}

export default Properties;
