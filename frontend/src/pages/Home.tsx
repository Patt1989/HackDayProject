import Gallery from "../components/Gallery"
import Navbar from "../components/Navbar"
import SearchArea from "../components/SearchArea";
import { Restaurant } from "../App";
import { FormEvent } from "react";
import '../Styles.css/'

type Props = {
  restaurants: Restaurant[],
  funcAddRestaurant: (event: FormEvent<HTMLFormElement>) => void
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
}

function Home({ restaurants, funcAddRestaurant, funcDelete, funcFavorite }: Props) {

    return (
      <>
        <Navbar />
        <SearchArea func={funcAddRestaurant} />
        <Gallery restaurants={restaurants} funcDelete={funcDelete} funcFavorite={funcFavorite} />
      </>
    )
}

export default Home