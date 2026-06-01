using BrewPoint.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BrewPoint.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Coffee> Coffees => Set<Coffee>();
    public DbSet<Location> Locations => Set<Location>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        builder.Entity<Role>().HasIndex(r => r.Name).IsUnique();
        builder.Entity<Coffee>().Property(c => c.Price).HasPrecision(10, 2);
        builder.Entity<Order>().Property(o => o.TotalAmount).HasPrecision(10, 2);
        builder.Entity<OrderItem>().Property(i => i.UnitPrice).HasPrecision(10, 2);
        builder.Entity<Location>().Property(l => l.Latitude).HasPrecision(9, 6);
        builder.Entity<Location>().Property(l => l.Longitude).HasPrecision(9, 6);

        builder.Entity<Role>().HasData(new Role { Id = 1, Name = "Admin" }, new Role { Id = 2, Name = "User" });
        builder.Entity<User>().HasData(
            new User { Id = 1, FullName = "BrewPoint Admin", Email = "admin@brewpoint.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"), Phone = "+92 300 0000001", RoleId = 1 },
            new User { Id = 2, FullName = "Demo Customer", Email = "user@brewpoint.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("User@123"), Phone = "+92 300 0000002", RoleId = 2 }
        );
        builder.Entity<Location>().HasData(
            new Location { Id = 1, Name = "BrewPoint F-6 Markaz", Address = "Street 30, F-6 Markaz, Islamabad", Phone = "+92 51 111 276 001", OpeningHours = "7:00 AM - 11:00 PM", Latitude = 33.7294m, Longitude = 73.0757m },
            new Location { Id = 2, Name = "BrewPoint Blue Area", Address = "Jinnah Avenue, Blue Area, Islamabad", Phone = "+92 51 111 276 002", OpeningHours = "7:00 AM - 12:00 AM", Latitude = 33.7077m, Longitude = 73.0498m },
            new Location { Id = 3, Name = "BrewPoint I-8 Markaz", Address = "I-8 Markaz, Islamabad", Phone = "+92 51 111 276 003", OpeningHours = "8:00 AM - 11:00 PM", Latitude = 33.6685m, Longitude = 73.0752m },
            new Location { Id = 4, Name = "BrewPoint Bahria Town Phase 7", Address = "Bahria Town Phase 7, Islamabad", Phone = "+92 51 111 276 004", OpeningHours = "8:00 AM - 1:00 AM", Latitude = 33.5165m, Longitude = 73.1050m }
        );

        string sizes = "Small,Medium,Large";
        builder.Entity<Coffee>().HasData(
            new Coffee { Id = 1, Name = "Islamabad Iced Latte", Description = "Cold espresso, milk, and a clean city-break finish.", Price = 640, Category = "Iced", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-iced-latte.png", Ingredients = "Espresso,Milk,Ice", Calories = 180, IsFeatured = true, IsAvailable = true },
            new Coffee { Id = 2, Name = "Pink Cloud Mocha", Description = "Silky mocha with pink vanilla foam.", Price = 760, Category = "Mocha", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-pink-cloud-mocha.png", Ingredients = "Espresso,Cocoa,Vanilla Foam", Calories = 310, IsFeatured = true, IsAvailable = true },
            new Coffee { Id = 3, Name = "Classic Americano", Description = "Bold espresso stretched with hot water.", Price = 420, Category = "Black", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-classic-americano.png", Ingredients = "Espresso,Water", Calories = 15, IsFeatured = false, IsAvailable = true },
            new Coffee { Id = 4, Name = "Saffron Cappuccino", Description = "Cappuccino with warm saffron aromatics.", Price = 720, Category = "Hot", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-saffron-cappuccino.png", Ingredients = "Espresso,Milk,Saffron", Calories = 220, IsFeatured = true, IsAvailable = true },
            new Coffee { Id = 5, Name = "Vanilla Cold Brew", Description = "Slow-steeped cold brew with vanilla.", Price = 680, Category = "Cold Brew", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-vanilla-cold-brew.png", Ingredients = "Cold Brew,Vanilla", Calories = 140, IsFeatured = false, IsAvailable = true },
            new Coffee { Id = 6, Name = "Salted Caramel Latte", Description = "Caramel latte with a salted snap.", Price = 740, Category = "Latte", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-salted-caramel-latte.png", Ingredients = "Espresso,Milk,Caramel,Salt", Calories = 330, IsFeatured = true, IsAvailable = true },
            new Coffee { Id = 7, Name = "Espresso Shot", Description = "A compact, high-clarity espresso.", Price = 340, Category = "Espresso", SizeOptions = "Single,Double", ImageUrl = "/assets/generated/coffee-espresso-shot.png", Ingredients = "Espresso", Calories = 5, IsFeatured = false, IsAvailable = true },
            new Coffee { Id = 8, Name = "Honey Cinnamon Flat White", Description = "Flat white with honey and cinnamon.", Price = 700, Category = "Flat White", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-honey-cinnamon-flat-white.png", Ingredients = "Espresso,Milk,Honey,Cinnamon", Calories = 260, IsFeatured = false, IsAvailable = true },
            new Coffee { Id = 9, Name = "Rose Pistachio Latte", Description = "A fragrant latte with rose and pistachio.", Price = 780, Category = "Latte", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-rose-pistachio.png", Ingredients = "Espresso,Milk,Rose,Pistachio", Calories = 340, IsFeatured = true, IsAvailable = true },
            new Coffee { Id = 10, Name = "Dark Chocolate Mocha", Description = "Deep cocoa, espresso, and steamed milk.", Price = 730, Category = "Mocha", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-dark-mocha.png", Ingredients = "Espresso,Dark Chocolate,Milk", Calories = 320, IsFeatured = false, IsAvailable = true },
            new Coffee { Id = 11, Name = "Hazelnut Macchiato", Description = "Layered espresso with hazelnut sweetness.", Price = 690, Category = "Macchiato", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-hazelnut-macchiato.png", Ingredients = "Espresso,Milk,Hazelnut", Calories = 250, IsFeatured = false, IsAvailable = true },
            new Coffee { Id = 12, Name = "Midnight Black Brew", Description = "Dark, clean, late-night filter coffee.", Price = 520, Category = "Brewed", SizeOptions = sizes, ImageUrl = "/assets/generated/coffee-midnight-black-brew.png", Ingredients = "Filter Coffee", Calories = 10, IsFeatured = true, IsAvailable = true }
        );
        builder.Entity<Order>().HasData(new Order { Id = 1, OrderNumber = "BP-1001", UserId = 2, LocationId = 1, Status = "Ready for Pickup", TotalAmount = 1280, PickupTime = DateTime.UtcNow.AddHours(2), CreatedAt = DateTime.UtcNow.AddHours(-1) });
        builder.Entity<OrderItem>().HasData(new OrderItem { Id = 1, OrderId = 1, CoffeeId = 1, Quantity = 2, Size = "Medium", MilkType = "Oat", SugarLevel = "Medium", Toppings = "None", UnitPrice = 640 });
        builder.Entity<Review>().HasData(
            new Review { Id = 1, CoffeeId = 2, UserId = 2, Rating = 5, Comment = "The Pink Cloud Mocha tastes like a startup launch party.", CreatedAt = DateTime.UtcNow.AddDays(-2) },
            new Review { Id = 2, CoffeeId = 9, UserId = 2, Rating = 5, Comment = "Rose Pistachio Latte is elegant and memorable.", CreatedAt = DateTime.UtcNow.AddDays(-1) }
        );
    }
}
