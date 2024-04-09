using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly RestaurantService _service;

        public RestaurantsController(RestaurantService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<Restaurant>> PostRestaurant(DTORequestRestaurant restaurant)
        {
            var result = await _service.PostNewRestaurant(restaurant);
            if (result is null)
            {
                return NotFound();
            }
            return CreatedAtAction("GetRestaurant", new { id = result.Id }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DTORequestRestaurant>>> GetAll(string foodType = null)
        {
            List<DTORequestRestaurant> result;
            if (foodType is null)
            {
                result = await _service.GetRestaurants();
            }
            else
            {
                result = await _service.GetRestaurants(foodType);
            }

            if (result is null)
            {
                return NotFound();
            }
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DTORequestRestaurant>> GetRestaurant(int id)
        {
            var result = await _service.GetRestaurantById(id);
            if (result is null)
            {
                return NotFound();
            }
            return result;
        }

        //     // PUT: api/CDs/{id}/artist
        //     [HttpPut("{id}/artist")]
        //     public async Task<ActionResult<DTORequestCD>> PutCDArtist(int id, string artist)
        //     {
        //         try
        //         {
        //             return await _service.PutCDArtistById(id, artist);
        //         }
        //         catch (FileNotFoundException e)
        //         {
        //             return NotFound(e.Message);
        //         }
        //         catch (ArgumentException e)
        //         {
        //             return BadRequest(e.Message);
        //         }
        //     }

        //     // PUT: api/CDs/{id}/genre
        //     [HttpPut("{id}/genre")]
        //     public async Task<ActionResult<DTORequestCD>> PutCDGenre(int id, string genre)
        //     {
        //         try
        //         {
        //             return await _service.PutCDGenreById(id, genre);
        //         }
        //         catch (FileNotFoundException e)
        //         {
        //             return NotFound(e.Message);
        //         }
        //         catch (ArgumentException e)
        //         {
        //             return BadRequest(e.Message);
        //         }
        //     }
    }
}
