import { FormEvent } from 'react';
import '../Styles.css'
import { Restaurant } from '../App';
import { useNavigate } from 'react-router-dom';

type Props = {
  restaurants: Restaurant[]
  func: (event: FormEvent<HTMLFormElement>) => void
}

function EditArea({ restaurants, func }: Props) {

  var navigate = useNavigate()

  var restaurant = restaurants[0];
  var stringId = "" + restaurant.id;

  var foodtypeString = "";
  for (let i = 0; i < restaurant.foodType.length; i++) {
    var aType = restaurant.foodType[i];
    if (i == restaurant.foodType.length - 1)
      foodtypeString = foodtypeString + aType;
    else
      foodtypeString = foodtypeString + aType + ", ";
  }

  return (
    <>
      <div className='search-area'>
        <form id={stringId} onSubmit={func}>
          <fieldset>
            <label>
              <input className="input-field" type="text" name="restaurantname_input-edit" defaultValue={restaurant.name} placeholder='Enter name of restaurant' />
            </label>
            <label>
              <input className="input-field" type="text" name="city_input-edit" defaultValue={restaurant.city} placeholder='Enter city' />
            </label>
            <label>
              <input className="input-field" type="text" name="country_input-edit" defaultValue={restaurant.country} placeholder='Enter country' />
            </label>
            <label>
              <input className="input-field" type="text" name="foodtype_input-edit" defaultValue={foodtypeString} placeholder='Enter types of food (separate by comma)' />
              <small className="error-message" id="invalid-helper"></small>
            </label>
          </fieldset>

          <input className="input-button" type="submit" value="Save changes"/>
        </form>
      </div>
    </>
  )
}

export default EditArea
