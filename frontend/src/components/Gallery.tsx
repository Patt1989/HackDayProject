import { Restaurant } from "../App"
import RestaurantComponent from "./RestaurantComponent"
import '../Styles.css'

type Props = {
  restaurants: Restaurant[],
  funcSetFilteredRestaurants: (id: string) => void,
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
}

function Gallery({ restaurants, funcSetFilteredRestaurants, funcDelete, funcFavorite }: Props) {

  return (
    <>
      <div className="resto-gallery">
        {restaurants.map((restaurant) => {
          return (
            <div>
              <RestaurantComponent restaurant={restaurant} funcSetFilteredRestaurants={funcSetFilteredRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Gallery
