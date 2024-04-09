import { Restaurant } from '../App'
import '../Styles.css'

type Props = {
  restaurant: Restaurant
}

function RestaurantComponent({ restaurant }: Props) {

  var url: string = "https://source.unsplash.com/random/900x1000/?" + restaurant.foodType;

  return (
    <>
      <div className='resto-element'>
        <h1 className='resto-element_name'>{restaurant.name}</h1>
        <img className="resto-element_image" src={url} />
        <h5 className='resto-element_foodType'>Type of food: {restaurant.foodType}</h5>
      </div>
    </>
  )
}

export default RestaurantComponent
