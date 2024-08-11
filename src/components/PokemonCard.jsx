import React from "react";

const PokemonCard = ({ pokemonData }) => {
  return (
    <>
      <div className="flex flex-col w-96 mx-auto rounded overflow-hidden shadow-lg">
        <div className="flex justify-center items-center h-40">
          <img
            className="w-28 mt-2 h-auto"
            src={pokemonData.sprites.other.dream_world.front_default}
            alt={pokemonData.name}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mb-3">
            {pokemonData.name}
          </div>
          <div className="flex justify-center"> {/* Added this div for centering */}
            <span className="text-lg text-white font-semibold text-center bg-green-500 px-4 py-2 rounded-xl">
              {pokemonData.types.map((currType) => currType.type.name).join(", ")}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="text-base font-medium">
            Height:{pokemonData.height}
          </span>
          <span className="text-base font-medium">
            Weight:{pokemonData.weight}
          </span>
          <span className="text-base font-medium">
            Speed:{pokemonData.stats[5].base_stat}
          </span>
        </div>
        <div className="px-6 pt-4 pb-2 mb-3 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;