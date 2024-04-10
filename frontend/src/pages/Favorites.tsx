import { Restaurant } from '../App'
import Gallery from '../components/Gallery'
import Navbar from '../components/Navbar'
import '../Styles.css'

type Props = {
  restaurants: Restaurant[],
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
}

function Favorites({ restaurants, funcDelete, funcFavorite }: Props) {

  var favoriteRestaurants = restaurants.filter(r => r.favorite);

  return (
    <>
      <Navbar />
      <Gallery restaurants={favoriteRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
    </>
  )
}

export default Favorites