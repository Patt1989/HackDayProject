import RestaurantComponent from "./RestaurantComponent"
import { Restaurant } from "../App"
import '../Styles.css'

type Props = {
  restaurants: Restaurant[],
 func: (id: string) => void
}


function Gallery({ restaurants, func }: Props) {

  return (
    <>
      <div className="resto-gallery">
        {restaurants.map((restaurant) => {
          return (
            <div>
              <RestaurantComponent restaurant={restaurant} func={func} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Gallery
