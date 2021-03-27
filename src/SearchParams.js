import pet, { ANIMALS } from "@frontendmasters/pet";
import React, { useEffect, useState, useContext } from "react";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

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
  const [theme, setTheme] = useContext(ThemeContext);

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
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Darkblue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>

        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
