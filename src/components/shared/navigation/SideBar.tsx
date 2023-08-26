
"use client"
import {
  Clapperboard, Home, TrendingUp, ScanLine,
  BookMarked, History, SlidersHorizontal, Diff, Tv
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
const NavItems = [
  {
    "name": "Home",
    "route": "/",
    "icons": Home
  },
  {
    "name": "Trending",
    "route": "/trending",
    "icons": TrendingUp
  },
  {
    "name": "Popular",
    "route": "/popular",
    "icons": Tv
  },
  {
    "name": "Movies",
    "route": "/movie",
    "icons": Clapperboard
  },
  {
    "name": "Genres",
    "route": "/genres",
    "icons": SlidersHorizontal
  }, {
    "name": "AniScan",
    "route": "/aniscan",
    "icons": ScanLine
  }
  , {
    "name": "Bookmark",
    "route": "/bookmark",
    "icons": BookMarked
  }, {
    "name": "History",
    "route": "/history",
    "icons": History
  }
]
const SideBar = () => {
  console.log("Hentai onichan!! Why you looking at my source")
  useRouter()
  const pathname = usePathname()
  const [expand, setExpand] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setExpand(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className=" hidden md:flex fixed ">
        <div className={` w-64 max-lg:w-20 h-screen bg-white/5 backdrop-blur-xl text-white sticky left-0 top-0 duration-300 border-r-2 border-white/25`}>
          <nav className="flex flex-col overflow-scroll h-screen mt-9  p-2 gap-5 max-lg:mt-10">
            {NavItems.map((link) => {
              const isActive =
                (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route;
              return (
                <Link href={link.route} key={link.name} className={`${isActive && `bg-[#3f3f46]`} mb-5 duration-200   transition-all hover:scale-90 p-4 rounded-lg flex gap-3 text-xl items-center cursor-pointer`}>
                  <link.icons className={`${isActive && (`fill-white`)}`} />
                  <li className="font-semibold  max-lg:hidden block">{link.name}</li>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      {/* mobile bottom bar */}
      <div ref={sidebarRef} className={`text-white fixed bottom-0 md:hidden z-20 bg-white/5
       rounded-t-xl border-t-2 border-white/25 backdrop-blur-xl w-full p-2 duration-200 transition-all`}>
        <div className="flex items-center justify-between flex-wrap ">
          {NavItems.slice(0, expand ? NavItems.length : 2).map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link href={link.route} onClick={() => setExpand(false)} key={link.name} className={`flex flex-col items-center gap-3 text-sm ${isActive && ` border-white/25 border-2 backdrop-blur-md `} w-24 p-2 rounded-lg duration-200 transition-all`}>
                <link.icons className={`${isActive && (`fill-white`)}`} />
                <h1>{link.name}</h1>
              </Link>
            )
          })}
          <div className="flex flex-col cursor-pointer relative items-center
           gap-3 text-sm w-24 p-2 rounded-lg duration-200 transition-all" onClick={() => setExpand(!expand)} >
            <Diff />
            <h1>{
              expand ? "Show Less" : "Show More"}</h1>
          </div>
        </div>
      </div>
    </>
  )
}
export default SideBar