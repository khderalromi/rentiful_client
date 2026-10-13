"use client"
import LoadingComponent from '@/components/Loading';
import Not_Found from '@/components/Not_Found';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Property } from '@/state';
import {  useGetLeasesPropertyByUserQuery, useGetPaymentsQuery, useGetPropertyQuery, useGetUserQuery } from '@/state/Auth/AuthSlice';
import { ArrowDownToLine, ArrowDownToLineIcon, Check, CreditCard, Download, Edit, FileText, Mail, MapPin, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'


const PaymentMethod = () => {
    return (
        <div className='bg-white rounded-xl shadow-md overflow-hidden p-6  flex-1 '>
            <h2 className='text-2xl font-bold mb-4'>Payment Method</h2>
            <p className='mb-4'>Change how you pay for your plan.</p>
            <div className='border-2 border-primary-200 rounded-lg p-6'>
                <div>
                    {/*Card Info*/}
                    <div className='flex gap-10'>
                        <div className='w-36 h-20 bg-blue-600 flex items-center justify-center rounded-md'>
                            <span className='text-white text-2xl font-bold'>VISA</span>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <div className='flex items-start gap-5'>
                                <h3 className='text-lg font-semibold'>Visa ending in 2026</h3>
                                <span className='text-sm font-medium border border-primary-700 text-primary-700 px-3 py-1 rounded-full'>
                                    Default
                                </span>
                            </div>
                            <div className='text-sm text-gray-500 flex items-center'>
                                <CreditCard className='w-4 h-4 mr-1' />
                                <span>Expiry * 26/06/2026</span>
                            </div>


                            <div className='text-sm text-gray-500 flex items-center'>
                                <Mail className='w-4 h-4 mr-1' />
                                <span>billing@BASECLUB.COM</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='my-4 text-primary-200' />
                <div className='flex justify-end gap-2 w-full'>
                    <button className='bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center'>
                        <Edit className='w-5 h-5 mr-2' />
                        Edit
                    </button>
                </div>
            </div>
        </div>

    )
}

const ResidenceCard = ({
    property,
    currrentLease,
}: {
    property: any;
    currrentLease: any;
}) => {
    return (
        <div className='bg-white rounded-xl shadow-md overflow-hidden p-6 flex-1 flex flex-col justify-between'>
            {/*Header*/}
            <div className='flex gap-5'>
                <div className='w-64 h-32 object-cover bg-slate-500 rounded-xl'></div>
                <div className='flex flex-col justify-between'>
                    <div>
                        <div className='bg-green-500 w-fit text-white px-4 py-1 rounded-full text-sm font-semibold'>
                            Active Leases
                        </div>

                        <h2 className='text-2xl font-bold my-2'>{property.data?.name}</h2>
                        <div className='flex items-center mb-2'>
                            <MapPin className='w-5 h-5 mr-1' />
                            <span>
                                {property.data?.locationId?.city} , {property.data?.locationId?.country}
                            </span>
                        </div>
                    </div>
                    <div className='text-xl font-bold'>
                        ${currrentLease?.rent} / month
                        <span className='text-gray-500 text-sm font-normal'>/ night</span>
                    </div>
                </div>
            </div>
            {/*Dates*/}
            <div>
                <div className='flex justify-between items-center'>
                    <div className='xl"flex'>
                        <div className='text-gray-500 mr-2'>Start Date:</div>
                        <div className='font-semibold'>
                            {new Date(currrentLease?.startDate).toLocaleDateString('en-US')}
                        </div>
                    </div>

                    <div className='border-2 border-primary-300 h-4' />
                    <div className='xl:flex'>

                        <div className='text-gray-500 mr-2'>End Date:</div>
                        <div className='font-semibold'>
                            {new Date(currrentLease?.endDate).toLocaleDateString('en-US')}
                        </div>
                    </div>


                    <div className='border-2 border-primary-300 h-4' />
                    <div className='xl:flex'>

                        <div className='text-gray-500 mr-2'>Next Payment:</div>
                        <div className='font-semibold'>
                            {new Date(currrentLease?.startDate).toLocaleDateString('en-US')}
                        </div>
                    </div>
                </div>
                <hr className='my-4 text-primary-200' />
            </div>
            {/*Buttons*/}
            <div className='flex justify-end gap-2 w-full'>
                <button className='bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center'>
                    <User className='w-5 h-5 mr-2' />
                    Manager
                </button>
                <button className='bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center'>
                    <Download className='w-5 h-5 mr-2' />
                    Download Agreement
                </button>
            </div>
        </div>
    )
}

const BillingHistory = ({payments}: {payments: any[]}) => {
    return (
        <div className='mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6'>
            {/*Header*/}
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className='text-2xl font-bold mb-1'>Billing History</h2>
                    <p className='text-sm text-gray-500'>
                        Download your previews plan raceipts and usage details
                    </p>
                </div>

                <div>
                    <button className='bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center'>
                        <Download className='w-5 h-5 mr-2' />
                        <span>Download All</span>
                    </button>
                </div>
            </div>
            <hr className='mt-4 mb-1 text-primary-200'/>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Billing Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment._id} className='h-16'>
                            <TableCell className='font-medium'>
                                <div className='flex items-center'>
                                    <FileText className='w-4 h-4 mr-2' />
                                    Invoice #{payment._id} - {" "}
                                    { new Date(payment.paymentData).toLocaleDateString("dafault" , {
                                        month : "short",
                                        year: "numeric"
                                    })}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                                    payment?.paymentStatus === 'Paid'
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    :"bg-yellow-100 text-yelloe-800 border-yellow-300"
                                }`}>
                                    {payment?.paymentStatus === "Paid" ?(
                                        <Check className='w-4 h-4 inline-block mr-1'/>
                                    ) : null}
                                    {payment?.paymentStatus}
                                </span>
                            </TableCell>
                            <TableCell>
                                {new Date(payment?.paymentDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>${payment?.amountPaid.toFixed(2)}</TableCell>
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
    )

}

const Residence = () => {
    const { id } = useParams<{ id: string }>();
    const { data: authUser } = useGetUserQuery();
    const {
        data: property,
        isLoading: propertyLoading,
        isError: propertyError
    } = useGetPropertyQuery({ propertyId: id });
    const { data: leases, isLoading: leasesLoading } = useGetLeasesPropertyByUserQuery({ propertyId: id });
    console.log(leases)
    const { data: payments, isLoading: paymentsLoading } = useGetPaymentsQuery({
        leaseId: leases?.data[0]?._id || ""
    });
    console.log(payments)
    if (propertyLoading || leasesLoading || paymentsLoading) { <LoadingComponent /> }
    if (propertyError || !property) { <Not_Found /> }
    const currentLease = leases?.data?.find(
        (lease: any) => leases.data.property?._id === property.data.property?._id
    )
    console.log(leases)
    return (
        <div className='m-2 md:m-5'>
            <div className='w-full mx-auto'>
                <div className='md:flex gap-10'>
                    {currentLease && (
                        <ResidenceCard property={property} currrentLease={currentLease} />
                    )}
                    <PaymentMethod />
                </div>
                <BillingHistory payments={payments || []} />
            </div>
        </div>
    )
}

export default Residence;
