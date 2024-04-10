import { Restaurant } from '../App'
import Gallery from '../components/Gallery'
import Navbar from '../components/Navbar'
import '../Styles.css'

type Props = {
  restaurants: Restaurant[],
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
  funcResetFilter: () => void
}

function Favorites({ restaurants, funcDelete, funcFavorite, funcResetFilter }: Props) {

  var favoriteRestaurants = restaurants.filter(r => r.favorite);

  if (favoriteRestaurants.length > 0) {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter}/>
        <Gallery restaurants={favoriteRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
      </>
    )
  }
  else {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter}/>
        <text>You have no favorites</text>
      </>
    )
  }
}

export default Favorites