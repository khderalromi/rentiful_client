"use client"
import React, { useEffect, useState } from 'react'
import { NAVBAR_HEIGHT } from '../lib/constants'
import Link from 'next/link'
import { Button } from './ui/button'
import { useGetAuthUserMutation, useGetUserQuery } from '@/state/Auth/AuthSlice'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Bell, MessageCircle, Plus, Search } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { SidebarTrigger } from './ui/sidebar'

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const isDashboardPage = pathName.includes("/managers") || pathName.includes("/tenants");


  const { data: authData } = useGetUserQuery();
  const userInfo = authData?.data?.user || authData?.user;
  const handleSignOut = async () => {
    await localStorage.removeItem("token");
    //setUser(null)
    window.location.href = "/landing";

  }


  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >

      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className='md:hidden'>
              <SidebarTrigger />
            </div>
          )}
          <Link href="/" className="cursor-pointer hover:text-primary-300 transition-colors duration-200"
            scroll={false}>
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Logo"
                width={24}
                height={24}
                className="h-6 w-6 "
              />

              <div className="text-xl font-bold">
                RENT
                <span className='text-secondary-500 font-light hover:text-primary-300'>
                  IFUL
                </span>
              </div>
            </div>
          </Link>
          {isDashboardPage && userInfo && (
            <Button variant="secondary"
              className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50"
              onClick={() => {
                return (
                  router.push(userInfo?.role.toLowerCase() === "manager"
                    ? "/managers/newproperty"
                    : "/serach"
                  ))
              }
              }
            >
              {userInfo.role?.toLowerCase() === "manager" ? (
                <>
                  <Plus className='h-4 w-4' />
                  <span className='hidden md:block ml-2'>Add New Property</span>
                </>
              ) : (
                <>
                  <Search className='h-4 w-4' />
                  <span className='hidden md:block ml-2'>Search Properties</span>

                </>
              )
              }
            </Button>
          )}
          {/*response?.data?.user ? (
            <div className='flex items-center gap-5'>
              {response?.data?.user.name}
            </div>
          ) : null*/}
        </div>

        {!isDashboardPage && <p className='text-primary-200 hidden md:block'>
          Discover your perfect rental apartment with our advanced search
        </p>}

        <div className='flex items-center gap-5'>
          {userInfo ? (
            <>
              <div className='relative hidden md:block'>
                <MessageCircle className='w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400' />
                <span className='absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full'></span>
              </div>

              <div className='relative hidden md:block'>
                <Bell className='w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400' />
                <span className='absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full'></span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none ">
                  <Avatar>
                    <AvatarImage src={userInfo?.image} />
                    <AvatarFallback className="bg-primary-600 ">
                      {userInfo?.role?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <p className='text-primary-200 hidden md:block'>
                    {userInfo?.name?.split(0)}
                  </p>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator className="bg-primary-200" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold text-xs"
                    onClick={() => {
                      router.push(
                        userInfo?.role.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favourites",
                        { scroll: false }
                      )
                    }}
                  >
                    Go to Dashboard
                  </DropdownMenuItem>


                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold text-xs"
                    onClick={() => {
                      router.push(
                        `/${userInfo?.role.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }}
                  >
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold text-xs"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" >
                <Button variant="outline" className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg">
                  Sign In
                </Button>
              </Link>

              <Link href="/signup" >
                <Button variant="secondary" className="text-white border-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar

