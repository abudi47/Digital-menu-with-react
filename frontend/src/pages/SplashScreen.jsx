import { logo } from "../assets";

export default function SplashScreen() {
  return (
    <div className="bg-primary w-screen h-screen">
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="page_logo"
          className="w-[10rem] object-contain mt-32 mb-6"
        />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-white font-semibold text-3xl">
          Welcome to Melody Cafe
        </h1>
        <h2 className="text-white text-xl">Where Flavor and Harmony Meets!</h2>
      </div>
    </div>
  );
}
