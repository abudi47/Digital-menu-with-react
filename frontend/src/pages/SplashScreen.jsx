import { logo } from "../assets"

export default function SplashScreen() {
  return (
    <div className="bg-primary w-screen h-screen">
        <div className="flex flex-col items-center">
            <img src={logo} alt="page_logo" className="w-[10rem] object-contain mt-32" />
        </div>
    </div>
  )
}

