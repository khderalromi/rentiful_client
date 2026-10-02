import { cleanParams, cn, formatPriceValue } from '@/lib/utils';
import { setFilters, setViewMode, toggleFiltersFullOpen } from '@/state';
import { useAppDispatch, useAppSelector } from '@/state/redux'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { debounce, set } from "lodash"
import { Button } from '@/components/ui/button';
import { Filter, Grid, Icon, List, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyTypeIcons } from '@/lib/constants';
const FiltersBar = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathName = usePathname();
    const updateURL = debounce((newFilters) => {
        const cleanFilters = cleanParams(newFilters)
        const updatedSearchParams = new URLSearchParams();
        Object.entries(cleanFilters).forEach(([key, value]) => {
            updatedSearchParams.set(
                key,
                Array.isArray(value) ? value.join(",") : value.toString()
            )
        });
        console.log(pathName)
        router.push(`${pathName}?${updatedSearchParams.toString()}`)
    })
    const filters = useAppSelector(
        (state) => state.global.filters
    );
    const isFiltersFullOpen = useAppSelector(
        (state) => state.global.isFiltersFullOpen
    );
    const viewMode = useAppSelector(
        (state) => state.global.viewMode
    );
    const [searchInput, setSearchInput] = useState(filters.city)

    const handleFilterChange = (
        key: string,
        value: any,
        isMin: boolean | null
    ) => {
        let newValue = value;
        let newFilters;
        if (key === "priceRange" || key === "squareFeet") {
            const currentArrayRange = [...filters[key]];
            // newFilters[key] && delete newFilters[key];
            if (isMin !== null) {
                const index = isMin ? 0 : 1;
                currentArrayRange[index] = value === 'any' ? null : Number(value); 
                newValue = currentArrayRange;
                
                isMin ? 
                newFilters = { ...filters, [`${[key]}[gte]`]: newValue[0] }
                : newFilters = { ...filters, [`${[key]}[lte]`]: newValue[1] }
                console.log(key)
            }
           
        } else if (key === "coordinates") {
            newValue = value === "any" ? [0, 0] : value.map(Number)
            newFilters = { ...filters, [key]: newValue }

        } else {
            newValue = value === "any" ? "any" : value
            newFilters = { ...filters, [key]: newValue }
        }
        
        newFilters && dispatch(setFilters(newFilters))
        updateURL(newFilters)
    }
    /*const handleLocationSearch = () => {
        dispatch(setFilters({...filters , city:searchInput}))
        updateURL({"city":searchInput})
    }*/
   const handleLocationSearch = async() => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    searchInput
                )}.json?access_token=${
                    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
                }&fuzzyMatch=true`
            )
            
            const data = await response.json();console.log(data)
            if (data.features && data.features.length >0) {
                const [lng , lat] =data.features[0].center;
                 const newFilterData = {
                city: searchInput,
                coordinates: [lng, lat] as [number, number]
            };
            dispatch(setFilters(newFilterData));
            
            const updatedFilters = { ...filters, ...newFilterData };
            console.log("Updated Filters for URL:", updatedFilters);
            
            // تمرير الكائن المدمج بدلاً من الاعتماد على المتغير المتأخر
            await updateURL(updatedFilters);
        }
        }catch (err){
                console.error("error search location" , err)
        }
    }
    return (
        <div className='flex justify-between items-center w-full py-5'>
            {/*filters*/}
            <div className='flex justify-between items-center gap-4 p-2'>
                {/*all filters */}
                <Button
                    variant="outline"
                    className={cn(
                        "gap-2 rounded-xl border-primary-400 hover:bg-primary-500 hover:text-primary-100",
                        isFiltersFullOpen && "bg-primary-700 text-primary-100"
                    )}
                    onClick={() => dispatch(toggleFiltersFullOpen())}
                >
                    <Filter className='w-4 h-4 ' />
                    <span>All Filters</span>
                </Button>

                {/*search location */}
                <div className='flex items-center '>

                    <Input
                        placeholder="Search Location"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='w-40 rounded-l-xl rounded-r-none border-primary-400 border-r-0'
                    />
                    <Button
                        onClick={handleLocationSearch}
                        className={`rounded-r-xl rounded-l-none border-l-none border-primary-400 shadow-none
                                    border hover:bg-primary-700 hover:text-primary-50`}
                    >
                        <Search  
                            //onClick={(searchInput) =>
                            //handleFilterChange("city", searchInput, null)}
                            className='w-4 h-4' />

                    </Button>
                </div>

                {/*price range */}
                <div className='flex gap-1'>
                    {/*minimum price selector*/}
                    <Select
                        value={filters.priceRange[0]?.toString() || "any"}
                        onValueChange={(value) =>
                            handleFilterChange("priceRange", value, true)
                        }
                    >
                        <SelectTrigger className='w-22 rounded-xl border-primary-400'>
                            <SelectValue>
                                {formatPriceValue(filters.priceRange[0], true)}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            <SelectItem value="any">Any Min Price</SelectItem>
                            {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
                                <SelectItem key={price} value={price.toString()}>
                                    ${price / 1000}k+
                                </SelectItem>
                            ))}

                        </SelectContent>
                    </Select>


                    {/*Maximum price selector*/}
                    <Select
                        value={filters.priceRange[1]?.toString() || "any"}
                        onValueChange={(value) =>
                            handleFilterChange("priceRange", value, false)
                        }
                    >
                        <SelectTrigger className='w-22 rounded-xl border-primary-400'>
                            <SelectValue>
                                {formatPriceValue(filters.priceRange[1], false)}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            <SelectItem value="any">Any Max Price</SelectItem>
                            {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
                                <SelectItem key={price} value={price.toString()}>
                                    ${price / 1000}k+
                                </SelectItem>
                            ))}

                        </SelectContent>

                    </Select>
                </div>


                {/*beds and baths  */}
                <div className='flex gap-1'>
                    {/*Beds*/}
                    <Select
                        value={filters.beds}
                        onValueChange={(value) =>
                            handleFilterChange("beds", value, null)
                        }
                    >
                        <SelectTrigger className='w-26 rounded-xl border-primary-400'>
                            <SelectValue placeholder="Beds">Any Beds</SelectValue>
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            <SelectItem value="any">Any Beds</SelectItem>
                            <SelectItem value="1">1+ bed</SelectItem>
                            <SelectItem value="2">2+ bed</SelectItem>
                            <SelectItem value="3">3+ bed</SelectItem>
                            <SelectItem value="4">4+ bed</SelectItem>
                        </SelectContent>
                    </Select>


                    {/*Baths*/}
                    <Select
                        value={filters.baths}
                        onValueChange={(value) =>
                            handleFilterChange("baths", value, null)
                        }
                    >
                        <SelectTrigger className='w-26 rounded-xl border-primary-400'>
                            <SelectValue placeholder="Baths"> Any Baths</SelectValue>
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            <SelectItem value="any">Any Baths</SelectItem>
                            <SelectItem value="1">1+ bath</SelectItem>
                            <SelectItem value="2">2+ bath</SelectItem>
                            <SelectItem value="3">3+ bath</SelectItem>
                            <SelectItem value="4">4+ bath</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                {/*property type*/}

                <Select
                    value={filters.propertyType || "any"}
                    onValueChange={(value) =>
                        handleFilterChange("propertyType", value, null)
                    }
                >
                    <SelectTrigger className='w-22 rounded-xl border-primary-400'>
                        <SelectValue placeholder="Home Type">Any Property Type </SelectValue>
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        <SelectItem value="any">Any Property Type</SelectItem>
                        {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
                            <SelectItem key={type} value={type}>
                                <div className='flex items-center'>
                                    <Icon className='w-4 h-4 mr-2' />
                                    <span>{type}</span>
                                </div>

                            </SelectItem>
                        ))}

                    </SelectContent>

                </Select>
            </div>

            {/*View Mode */}
            <div className='flex justify-between items-center gap-4 p-2'>
                <div className='flex border rounded-xl'>
                    <Button 
                        variant="ghost"
                        className={cn(
                            "px-3 py-1 rounded-none rounded-l-xl hover:bg-primary-600 hover:text-primary-50",
                            viewMode === "list" ? "bg-primary-700 text-primary-50" : ""
                        )} 
                        onClick={() => dispatch(setViewMode("list"))}
                    >
                        <List className='w-5 h-5'/>
                    </Button>
                    
                    <Button 
                        variant="ghost"
                        className={cn(
                            "px-3 py-1 rounded-none rounded-l-xl hover:bg-primary-600 hover:text-primary-50",
                            viewMode === "grid" ? "bg-primary-700 text-primary-50" : ""
                        )} 
                        onClick={() => dispatch(setViewMode("grid"))}
                    >
                        <Grid className='w-5 h-5'/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FiltersBar
