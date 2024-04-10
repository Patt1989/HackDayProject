import { Restaurant } from "../App";
import { FormEvent } from "react";
import Gallery from "../components/Gallery"
import Navbar from "../components/Navbar"
import SearchArea from "../components/SearchArea";
import '../Styles.css/'

type Props = {
  restaurants: Restaurant[],
  funcAddRestaurant: (event: FormEvent<HTMLFormElement>) => void
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
  funcResetFilter: () => void
}

function Home({ restaurants, funcAddRestaurant, funcDelete, funcFavorite, funcResetFilter }: Props) {

    return (
      <>
        <Navbar funcResetFilter={funcResetFilter}/>
        <SearchArea func={funcAddRestaurant} />
        <Gallery restaurants={restaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
      </>
    )
}

export default Home