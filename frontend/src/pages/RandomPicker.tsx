import { FormEvent } from 'react'
import { Restaurant } from '../App'
import FilterArea from '../components/FilterArea'
import Navbar from '../components/Navbar'
import Gallery from '../components/Gallery'
import '../Styles.css'

type Props = {
  restaurants: Restaurant[],
  filteredRestaurants: Restaurant[],
  funcFilter: (event: FormEvent<HTMLFormElement>) => void
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
  funcResetFilter: () => void
}

function RandomPicker({ restaurants, filteredRestaurants, funcFilter, funcDelete, funcFavorite, funcResetFilter }: Props) {

  if (filteredRestaurants.length > 4) {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter} />
        <FilterArea restaurants={restaurants} func={funcFilter} />
        <Gallery restaurants={filteredRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
      </>
    )
  }
  if (filteredRestaurants.length > 0) {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter} />
        <FilterArea restaurants={restaurants} func={funcFilter} />
        <Gallery restaurants={filteredRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
        <div className='filler-short'></div>
      </>
    )
  }
  else {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter} />
        <FilterArea restaurants={restaurants} func={funcFilter} />
        <div className='filler-short'><text className='announcement'>No restaurants match your filters</text></div>
      </>
    )
  }
}

export default RandomPicker