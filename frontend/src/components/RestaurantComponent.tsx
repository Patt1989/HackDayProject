import { Link } from 'react-router-dom';
import { Restaurant } from '../App'
import '../Styles.css'
import { RiHeart3Fill } from 'react-icons/ri';

type Props = {
  restaurant: Restaurant,
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
}

function RestaurantComponent({ restaurant, funcDelete, funcFavorite }: Props) {

  var url: string = "https://source.unsplash.com/300x330/?food%20" + restaurant.foodType[0];
  var stringId = "" + restaurant.id;

  var heartId = "heart-" + restaurant.id;
  if (restaurant.favorite)
    var className = "heart";
  else
    var className = "heart-false";

  return (
    <>
      <div className='resto-element'>
        <h3 className='resto-element_name'>{restaurant.name}</h3>
        <h5 className='resto-element_location'>{restaurant.city}, {restaurant.country}</h5>
        <img className="resto-element_image" src={url} />
        <h5 className='resto-element_foodType'>
          <text>| </text>
        {restaurant.foodType.map((aFoodtype) => {
          return (
            <text>{aFoodtype} | </text>
        )})}
        </h5>
        <div className='resto-element_buttons'>
          <button><Link className='resto-element_edit-link' to="/edit">Edit</Link></button>
          <button className='resto-element_delete-button' onClick={() => funcDelete(stringId)}>Delete</button>
          <button className='resto-element_favorite-button' onClick={() => funcFavorite(stringId)}><RiHeart3Fill id={heartId} className={className} /></button>
        </div>
      </div>
    </>
  )
}

export default RestaurantComponent
