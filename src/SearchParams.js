import { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "rabbit", "dog", "cat"]; // so that the object never gets modified, we're keeping it outside react class

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-container">
      <div className="search-params">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestPets();
          }}
        >
          <label htmlFor="location">
            Location
            <input
              className="search-input"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              className="search-input"
              id="animal"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
            >
              <option />
              {ANIMALS.map((animal) => (
                <option key={animal}>{animal}</option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              className="search-input"
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              onBlur={(e) => setBreed(e.target.value)}
            >
              <option />
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="theme">
            Theme
            <select value={theme} onChange={e => setTheme(e.target.value)} className="search-input">
              <option value="peru">Peru</option>
              <option value="mediumorchid">Medium Orchid</option>
              <option value="darkblue">Dark Blue</option>
            </select>
          </label>

          <button className="search-submit-btn" style={{backgroundColor: theme}}>Submit</button>
        </form>
      </div>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
