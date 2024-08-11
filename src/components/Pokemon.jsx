import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Loader from "./Loader";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const PokeApi = "https://pokeapi.co/api/v2/pokemon?limit=200";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(PokeApi);
      const data = await res.json();
      const detailPokemon = data.results.map(async (currPokemon) => {
        const resp = await fetch(currPokemon.url);
        const dataResp = await resp.json();
        return dataResp;
      });
      const detailedResp = await Promise.all(detailPokemon);
      console.log(detailedResp);
      setPokemon(detailedResp);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Search functionality
  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <p className="text-center p-3 bg-red-500 text-white font-bold text-2xl">
        Gotta Catch'em All !!
      </p>
      <div className="flex justify-center my-4">
        <input
          className="border-2 border-black px-3 py-1 rounded-lg"
          placeholder="Search Your Pokemon"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchData.map((currPokemon) => (
            <li key={currPokemon.id} className="flex justify-center">
              <PokemonCard pokemonData={currPokemon} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Pokemon;
