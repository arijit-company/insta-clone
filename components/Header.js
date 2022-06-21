import Image from "next/image"
import React, { useCallback, useRef } from "react"
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"
import { signOut } from "next-auth/react"
import { useDispatch } from "react-redux"
import { logOutUser } from "../redux/slices/authSlice"
import { useRouter } from "next/router"
import { searchPosts } from "../redux/slices/postSlice"
import Notification from "./notification/Notification"

const Header = ({ session }) => {
  const { data: sessionData, status: sessionStatus } = session
  const dispatch = useDispatch()
  const router = useRouter()
  const searchInput = useRef("")
  // const [searchInput, setSearchInput] = useState("")

  const signoutHandler = async () => {
    dispatch(logOutUser())
    const redirecting = await signOut({
      redirect: false,
      callbackUrl: "/custom/signin",
    })
    router.push(redirecting.url)
  }

  // Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // `wait` milliseconds.
  const debounce = useCallback((func, wait) => {
    let timeout

    return function executedFunction(e) {
      searchInput.current = e.target.value
      const later = () => {
        // null timeout to indicate the debounce ended; or you cann write something like clearTimeout(timeout)
        timeout = null

        func()
      }

      // This will reset the waiting every function execution.
      // This is the step that prevents the function from
      // being executed because it will never reach the
      // inside of the previous setTimeout
      clearTimeout(timeout)

      // Restart the debounce waiting period.
      // setTimeout returns a truthy value (it differs in web vs Node)
      timeout = setTimeout(later, wait)
    }
  }, [])

  let returnedFunction = debounce(function () {
    // All the pi call or other stuff you do
    // console.log(searchInput.current)
    dispatch(searchPosts(searchInput.current))
  }, 1000)

  // const handleSearch = (e) => {
  //   clearTimeout(timeout)

  //   timeout = setTimeout(() => {
  //     setSearchInput(e.target.value)
  //     console.log(e.target.value)
  //   }, 1000)
  // }

  return (
    <>
      <Notification />
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
          <div className="w-10 relative lg:hidden flex-shrink-0 ml-3">
            <Image
              src="https://links.papareact.com/jjm"
              layout="fill"
              objectFit="contain"
              alt="img"
            />
          </div>

          <div className="mx-w-xs">
            <div className="mt-1 relative p-3 rounded-md">
              <div className="absolute inset-y-0 md:bottom-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className=" bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-lg"
                onInput={returnedFunction}
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 mr-3">
            {sessionStatus === "loading" ? (
              <p>loading...</p>
            ) : sessionData ? (
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
                <button onClick={signoutHandler}>Sign Out</button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    router.push(`/custom/signin?callbackUrl=${router.asPath}`)
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
