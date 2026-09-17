"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { usePathname, useRouter } from 'next/navigation';
import { useGetUserQuery } from '@/state/Auth/AuthSlice';

const Layout = ({ children }:{ children: React.ReactNode }) => {
  
      const { data: authUser,isLoading:authLoading } = useGetUserQuery();
      const router= useRouter();
      const pathname = usePathname();
      const [isLoading, setIsLoading] = useState<boolean>(true);
  
      useEffect( ()=> {
          if(authUser) { 
              const userRole = authUser.role?.toLowerCase();
              if(
                  (userRole === "manager" && pathname.startsWith("/search")) || 
                  (userRole === "manager" && pathname === "/")
  
              ) {
                  router.push( "/managers/properties",
                              { scroll: false}
                  )
              } else {
                  setIsLoading(false)
              }
          }
      },[authUser , router , pathname])
      
      //if(isLoading || authLoading) {return <>...Loading</>}
  return (
    <div className="h-full w-full ">
      <Navbar/>
      <main className="h-full flex w-full flex-col pt-[${NAVBAR_HEIGHT}px]"
            style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
        >
        {children}
      </main>
    </div>
  )
}

export default Layout
