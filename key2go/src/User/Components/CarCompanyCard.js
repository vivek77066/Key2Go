import "./CarCard.css";
import { url } from "../../Commons/constants";

const CarTypeCard = ({ carsType, onItemSelect }) => {
  return (
    <div className="car-type-wrapper">
      {carsType.map((carType) => {
        return (
          <div className="car-type-container" key={carType.id}>
            <div
              className="car-type-card"
              onClick={() => {
                onItemSelect(carType);
              }}
            >
              <img
                src={url + "/" + carType.carImage}
                className="car-image"
                alt={carType.typeName}
              />
              <div className="type-title">{carType.typeName}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarTypeCard;
