import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AmenityIcons, HighlightIcons } from '@/lib/constants';
import { formatEnumString } from '@/lib/utils';
import { useGetPropertyQuery } from '@/state/Auth/AuthSlice';
import { HelpCircle, MapPin, Star } from 'lucide-react';
import React from 'react'

const PropertyDetails = ({ propertyId }: PropertyDetailsProps) => {
  const {
    data: property,
    isLoading,
    isError
  } = useGetPropertyQuery({ propertyId });
  console.log(property)
  if (isLoading) return <div>Loading...</div>
  if (isError || !property) return <div>Error fetching property details</div>
  return (
    <div className='mb-6'>
        {/*Amenities*/}
        <div>
            <h2 className='text-xl font-semibold my-3'>Property Amenities</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {property.data?.amenities.map((amenity : AmenityEnum) => {
                    const Icon = AmenityIcons[amenity as AmenityEnum] || HelpCircle;
                    return (
                        <div 
                            key={amenity}
                            className='flex flex-col items-center border rounded-xl py-8 px-4'
                        >
                            <Icon className='w-8 h-8 mb2 text-gray-700' />
                            <span className='text-sm text-center text-gray-700'>
                                {formatEnumString(amenity)}
                            </span>
                        </div>
                    )

                    })
                }   
            </div>
        </div>

        {/*Highlights*/}
        
        <div className='mt-12 mb-16'>
            <h3 className='text-xl font-semibold text-primary-800'>
                HighLights
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {property.data?.highLights.map((highlight : HighlightEnum) => {
                    const Icon = HighlightIcons[highlight as HighlightEnum] || HelpCircle;
                    return (
                        <div 
                            key={highlight}
                            className='flex flex-col items-center border rounded-xl py-8 px-4'
                        >
                            <Icon className='w-8 h-8 mb2 text-primary-600 dark:text-primary-300' />
                            <span className='text-sm text-center text-primary-600 dark:text-primary-300'>
                                {formatEnumString(highlight)}
                            </span>
                        </div>
                    )

                    })
                }   
            </div>
        </div>
        
        {/*Tabs Section*/}
        <div>
            <h3 className='text-xl font-semibold text-primary-800 dark:text-primary-100 mb-5'>
                Fees and Policies
            </h3>
            <p className='text-sm text-primary-600 dark:text-primary-300 mt-2'>
                The fees blow are based on the property policies and may vary based on the lease agreement. 
                Please contact the property manager for more details.
            </p>
            <Tabs defaultValue="required-fees" className="mt-8 flex flex-col">
                <TabsList className='w-full grid grid-cols-3'>
                    <TabsTrigger value="required-fees">Required Fees</TabsTrigger>
                    <TabsTrigger value="pets">Pets</TabsTrigger>
                    <TabsTrigger value="parking">Parking</TabsTrigger>
                </TabsList>

                <TabsContent value="required-fees" className='w-1/3'>
                <p className='font-semibold mt-5 mb-2 border-b-2 border-primary-500 rounded-xl p-2'>one time move in fees</p>
                

                <div className='flex justify-between py-2 border-b-2 border-primary-500 rounded-xl p-2'>
                    <span className='text-primary-700 font-medium'>
                        Applcation Fee
                    </span>
                    <span className='text-primary-700 '>
                        {property.data?.applicationFee}
                    </span>
                </div>
                

                <div className='flex justify-between py-2 border-b-2 border-primary-500 rounded-xl p-2'>
                    <span className='text-primary-700 font-medium'>
                        Security Deposit
                    </span>
                    <span className='text-primary-700 '>
                        {property.data?.securityDeposit}
                    </span>
                </div>
            
                </TabsContent>

                <TabsContent value="pets" className='w-1/3'>
                    <p className='font-semibold mt-5 mb-2 border-b-2 border-primary-500 rounded-xl p-2'>
                        Pets are {property.data?.isPetsAllowed ? "allowed" : "not allowed"}
                    </p>
                </TabsContent>
                
                <TabsContent value="parking"  className='w-1/3'>
                    <p className='font-semibold mt-5 mb-2 border-b-2 border-primary-500 rounded-xl p-2'>
                        Parking is {" "}
                        {property.data?.isParkingIncluded ? "included" : "not included"}
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
};

export default PropertyDetails;
