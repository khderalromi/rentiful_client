"use client"
import Card from '@/components/Card';
import Header from '@/components/Header';
import LoadingComponent from '@/components/Loading'
import Not_Found from '@/components/Not_Found';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Property } from '@/state';
import { useGetLeasesPropertyQuery, useGetManagerPropertiesQuery, useGetPaymentsPropertyQuery, useGetPaymentsQuery, useGetPropertyQuery, useGetUserQuery } from '@/state/Auth/AuthSlice';
import { ArrowDownToLineIcon, ArrowLeft, Check, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'

const PropertyTenants = () => {
    //const { data: authData } = useGetUserQuery();
    const { id } = useParams<{ id: string }>();
    const {
        data: property,
        isLoading: propertyLoading,
        isError: propertyError
    } = useGetPropertyQuery({ propertyId: id })


    const {
        data: leases,
        isLoading: leasesLoading,
        isError: leasesError
    } = useGetLeasesPropertyQuery({ propertyId: id })


    const {
        data: payments,
        isLoading: paymentsLoading,
        isError: paymentsError
    } = useGetPaymentsPropertyQuery({ propertyId: id || " "})

    console.log(property)
    console.log(leases)
    console.log(payments)
    if (propertyLoading || leasesLoading || paymentsLoading) { <LoadingComponent /> }
    if (propertyError || !property || leasesError || paymentsError) { <Not_Found /> }

    const getCurrentMonthPaymentStatus = (leaseId:string) => {
        const currentDate = new Date();
        const currentMonthPayment = payments?.data?.find((payment: any) => {
            return (
                    
                payment?.lease === leaseId &&
                new Date(payment.dueDate).getMonth() === currentDate.getMonth() &&
                new Date(payment.dueDate).getFullYear() === currentDate.getFullYear()
            )
         });
       console.log(currentMonthPayment)
        return currentMonthPayment?.paymentStatus || "Not Paid"
    }

    return (
        <div className='p-2 md:p-5'>
            {/*back tp properties page*/}
            <Link
                href="/managers/properties"
                className='flex items-center mb-4 hover:text-primary-500'
                scroll={false}
            >
                <ArrowLeft className='w-4 h-4 mr-2' />
                <span>Back To Properties</span>
            </Link>

            <Header
                title={property?.name || "My Property"}
                subtitle='Manage tenants and leases for this property'
            />


            <div className='w-full space-y-6'>
                <div className='mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6'>
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <h2 className='text-2xl font-bold mb-1'>Tenants Overview </h2>
                            <p className='text-sm text-gray-500'>
                                Manage and view alll tenants for this property
                            </p>
                        </div>


                        <div>
                            <button className='bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center'>
                                <Download className='w-5 h-5 mr-2' />
                                <span>Download All</span>
                            </button>
                        </div>
                    </div>
                    <hr className='mt-4 mb-1 '/>
                    <div className='overflow-x-auto'>
                        
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Lease Period</TableHead>
                        <TableHead>Monthly Rent</TableHead>
                        <TableHead>Current Month Status</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {leases?.data?.map((lease : any) => (
                        <TableRow key={lease._id} className='h-24'>
                            <TableCell>
                                <div className='flex items-center space-x-3'>
                                    <Image 
                                        src="/landing-i1.png"
                                        alt={lease.tenant.name}
                                        width={40}
                                        height={40}
                                        className='rounded-full'
                                    />
                                    <div>
                                        <div className='font-semibold'>
                                            {lease?.tenant?.name}
                                        </div>
                                        <div className='text-sm text-gray-500'>
                                            {lease?.tenant?.email}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    {new Date(lease?.startDate).toLocaleDateString('en-US')}
                                </div>
                                <div>
                                    {new Date(lease?.endDate).toLocaleDateString('en-US')}
                                </div>
                            </TableCell>
                            <TableCell>
                                ${lease.rent.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                                    getCurrentMonthPaymentStatus(lease?._id) === 'Paid'
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    :"bg-red-100 text-red-800 border-red-300"
                                }`}>
                                    {getCurrentMonthPaymentStatus (lease?._id) === "Paid" ?(
                                        <Check className='w-4 h-4 inline-block mr-1'/>
                                    ) : null}
                                    {getCurrentMonthPaymentStatus(lease?._id)}
                                </span>
                            </TableCell>
                            <TableCell>{lease.tenant.phoneNumber}</TableCell>
                            <TableCell>         
                                <button className='bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center'>
                                    <ArrowDownToLineIcon className='w-4 h-4 mr-1' />
                                    Download
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyTenants;
