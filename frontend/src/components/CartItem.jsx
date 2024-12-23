export default function CartItem(probs) {
  return (
    <div className="flex flex-row gap-2 my-4 border-b-2 border-gray-300 pb-2">
      
      <div className="w-20 h-20 overflow-hidden rounded-md">
        <img src={probs.recipe.image} alt={probs.recipe.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between">
        <span>
          <h3 className="text-lg font-semibold text-gray-700 text-nowrap">{probs.recipe.name}</h3>
          <h3 className="text-sm text-gray-600 text-nowrap">{probs.recipe.name}</h3>
        </span>
        <h3 className="text-lg font-semibold text-nowrap text-primary">${probs.recipe.price}</h3>
      </div>
    </div>
  );
}
