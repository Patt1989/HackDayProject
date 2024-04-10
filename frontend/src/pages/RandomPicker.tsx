import { FormEvent, useState } from 'react'
import { Restaurant } from '../App'
import '../Styles.css'
import FilterArea from '../components/FilterArea'
import Navbar from '../components/Navbar'
import Gallery from '../components/Gallery'

type Props = {
  restaurants: Restaurant[],
  filteredRestaurants: Restaurant[],
  funcFilter: (event: FormEvent<HTMLFormElement>) => void
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
  funcResetFilter: () => void
}

function RandomPicker({ restaurants, filteredRestaurants, funcFilter, funcDelete, funcFavorite, funcResetFilter }: Props) {

  if (filteredRestaurants.length > 0) {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter}/>
        <FilterArea restaurants={restaurants} func={funcFilter} />
        <Gallery restaurants={filteredRestaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
      </>
    )
  }
  else {
    return (
      <>
        <Navbar funcResetFilter={funcResetFilter}/>
        <FilterArea restaurants={restaurants} func={funcFilter} />
        <text>No restaurants match your filters</text>
      </>
    )
  }
}

export default RandomPicker