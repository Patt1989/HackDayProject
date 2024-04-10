using Microsoft.EntityFrameworkCore;

public class RestaurantContext : DbContext
{
    public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options)
    {
    }

    public DbSet<backend.Models.Restaurant> Restaurants { get; set; } = default!;
  }
