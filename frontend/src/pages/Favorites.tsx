import { Restaurant } from '../App'
import Gallery from '../components/Gallery'
import Navbar from '../components/Navbar'
import '../Styles.css'

type Props = {
  restaurants: Restaurant[],
  funcSetFilteredRestaurants: (id: string) => void,
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
  funcResetFilter: () => void
}

function Favorites({ restaurants, funcSetFilteredRestaurants, funcDelete, funcFavorite, funcResetFilter }: Props) {

  var favoriteRestaurants = restaurants.filter(r => r.favorite);

  if (favoriteRestaurants.length > 0) {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter}/>
        <Gallery restaurants={favoriteRestaurants} funcSetFilteredRestaurants={funcSetFilteredRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
      </>
    )
  }
  else {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter}/>
        <div className='filler-long'><text className='announcement'>You have no favorites</text></div>
      </>
    )
  }
}

export default Favorites