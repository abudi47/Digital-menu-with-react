import { spaghetti } from "../assets"

export default function RatedMenuCard() {
  return (
    <div className="min-h-56 min-w-56 max-h-56 shadow-lg rounded-lg overflow-hidden ">
      <div className="h-[70%] overflow-hidden">
        <img src={spaghetti} alt="spaghetti" className="h-full w-full object-contain" />
      </div>
      <h1 className="text-xl font-semibold text-brown px-1">Spaghetti</h1>
      <div className="flex justify-between px-1 pb-2">
        <h3>rating</h3>
        <h3>$100</h3>
      </div>
    </div>
  )
}
