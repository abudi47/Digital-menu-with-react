import { logo } from "../assets";

export default function SplashScreen() {
  return (
    <div className="bg-primary w-screen h-screen">
        <div className="flex flex-row items-center justify-center mt-32">
          <div className="border-y-4  flex-row justify-center border-brown" > 
            <span >
              <hr className ="w-64 h-4 "/>
            </span>
          </div>
          <img
            src={logo}
            alt="page_logo"
            className="w-[10rem] object-contain mb-6"
          />
           <div className="border-y-4  flex-row justify-center border-brown" > 
            <span >
              <hr className ="w-64 h-4 "/>
            </span>
          </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-brown font-semibold text-3xl">
          Welcome to Melody Cafe
        </h1> 
        <h2 className="text-lg text-brown">
            Where Flavor and Harmony Meets!
        </h2>
      </div>
    </div>
  );
}
