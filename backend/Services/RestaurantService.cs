using Microsoft.EntityFrameworkCore;
using Microsoft.CodeAnalysis.FlowAnalysis.DataFlow;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.IO.Compression;
using backend.DTOs;
using backend.Models;

namespace backend.Services;

public class RestaurantService
{
    private readonly RestaurantContext _context;

    public RestaurantService(RestaurantContext context)
    {
        _context = context;
    }

    public async Task<Restaurant> PostNewRestaurant(DTORequestRestaurant dtoRestaurant)
    {
        if (_context.Restaurants == null)
        {
            return null;
        }

        var restaurant = new Restaurant
        {
            Name = dtoRestaurant.Name,
            City = dtoRestaurant.City,
            Country = dtoRestaurant.Country,
            FoodType = dtoRestaurant.FoodType
        };

        _context.Restaurants.Add(restaurant);
        await _context.SaveChangesAsync();
        return restaurant;
    }

    public async Task<List<Restaurant>> GetRestaurants()
    {
        if (_context.Restaurants is null)
        {
            return null;
        }

        var restaurants = await _context.Restaurants.ToListAsync();
        return restaurants;
    }

    public async Task<List<Restaurant>> GetRestaurants(string foodType)
    {
        if (_context.Restaurants is null)
        {
            return null;
        }

        var restaurants = await _context.Restaurants.Where(r => r.FoodType.Contains(foodType)).ToListAsync();
        return restaurants;
    }

    public async Task<Restaurant> GetRestaurantById(int id)
    {
        if (_context.Restaurants is null)
        {
            return null;
        }

        var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.Id == id);
        return restaurant;
    }

    public async Task<Restaurant> DeleteRestaurantById(int id)
    {
        if (_context.Restaurants is null)
        {
            return null;
        }

        var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.Id == id);
        if (restaurant is null)
        {
            return null;
        }

        _context.Restaurants.Remove(restaurant);
        await _context.SaveChangesAsync();
        return restaurant;
    }

    public async Task<Restaurant> PatchFavoriteById(int id)
    {
        if (_context.Restaurants == null)
        {
            throw new FileNotFoundException("Table Restaurants does not exist");
        }

        var restaurant = await _context.Restaurants.FindAsync(id);
        if (restaurant == null)
        {
            throw new FileNotFoundException("This restaurant does not exist");
        }

        var favorite = restaurant.Favorite;
        restaurant.Favorite = !favorite;
        try
        {
            _context.Restaurants.Update(restaurant);
            await _context.SaveChangesAsync();
            return restaurant;
        }
        catch
        {
            throw new ArgumentException("Something went wrong, restaurant could not be updated");
        }
    }

    // public async Task<Restaurant> PutRestaurantById(int id, Restaurant restaurant)
    // {
    //     if (_context.Restaurants == null)
    //     {
    //         throw new FileNotFoundException("Table Restaurants does not exist");
    //     }

    //     var oldRestaurant = await _context.Restaurants.FindAsync(id);
    //     if (oldRestaurant == null)
    //     {
    //         throw new FileNotFoundException("This Restaurant does not exist");
    //     }

    //     oldRestaurant = restaurant;

    //     try
    //     {
    //         _context.Restaurants.Update(oldRestaurant);
    //         await _context.SaveChangesAsync();

    //         return oldRestaurant;
    //     }
    //     catch
    //     {
    //         throw new ArgumentException("Something went wrong, restaurant could not be updated");
    //     }
    // }

}