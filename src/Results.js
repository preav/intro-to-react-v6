import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="result-container">
      {!pets.length ? (
        <h3>No pets found!</h3>
      ) : (
        pets.map((pet) => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            key={pet.id}
            location={`${pet.city}, ${pet.state}`}
            images={pet.images}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
