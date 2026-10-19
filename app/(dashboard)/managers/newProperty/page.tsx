"use client"
import { CustomFormField } from '@/components/FormField';
import Header from '@/components/Header';
import Not_Found from '@/components/Not_Found';
import { Button } from '@/components/ui/button';
import { PropertyFormData, propertySchema } from '@/lib/schemas';
import { useCreatePropertyMutation, useGetUserQuery } from '@/state/Auth/AuthSlice'
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyTypeEnum, AmenityEnum, HighlightEnum, LOCATION_MAPPING } from "../../../../lib/constants"
import { Form, FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { toast } from 'react-toastify';

const NewProperty = () => {

    const {
        data: AuthUser,
        isLoading,
        isError
    } = useGetUserQuery()
console.log(AuthUser)
    const [createProperty] = useCreatePropertyMutation();
    type FormData = z.input<typeof propertySchema>;

    const form = useForm<FormData, any, z.output<typeof propertySchema>>({
        resolver: zodResolver(propertySchema),
        defaultValues: {

            name: "",
            description: "",
            pricePerMonth: 1000,
            securityDeposit: 500,
            applicationFee: 100,
            isPetsAllowed: true,
            isParkingIncluded: true,
            photoUrls: [],
            amenities: "",
            highlights: "",
            beds: 1,
            baths: 1,
            squareFeet: 1000,
            propertyType: PropertyTypeEnum.Apartment,
            address: "dfd",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            coordinates: []
        },

    })
    // 1. مراقبة قيم البلد والمدينة داخل مكون NewProperty
    const selectedCountry = form.watch("country");
    const selectedCity = form.watch("city");

    // 2. دالة يتم استدعاؤها عند تغيير المدينة لتحديث الإحداثيات تلقائياً
    const handleCityChange = (cityName: string) => {
        form.setValue("city", cityName);

        // البحث عن الإحداثيات الخاصة بهذه المدينة ضمن القاموس الجغرافي
        if (selectedCountry && LOCATION_MAPPING[selectedCountry]?.[cityName]) {
            const coords = LOCATION_MAPPING[selectedCountry][cityName];
            form.setValue("coordinates", coords); // <--- هنا يتم توليد وحقن الإحداثيات تلقائياً!
            form.setValue("state", cityName); // تعيين الـ state افتراضياً نفس المدينة أو المنطقة
        }
    };
    const onSubmit = async (data: FormData) => {
        console.log(data)
        if (!AuthUser || AuthUser?.user?.data.role !== "manager") {
             <Not_Found />
        }
        console.log("start")
        try{
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "photoUrls") {
                const files = value as File[]
                files.forEach((file: File) => {
                    formData.append("photos", file)
                })
            } else if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        })
        if (selectedCountry && selectedCity && LOCATION_MAPPING[selectedCountry]?.[selectedCity]) {
            const coords = LOCATION_MAPPING[selectedCountry][selectedCity];
            console.log(coords)
            formData.set("coordinates", JSON.stringify(coords));
        }
        
        formData.append("manager", AuthUser.data?.user?._id)
        
        const response = await createProperty(formData);
        response && toast.success("property created successfully", {autoClose:3000})
         
    }catch(err){return toast.error("can't create this property", {autoClose:3000})}
    }


    return (
        <div className="dashboard-container">
            <Header
                title="Add New Property"
                subtitle="Create a new property listing with detailed information"
            />
            <div className="bg-white rounded-xl p-6">

                <FormProvider  {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-4 space-y-10"
                    >
                        {/* Basic Information */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                            <div className="space-y-4">
                                <CustomFormField name="name" label="Property Name" />
                                <CustomFormField
                                    name="description"
                                    label="Description"
                                    type="textarea"
                                />
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Fees */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold mb-4">Fees</h2>
                            <CustomFormField
                                name="pricePerMonth"
                                label="Price per Month"
                                type="number"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CustomFormField
                                    name="securityDeposit"
                                    label="Security Deposit"
                                    type="number"
                                />
                                <CustomFormField
                                    name="applicationFee"
                                    label="Application Fee"
                                    type="number"
                                />
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Property Details */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <CustomFormField
                                    name="beds"
                                    label="Number of Beds"
                                    type="number"
                                />
                                <CustomFormField
                                    name="baths"
                                    label="Number of Baths"
                                    type="number"
                                />
                                <CustomFormField
                                    name="squareFeet"
                                    label="Square Feet"
                                    type="number"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <CustomFormField
                                    name="isPetsAllowed"
                                    label="Pets Allowed"
                                    type="switch"
                                />
                                <CustomFormField
                                    name="isParkingIncluded"
                                    label="Parking Included"
                                    type="switch"
                                />
                            </div>
                            <div className="mt-4">
                                <CustomFormField
                                    name="propertyType"
                                    label="Property Type"
                                    type="select"
                                    options={Object.keys(PropertyTypeEnum).map((type) => ({
                                        value: type,
                                        label: type,
                                    }))}
                                />
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Amenities and Highlights */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Amenities and Highlights
                            </h2>
                            <div className="space-y-6">
                                <CustomFormField
                                    name="amenities"
                                    label="Amenities"
                                    type="select"
                                    options={Object.keys(AmenityEnum).map((amenity) => ({
                                        value: amenity,
                                        label: amenity,
                                    }))}
                                />
                                <CustomFormField
                                    name="highlights"
                                    label="Highlights"
                                    type="select"
                                    options={Object.keys(HighlightEnum).map((highlight) => ({
                                        value: highlight,
                                        label: highlight,
                                    }))}
                                />
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Photos */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Photos</h2>
                            <CustomFormField
                                name="photoUrls"
                                label="Property Photos"
                                type="file"
                                accept="image/*"
                            />
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Additional Information */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold mb-4">
                                Additional Information
                            </h2>
                   
                            <CustomFormField
                                name="country"
                                label="Country"
                                type="select"
                                options={Object.keys(LOCATION_MAPPING).map((country) => ({
                                    value: country,
                                    label: country,
                                }))}
                            />

                           
                            <div className="flex justify-between gap-4">
                                <CustomFormField 
                                    name="city" 
                                    label="City" 
                                    className="w-full" 
                                    type="select"
                                    disabled={selectedCountry? false :true}
                                    options={selectedCountry? Object.keys(LOCATION_MAPPING[selectedCountry]).map((country) => ({
                                        value: country,
                                        label: country,
                                    })) : []}
                                />
                                <CustomFormField
                                    name="state"
                                    label="State"
                                    className="w-full"
                                />
                                <CustomFormField
                                    name="postalCode"
                                    label="Postal Code"
                                    className="w-full"
                                />
                            </div>

                            <CustomFormField name="address" label="Address" type='text' />
                        </div>

                        <Button
                            type="submit"
                            className="bg-primary-700 text-white w-full mt-8"
                        >
                            Create Property
                        </Button>
                    </form>
                </FormProvider >
            </div>
        </div>
    )
}

export default NewProperty
