import { spaghetti } from "../assets";

export default function MenuDetail() {
  return (
    <div className="h-screen w-screen">
      {/* Header */}
      <div className="bg-primary pt-6 px-2 rounded-b-lg h-32">
        <div className="flex justify-between pb-4 text-white">
          <h1 className="font-semibold text-3xl">Product Detail</h1>
          <h2 className="font-semibold text-2xl">Menu</h2>
        </div>
      </div>

      <div className="px-2 mt-6 shadow-md">
        <div className="rounded-lg overflow-hidden">
          <img src={spaghetti} alt="menu image" srcset="" />
        </div>

        <div className="mt-4">
          <h1 className="text-gray-900 text-2xl font-semibold px-2">
            Spaghetti
          </h1>
          <h1 className="text-gray-500 px-2">Georgian Delicious</h1>
          <div className="flex justify-between px-2 py-2">
            <h3>rating</h3>
            <h3>$100</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
