import { FormEvent, useEffect, useState } from "react";
import Gallery from "./components/Gallery"
import Navbar from "./components/Navbar"
import SearchArea from "./components/SearchArea";
import './Styles.css'


export type Restaurant = {
  id: number;
  name: string;
  foodType: string;
}

function App() {

  const [restaurants, setRestaurants] = useState<Restaurant[]>();

  useEffect(() => {
    fetch('https://localhost:7175/api/Restaurants')
      .then(response => response.json())
      .then(data => 
        setRestaurants(data))
  ;
  }, []);

  async function addRestaurant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const inputName = formData.get('restaurantname_input') as string
    const inputFoodtype = formData.get('foodtype_input') as string

    if (inputName && inputFoodtype) {
      document.getElementsByClassName("error-message")[0].innerHTML = ""

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputName, foodType: inputFoodtype })
      };
      await fetch('https://localhost:7175/api/Restaurants', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setRestaurants([...restaurants!, data])
        });
    }
    else {
      document.getElementsByClassName("error-message")[0].innerHTML = "Please provide valid input"
    }
  }

  function deleteRestaurant(id: string) {
    var intId: number = +id;
    fetch(`https://localhost:7175/api/Restaurants/${id}`, { method: 'DELETE' })
      .then(() => setRestaurants((oldRestaurants) => oldRestaurants?.filter(resto => resto.id != intId)));
  }

  if (restaurants) {
    return (
      <>
        <Navbar />
        <SearchArea func={addRestaurant} />
        <Gallery restaurants={restaurants} func={deleteRestaurant} />
      </>
    )
  }
}

export default App

// useEffect(() => {
//   fetch('https://www.googleapis.com/maps/customsearch/v1?key=AIzaSyAzgiwGOf80Q9OEpKb4OdpPKYauGAx1BFs&cx=56d301fd6412745b6&q=mahalo+stockholm')
//     .then(response => response.json())
//     .then(data => console.log(data));
// }, []);

// useEffect(() => {
//   fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=mahalo%stockholm&key=AIzaSyAzgiwGOf80Q9OEpKb4OdpPKYauGAx1BFs')
//     .then(response => response.json())
//     .then(data => console.log(data));
// }, []);
