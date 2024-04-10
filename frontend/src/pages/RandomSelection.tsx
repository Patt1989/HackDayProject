import { Restaurant } from '../App'
import Navbar from '../components/Navbar'
import Gallery from '../components/Gallery'
import '../Styles.css'

type Props = {
  filteredRestaurants: Restaurant[],
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
  funcResetFilter: () => void
}

function RandomSelection({ filteredRestaurants, funcFavorite, funcDelete, funcResetFilter }: Props) {

    return (
      <>
        <Navbar funcResetFilter={funcResetFilter} />
        <Gallery restaurants={filteredRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
      </>
    )
}

export default RandomSelection