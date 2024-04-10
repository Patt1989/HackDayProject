import { FormEvent } from 'react';
import '../Styles.css'

type Props = {
  func: (event: FormEvent<HTMLFormElement>) => void
}

function SearchArea({ func }: Props) {

  return (
    <>
      <div className='search-area'>
        <form id="form_addRestaurant" onSubmit={func}>
          <fieldset>
            <label>
              <input className="input-field" type="text" name="restaurantname_input" placeholder="Enter name of restaurant" />
            </label>
            <label>
              <input className="input-field" type="text" name="city_input" placeholder="Enter city" />
            </label>
            <label>
              <input className="input-field" type="text" name="country_input" placeholder="Enter country" />
            </label>
            <label>
              <input className="input-field" type="text" name="foodtype_input" placeholder="Enter types of food (separate by comma)" />
              <small className="error-message" id="invalid-helper"></small>
            </label>
          </fieldset>

          <input className="input-button" type="submit" value="Add restaurant" />
        </form>
      </div>
    </>
  )
}

export default SearchArea
