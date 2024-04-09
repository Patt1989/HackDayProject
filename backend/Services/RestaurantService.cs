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

    public async Task<List<DTORequestRestaurant>> GetRestaurants()
    {
        if (_context.Restaurants is null)
        {
            return null;
        }

        var restaurants = await _context.Restaurants.ToListAsync();
        List<DTORequestRestaurant> dtoRestaurants = [];

        foreach (var resto in restaurants)
        {
            var dtoRestaurant = new DTORequestRestaurant
            {
                Name = resto.Name,
                FoodType = resto.FoodType
            };
            dtoRestaurants.Add(dtoRestaurant);
        }
        return dtoRestaurants;
    }

    public async Task<List<DTORequestRestaurant>> GetRestaurants(string foodType)
    {
        if (_context.Restaurants is null)
        {
            return null;
        }

        var restaurants = await _context.Restaurants.Where(c => c.FoodType == foodType).ToListAsync();
        List<DTORequestRestaurant> dtoRestaurants = [];

        foreach (var resto in restaurants)
        {
            var dtoRestaurant = new DTORequestRestaurant
            {
                Name = resto.Name,
                FoodType = resto.FoodType
            };
            dtoRestaurants.Add(dtoRestaurant);
        }
        return dtoRestaurants;
    }

    public async Task<DTORequestRestaurant> GetRestaurantById(int id)
    {
        if (_context.Restaurants is null)
        {
            return null;
        }

        var restaurant = await _context.Restaurants.FirstOrDefaultAsync(c => c.Id == id);
        if (restaurant is null)
        {
            return null;
        }

        var dtoRestaurant = new DTORequestRestaurant
        {
            Name = restaurant.Name,
            FoodType = restaurant.FoodType
        };
        return dtoRestaurant;
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