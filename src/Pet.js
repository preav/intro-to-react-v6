import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return (
    <div id={id} className="pet-wrapper">
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img className="image-container" src={hero} alt="animal image" />
        </div>
        <div className="info">
          <h2 className="info-name">{name}</h2>
          <h3 className="info-details">{`${animal} - ${breed} - ${location}`}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Pet;
