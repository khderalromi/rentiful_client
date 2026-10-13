"use client"
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import React, { useEffect, useState } from 'react'
import AppSidebar from "../../components/AppSidebar"
import { useGetUserQuery } from '@/state/Auth/AuthSlice'
import { usePathname, useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import LoadingComponent from '@/components/Loading'
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    const { data: authUser, isLoading: authLoading } = useGetUserQuery();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (authUser) {
            const userRole = authUser?.data?.user?.role.toLowerCase();
            if (
                (userRole === "manager" && pathname.startsWith("/tenants")) ||
                (userRole === "tenant" && pathname.startsWith("/managers"))

            ) {    

                router.push(
                    userRole === "manager"
                        ? "/managers/properties"
                        : "/tenants/favourites",
                    { scroll: false }
                )
            } else {
                setIsLoading(false)
            }
        }
    }, [authUser, router, pathname])

    if (authLoading || isLoading) {
            return(
            <div className='w-full h-svh items-center justify-center content-center '>
                <LoadingComponent/>
            </div>)
    }
    if (!authUser?.data.user.role) { return null }

    return (
        <SidebarProvider>
            <div className='min-h-screen w-full bg-primary-100'>
                <Navbar />
                <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
                    <main className='flex'>
                        <AppSidebar userType={authUser?.data.user.role.toLowerCase()} />
                        <div className='grow transition-all duration-300'>
                            {children}
                        </div>

                    </main>
                </div>

            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout;
