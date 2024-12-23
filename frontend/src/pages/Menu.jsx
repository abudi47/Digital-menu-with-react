import RatedMenuCard from "../components/RatedMenuCard";
import Categories from "../components/Categories";
import MenuCard from "../components/MenuCard";

export default function Menu() {
  const categories = Array(6).fill(<Categories />);
  const ratedMenuCards = Array(4).fill(<RatedMenuCard />);
  const menuCards = Array(4).fill(<MenuCard />);

  return (
    <div className="h-screen w-screen grid grid-rows-[9rem_4rem_1fr] gap-2">
      {/* Header */}
      <div className="bg-primary pt-6 px-2 rounded-b-lg">
        <div className="flex justify-between pb-4 text-white">
          <h1 className="font-semibold text-3xl">Melody</h1>
          <h2 className="font-semibold text-2xl">Menu</h2>
        </div>

        <div className="w-full bg-white rounded-md">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md"
          />
        </div>
      </div>
      {/* Categories */}
      <div className="flex gap-2 overflow-x-scroll mx-1">
        {categories.map((category, index) => (
          <div key={index}>{category}</div>
        ))}
      </div>

      {/* Highly rated dishes */}
      <div className="overflow-hidden overflow-y-scroll px-1">
        <div className="flex flex-row gap-4 overflow-x-scroll px-1 py-3">
          {ratedMenuCards.map((card, index) => (
            <div key={index}>{card}</div>
          ))}
        </div>
        <h3 className="text-3xl font-semibold text-gray-800 my-2 py-1 px-2">Other Menu</h3>
        <div className="flex flex-col gap-4 px-2">
          {menuCards.map((card, index) => (
            <div key={index}>{card}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
