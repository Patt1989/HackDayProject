import { FormEvent, useEffect, useState } from "react";
import Gallery from "./components/Gallery"
import Navbar from "./components/Navbar"
import SearchArea from "./components/SearchArea";
import './Styles.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Favorites from "./pages/Favorites"
import RandomPicker from "./pages/RandomPicker"

export type Restaurant = {
  id: number;
  name: string;
  city: string,
  country: string,
  foodType: string[];
  favorite: number;
}

function App() {

  const [restaurants, setRestaurants] = useState<Restaurant[]>();

  useEffect(() => {
    fetch('https://localhost:7175/api/Restaurants')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRestaurants(data);
      });
  }, []);

  async function addRestaurant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const inputName = formData.get('restaurantname_input') as string
    const inputCity = formData.get('city_input') as string
    const inputCountry = formData.get('country_input') as string
    const inputFoodtype = formData.get('foodtype_input') as string
    const inputFoodtype_array = inputFoodtype.split(',').map(s => s.trim()) as string[];

    if (inputName && inputCity && inputCountry && inputFoodtype) {
      document.getElementsByClassName("error-message")[0].innerHTML = ""

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputName, city: inputCity, country: inputCountry, foodType: inputFoodtype_array })
      };
      await fetch('https://localhost:7175/api/Restaurants', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setRestaurants([...restaurants!, data])
        });

      var formElement: HTMLFormElement = document.getElementById('form_addRestaurant') as HTMLFormElement;
      formElement!.reset();
    }
    else {
      document.getElementsByClassName("error-message")[0].innerHTML = "Please complete the entire form"
    }
  }

  async function deleteRestaurant(id: string) {
    var intId: number = +id;
    await fetch(`https://localhost:7175/api/Restaurants/${id}`, { method: 'DELETE' })
      .then(() => setRestaurants((oldRestaurants) => oldRestaurants?.filter(resto => resto.id != intId)));
  }

  async function changeFavoriteStatus(id: string) {
    var intId: number = +id;
    await fetch(`https://localhost:7175/api/Restaurants/${id}/favorite`, { method: 'PATCH' });
    await fetch('https://localhost:7175/api/Restaurants')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRestaurants(data);
      })

    // var selectedHeartElement = document.getElementById("heart-" + id);
    // if (selectedHeartElement?.classList.contains("heart")) {
    //   selectedHeartElement.classList.remove("heart");
    //   selectedHeartElement.classList.add("heart-false");
    // }
    // if (selectedHeartElement?.classList.contains("heart-false")) {
    //   selectedHeartElement.classList.remove("heart-false");
    //   selectedHeartElement.classList.add("heart");
    // }
  }

  if (restaurants) {
    return (
      <>
        <Navbar />
        <SearchArea func={addRestaurant} />
        <Gallery restaurants={restaurants} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} />

        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="edit" element={<Edit />} />
              <Route path="randompicker" element={<RandomPicker />} />
            </Route>
          </Routes>
        </BrowserRouter>
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
