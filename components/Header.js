import Image from "next/image"
import React from "react"
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { signIn, signOut } from "next-auth/react"

const Header = ({ session }) => {
  console.log(session)
  return (
    <div className="shadow-sm bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl xl:mx-auto">
        <div className="relative w-24 hidden lg:inline-grid">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
            alt="img"
          />
        </div>
        {/* <div className="w-10 relative lg:hidden flex-shrink-0">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
            alt="img"
          />
        </div> */}

        <div className="mx-w-xs">
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute inset-y-0 md:bottom-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className=" bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-lg"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3">
          {session ? (
            <>
              <MenuIcon className="h-8 w-8 md:hidden cursor-pointer" />
              <HomeIcon className="navBtn" />
              <div className="relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">
                  2
                </div>
              </div>
              <PlusCircleIcon className="navBtn" />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <button onClick={signOut}>Sign Out</button>
            </>
          ) : (
            <>
              <button>
                <Link href="/custom/signin">
                  <a>Sign In</a>
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
