import { Restaurant } from '../App'
import { RiHeart3Fill } from 'react-icons/ri';
import '../Styles.css'
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  restaurant: Restaurant,
  funcSetFilteredRestaurants: (id: string) => void,
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
}

function RestaurantComponent({ restaurant, funcSetFilteredRestaurants, funcDelete, funcFavorite }: Props) {

  var navigate = useNavigate();

  var url: string = "https://source.unsplash.com/300x330/?food%20" + restaurant.foodType[0];
  var stringId = "" + restaurant.id;

  var heartId = "heart-" + restaurant.id;
  if (restaurant.favorite)
    var className = "heart";
  else
    var className = "heart-false";

  var foodtypeString = "";
  for (let i = 0; i < restaurant.foodType.length; i++) {
    var aType = restaurant.foodType[i];
    if (i == restaurant.foodType.length - 1)
      foodtypeString = foodtypeString + aType;
    else
      foodtypeString = foodtypeString + aType + " | ";
  }

  return (
    <>
      <div className='resto-element'>
        <h3 className='resto-element_name'>{restaurant.name}</h3>
        <h5 className='resto-element_location'>{restaurant.city}, {restaurant.country}</h5>
        <img className="resto-element_image" src={url} />
        <div className='resto-element_allFoodTypes'>
          <h5 >
            <text className='resto-element_foodType'><span className="shrink">{foodtypeString}</span></text>
          </h5>
        </div>
        <div className='resto-element_buttons'>
          <button className='resto-element_delete-button' onClick={() => {funcSetFilteredRestaurants(stringId); navigate("/edit")}}>Edit</button>
          <button className='resto-element_delete-button' onClick={() => funcDelete(stringId)}>Delete</button>
          <button className='resto-element_favorite-button' onClick={() => funcFavorite(stringId)}><RiHeart3Fill id={heartId} className={className} /></button>
        </div>
      </div>
    </>
  )
}

export default RestaurantComponent
