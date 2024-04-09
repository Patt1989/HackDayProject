import { FormEvent } from 'react';
import '../Styles.css'

type Props = {
  func: (event: FormEvent<HTMLFormElement>) => void
}

function SearchArea({ func }: Props) {


  return (
    <>
      <div className='search-area'>
        <form onSubmit={func}>
          <fieldset>
            <label>
              <input className="input-field" name="restaurantname_input" placeholder="Enter name of restaurant" />
            </label>
            <label>
              <input className="input-field" name="foodtype_input" placeholder="Enter type of food" />
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
