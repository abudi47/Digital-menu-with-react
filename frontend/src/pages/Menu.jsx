import RatedMenuCard from "../components/RatedMenuCard";

export default function Menu() {
  return (
    <div className="h-screen w-screen grid grid-rows-[9rem_1fr_1fr] bg-primary">
      {/* Header */}
      <div className="bg-secondary pt-6 px-2 rounded-b-lg">
        <div className="flex justify-between pb-2">
          <h1 className="font-semibold text-3xl text-primary text-nowrap">
            Melody
          </h1>
          <h2 className="font-semibold text-2xl text-primary text-nowrap">Menu</h2>
        </div>

        <div className="w-full bg-white rounded-md">
            <input type="text" placeholder="Search..." className="p-2 rounded-md" />
        </div>
      </div>
      {/* Menu Categories */}
      <div className="overflow-hidden overflow-y-scroll">
        <h1 className="text-3xl font-semibold pb-1 text-brown px-2">Our Lovely Dishes</h1>
        <div className="flex flex-row gap-4 overflow-x-scroll px-1">
            <RatedMenuCard />
            <RatedMenuCard />
            <RatedMenuCard />
            <RatedMenuCard />
        </div>

      </div>
      <div className="border"></div>
    </div>
  );
}
