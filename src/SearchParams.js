import pet, { ANIMALS } from "@frontendmasters/pet";
import React, { useEffect, useState } from "react";
import useDropdown from "./useDropdown";
import Results from "./Results";

const SearchParams = () => {
  const [breeds, setBreeds] = useState([]);
  // console.log("breeds=>", breeds);
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  // console.log("animal=>", animal);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  // console.log("breed=>", breed);
  const [pets, setPets] = useState([]);
  // console.log("PETS", pets);

  const requestPets = async () => {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  };

  useEffect(() => {
    // console.log("use effect runs")
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then((response) => {
      const breedStrings = response.breeds.map((breedObj) => breedObj.name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Enter your location"
            onChange={(e) => setLocation(e.target.value)}
            onBlur={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
