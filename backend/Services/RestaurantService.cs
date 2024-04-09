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

        var restaurants = await _context.Restaurants.Where(r => r.FoodType == foodType).ToListAsync();
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

    // // PUT artist of CD
    // public async Task<DTORequestCD> PutCDArtistById(int id, string artist)
    // {
    //     if (_context.CDs == null)
    //     {
    //         throw new FileNotFoundException("Table CDs does not exist");
    //     }

    //     var cd = await _context.CDs.FindAsync(id);
    //     if (cd == null)
    //     {
    //         throw new FileNotFoundException("This CD does not exist");
    //     }
    //     cd.ArtistName = artist;

    //     try
    //     {
    //         _context.CDs.Update(cd);
    //         await _context.SaveChangesAsync();

    //         var genre = await _context.Genres.FirstOrDefaultAsync(g => g.Id == cd.GenreId);
    //         var dtoCD = new DTORequestCD
    //         {
    //             Name = cd.Name,
    //             ArtistName = cd.ArtistName,
    //             Description = cd.Description,
    //             PurchasedDate = cd.PurchasedDate,
    //             Genre = genre.Name
    //         };
    //         return dtoCD;
    //     }
    //     catch
    //     {
    //         throw new ArgumentException("Something went wrong, cd could not be updated");
    //     }
    // }

    // // PUT genre of CD
    // public async Task<DTORequestCD> PutCDGenreById(int id, string genre)
    // {
    //     if (_context.CDs == null)
    //     {
    //         throw new FileNotFoundException("Table CDs does not exist");
    //     }

    //     var cd = await _context.CDs.FindAsync(id);
    //     if (cd == null)
    //     {
    //         throw new FileNotFoundException("This CD does not exist");
    //     }

    //     var findGenre = await _context.Genres.FirstOrDefaultAsync(g => g.Name == genre);
    //     if (findGenre is null)
    //     {
    //         findGenre = new Genre
    //         {
    //             Name = genre
    //         };
    //     }
    //     cd.Genre = findGenre;

    //     try
    //     {
    //         _context.CDs.Update(cd);
    //         await _context.SaveChangesAsync();

    //         var newGenre = await _context.Genres.FirstOrDefaultAsync(g => g.Id == cd.GenreId);
    //         var dtoCD = new DTORequestCD
    //         {
    //             Name = cd.Name,
    //             ArtistName = cd.ArtistName,
    //             Description = cd.Description,
    //             PurchasedDate = cd.PurchasedDate,
    //             Genre = newGenre.Name
    //         };
    //         return dtoCD;
    //     }
    //     catch
    //     {
    //         throw new ArgumentException("Something went wrong, cd could not be updated");
    //     }
    // }

}