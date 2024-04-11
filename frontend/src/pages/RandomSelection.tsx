import { Restaurant } from '../App'
import Navbar from '../components/Navbar'
import Gallery from '../components/Gallery'
import '../Styles.css'

type Props = {
  filteredRestaurants: Restaurant[],
  funcSetFilteredRestaurants: (id: string) => void,
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
  funcResetFilter: () => void
}

function RandomSelection({ filteredRestaurants, funcSetFilteredRestaurants, funcFavorite, funcDelete, funcResetFilter }: Props) {

    return (
      <>
        <Navbar funcResetFilter={funcResetFilter} />
        <Gallery restaurants={filteredRestaurants} funcSetFilteredRestaurants={funcSetFilteredRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
      </>
    )
}

export default RandomSelection