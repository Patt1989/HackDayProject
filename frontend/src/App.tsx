import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import Home from "./pages/Home";
import RandomSelection from "./pages/RandomSelection";
import Favorites from "./pages/Favorites"
import RandomPicker from "./pages/RandomPicker"
import './Styles.css'
import Edit from "./pages/Edit";
import { HiDesktopComputer } from "react-icons/hi";

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
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>();
  const [filterFavorite, setFilterFavorite] = useState<string>("All");

  useEffect(() => {
    fetch('https://localhost:7175/api/Restaurants')
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
        setFilteredRestaurants(data);
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
    setFilteredRestaurants((oldRestaurants) => oldRestaurants?.filter(resto => resto.id != intId))
  }

  async function editRestaurant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const inputName = formData.get('restaurantname_input-edit') as string
    const inputCity = formData.get('city_input-edit') as string
    const inputCountry = formData.get('country_input-edit') as string
    const inputFoodtype = formData.get('foodtype_input-edit') as string
    const inputFoodtype_array = inputFoodtype.split(',').map(s => s.trim()) as string[];
    const id = form.id;

    if (inputName && inputCity && inputCountry && inputFoodtype) {
      document.getElementsByClassName("error-message")[0].innerHTML = ""

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputName, city: inputCity, country: inputCountry, foodType: inputFoodtype_array })
      };
      await fetch(`https://localhost:7175/api/Restaurants/${id}/`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          var newRestaurants = [...restaurants!];
          var index = newRestaurants?.findIndex(r => r.id == +id)
          newRestaurants[index] = data;
          setRestaurants(newRestaurants)
        });

      var hiddenText = document.getElementsByClassName("hidden")[0];
      hiddenText.classList.remove("hidden");
      hiddenText.classList.add("visible")
    }
    else {
      document.getElementsByClassName("error-message")[0].innerHTML = "Please complete the entire form"
    }
  }

  async function changeFavoriteStatus(id: string) {
    var intId: number = +id;
    await fetch(`https://localhost:7175/api/Restaurants/${id}/favorite`, { method: 'PATCH' })
      .then(response => response.json())
      .then(data => {
        var newRestaurants = [...restaurants!];
        var index = newRestaurants?.findIndex(r => r.id == +id)
        newRestaurants[index] = data;
        setRestaurants(newRestaurants)

        var newFilteredRestaurants = [...filteredRestaurants!];
        var index = newFilteredRestaurants?.findIndex(r => r.id == +id)
        newFilteredRestaurants[index] = data;
        setFilteredRestaurants(newFilteredRestaurants)

        if (filterFavorite != "All") {
          setFilteredRestaurants((oldRestaurants) => oldRestaurants?.filter(resto => resto.id != intId));
        }
      });
  }

  async function filterRestaurant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const natevent = event.nativeEvent as SubmitEvent;
    const submitter = natevent.submitter as HTMLButtonElement;
    const submitterName = submitter!.name;
    const formData = new FormData(form);
    const inputLocation = formData.get('location') as string
    const inputLocation_array = inputLocation.split(',').map(s => s.trim()) as string[];
    const inputCity = inputLocation_array[0];
    const inputCountry = inputLocation_array[1];
    var selectedRestaurants = restaurants!.filter(r => r.city == inputCity && r.country == inputCountry);

    const inputFoodtype = formData.get('foodtype') as string
    if (inputFoodtype != "All") {
      selectedRestaurants = selectedRestaurants.filter(r => r.foodType.find(t => t == inputFoodtype));
    }

    const inputFavorite = formData.get('favorite') as string
    setFilterFavorite(inputFavorite);
    if (inputFavorite != "All") {
      const inputFavoriteInt = +inputFavorite;
      selectedRestaurants = selectedRestaurants.filter(r => r.favorite == inputFavoriteInt);
    }

    if (submitterName == "submitRandom") {
      const index = Math.floor(Math.random() * selectedRestaurants.length);
      const indexId = selectedRestaurants[index].id;
      selectedRestaurants = selectedRestaurants.filter(r => r.id == indexId);
    }

    setFilteredRestaurants(selectedRestaurants);
  }

  async function resetFilter() {
    await setFilteredRestaurants(restaurants);
    var visibleElement = document.getElementsByClassName("visible")[0];
    if (visibleElement) {
      visibleElement.classList.remove("visible");
      visibleElement.classList.add("hidden");
    }
  }

  async function changeFilteredRestaurants(id: string) {
    const intId = +id;
    const restoToEdit = restaurants!.filter(r => r.id == intId);
    await setFilteredRestaurants(restoToEdit);
  }

  if (restaurants && filteredRestaurants) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home restaurants={restaurants} funcAddRestaurant={addRestaurant} funcSetFilteredRestaurants={changeFilteredRestaurants} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} funcResetFilter={resetFilter} />} />
              <Route path="favorites" element={<Favorites restaurants={restaurants} funcSetFilteredRestaurants={changeFilteredRestaurants} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} funcResetFilter={resetFilter} />} />
              <Route path="randomselection" element={<RandomSelection filteredRestaurants={filteredRestaurants} funcSetFilteredRestaurants={changeFilteredRestaurants} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} funcResetFilter={resetFilter} />} />
              <Route path="randompicker" element={<RandomPicker restaurants={restaurants} filteredRestaurants={filteredRestaurants} funcSetFilteredRestaurants={changeFilteredRestaurants} funcFilter={filterRestaurant} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} funcResetFilter={resetFilter} />} />
              <Route path="edit" element={<Edit restaurants={filteredRestaurants} funcSetFilteredRestaurants={changeFilteredRestaurants} funcEdit={editRestaurant} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} funcResetFilter={resetFilter} />} />
              <Route path="*" element={<Home restaurants={restaurants} funcAddRestaurant={addRestaurant} funcSetFilteredRestaurants={changeFilteredRestaurants} funcDelete={deleteRestaurant} funcFavorite={changeFavoriteStatus} funcResetFilter={resetFilter} />} />
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
