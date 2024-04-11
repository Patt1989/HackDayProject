import { Restaurant } from "../App";
import { FormEvent, useLayoutEffect } from "react";
import Gallery from "../components/Gallery"
import Navbar from "../components/Navbar"
import SearchArea from "../components/SearchArea";
import '../Styles.css/'
import EditArea from "../components/EditArea";
import { useNavigate } from "react-router-dom";

type Props = {
  restaurants: Restaurant[],
  funcSetFilteredRestaurants: (id: string) => void,
  funcEdit: (event: FormEvent<HTMLFormElement>) => void,
  funcDelete: (id: string) => void,
  funcFavorite: (id: string) => void
  funcResetFilter: () => void
}

function Edit({ restaurants, funcSetFilteredRestaurants, funcEdit, funcDelete, funcFavorite, funcResetFilter }: Props) {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  var navigate = useNavigate();

  return (
    <>
      <Navbar funcResetFilter={funcResetFilter} />
      <EditArea restaurants={restaurants} func={funcEdit} />
      <div className="hidden edit-announcement-container">
        <text className='announcement'>Changes were saved!</text>
        <button onClick={() => { navigate("/") }}>Back to home</button>
      </div>
      <div className="filler-short"></div>
    </>
  )
}

export default Edit