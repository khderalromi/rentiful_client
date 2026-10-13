"use client"
import Card from '@/components/Card';
import Header from '@/components/Header';
import LoadingComponent from '@/components/Loading'
import Not_Found from '@/components/Not_Found';
import { Property } from '@/state';
import { useGetTenantLeasesQuery, useGetUserQuery } from '@/state/Auth/AuthSlice';
import React from 'react'

const Residences = () => {
  const { 
      data: currentLeases, 
      isLoading,
      isError
     } = useGetTenantLeasesQuery();
     
  const currentTenantLeases = currentLeases?.data?.leases;
  console.log(currentTenantLeases)
  if (isLoading) { <Not_Found/>}
  (isError || !currentLeases) && <Not_Found/>
  return (
    <div className='p-2 md:p-5'>
      <Header 
        title= "Current Leases"
        subtitle='View and manage your current living spaces'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ltr'>
        {currentTenantLeases?.map((lease : any) => {
          return (
          
                      <Card
                        key={lease.property?._id}
                        property={lease?.property}
                        isFavorite = {true}
                        onFavoriteToggle={() => {}}
                        showFavoriteButton={false}
                        propertyLink={`/tenants/residences/${lease.property?._id}`}
                      />
          )})
        }
      </div>
      {!currentTenantLeases || currentTenantLeases.length === 0 && (
        <Not_Found/>
      )}
    </div>
  )
}

export default Residences;
