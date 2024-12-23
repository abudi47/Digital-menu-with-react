import { injera, spaghetti } from "../assets";

export default function MenuCard() {
  return (
    <div className="min-h-48 min-w-48 max-h-48 shadow-md rounded-lg overflow-hidden">
      <div className="h-[6rem] overflow-hidden">
        <img
          src={spaghetti}
          alt="injera"
          className="h-full w-full object-cover"
        />
      </div>
      <h1 className="text-gray-950 text-xl font-semibold px-2">Spaghetti</h1>
      <h1 className="text-gray-500 px-2">Georgian Delicious</h1>
      <div className="flex justify-between px-2 py-2">
        <h3>rating</h3>
        <h3>$100</h3>
      </div>
    </div>
  );
}
