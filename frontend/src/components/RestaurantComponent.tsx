import { Restaurant } from '../App'
import '../Styles.css'

type Props = {
  restaurant: Restaurant,
  func: (id: string) => void
}

function RestaurantComponent({ restaurant, func }: Props) {

  var url: string = "https://source.unsplash.com/300x330/?food%20" + restaurant.foodType;
  var stringId = "" + restaurant.id;
  console.log("stringId =" + stringId)

  return (
    <>
      <div className='resto-element'>
        <h1 className='resto-element_name'>{restaurant.name}</h1>
        <img className="resto-element_image" src={url} />
        <h5 className='resto-element_foodType'>Type of food: {restaurant.foodType}</h5>
        <button className={"resto-element_delete-button"} onClick={() => func(stringId)}>Delete</button>
      </div>
    </>
  )
}

export default RestaurantComponent
