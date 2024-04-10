import { Restaurant } from "../App"
import RestaurantComponent from "./RestaurantComponent"
import '../Styles.css'

type Props = {
  restaurants: Restaurant[],
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
}

function Gallery({ restaurants, funcDelete, funcFavorite }: Props) {

  return (
    <>
      <div className="resto-gallery">
        {restaurants.map((restaurant) => {
          return (
            <div>
              <RestaurantComponent restaurant={restaurant} funcDelete={funcDelete} funcFavorite={funcFavorite} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Gallery
