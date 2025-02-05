import { spaghetti } from "../assets";

export default function RatedMenuCard() {
  return (
    <div className="min-h-64 min-w-64 max-h-64 shadow-md rounded-lg overflow-hidden ">
      <div className="h-[60%] overflow-hidden">
        <img
          src={spaghetti}
          alt="spaghetti"
          className="h-full w-full object-cover"
        />
      </div>
      <h1 className="text-gray-700 text-xl font-semibold px-2 mt-1">Spaghetti</h1>
      <h1 className="text-gray-500 px-2">Georgian Delicious</h1>
      <div className="flex justify-between px-2">
        <h3>rating</h3>
        <h3>$100</h3>
      </div>
    </div>
  );
}
