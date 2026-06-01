using System.ComponentModel.DataAnnotations;

namespace BrewPoint.Api.DTOs;

public record UserDto(int Id, string FullName, string Email, string? Phone, string Role);
public record AuthResponseDto(string Token, UserDto User);
public record SignupDto([Required] string FullName, [EmailAddress] string Email, [MinLength(8)] string Password, string? Phone);
public record LoginDto([EmailAddress] string Email, [Required] string Password);
public record UpdateUserDto([Required] string FullName, string? Phone);

public record CoffeeDto(int Id, string Name, string Description, decimal Price, string Category, string[] SizeOptions, string ImageUrl, string[] Ingredients, int Calories, bool IsFeatured, bool IsAvailable);
public record UpsertCoffeeDto([Required] string Name, [Required] string Description, decimal Price, [Required] string Category, string[] SizeOptions, string ImageUrl, string[] Ingredients, int Calories, bool IsFeatured, bool IsAvailable);

public record LocationDto(int Id, string Name, string Address, string Phone, string OpeningHours, decimal Latitude, decimal Longitude);
public record UpsertLocationDto([Required] string Name, [Required] string Address, string Phone, string OpeningHours, decimal Latitude, decimal Longitude);

public record OrderItemDto(int Id, int CoffeeId, string CoffeeName, int Quantity, string Size, string MilkType, string SugarLevel, string Toppings, decimal UnitPrice);
public record OrderDto(int Id, string OrderNumber, string Status, decimal TotalAmount, DateTime PickupTime, DateTime CreatedAt, string LocationName, string UserName, List<OrderItemDto> Items);
public record CreateOrderItemDto(int CoffeeId, int Quantity, string Size, string MilkType, string SugarLevel, string Toppings);
public record CreateOrderDto(int LocationId, DateTime PickupTime, List<CreateOrderItemDto> Items);
public record UpdateOrderStatusDto([Required] string Status);

public record ReviewDto(int Id, int Rating, string Comment, DateTime CreatedAt, string CoffeeName, string UserName);
public record CreateReviewDto(int CoffeeId, int Rating, string Comment);
