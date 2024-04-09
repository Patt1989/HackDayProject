import RestaurantComponent from "./RestaurantComponent"
import { Restaurant } from "../App"
import '../Styles.css'

type Props = {
  restaurants: Restaurant[]
}


function Gallery({ restaurants }: Props) {

  return (
    <>
      <div className="resto-gallery">
        {restaurants.map((restaurant) => {
          return (
            <div>
              <RestaurantComponent restaurant={restaurant} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Gallery
