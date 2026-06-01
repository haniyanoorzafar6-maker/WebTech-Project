using BrewPoint.Api.Data;
using BrewPoint.Api.DTOs;
using BrewPoint.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BrewPoint.Api.Controllers;

[ApiController]
[Route("api/coffees")]
public class CoffeesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<CoffeeDto>>> GetAll() => Ok(await db.Coffees.OrderBy(c => c.Name).Select(c => ToDto(c)).ToListAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CoffeeDto>> Get(int id)
    {
        var coffee = await db.Coffees.FindAsync(id);
        return coffee is null ? NotFound() : Ok(ToDto(coffee));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<CoffeeDto>> Create(UpsertCoffeeDto dto)
    {
        var coffee = FromDto(dto);
        db.Coffees.Add(coffee);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = coffee.Id }, ToDto(coffee));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<CoffeeDto>> Update(int id, UpsertCoffeeDto dto)
    {
        var coffee = await db.Coffees.FindAsync(id);
        if (coffee is null) return NotFound();
        Apply(coffee, dto);
        await db.SaveChangesAsync();
        return Ok(ToDto(coffee));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var coffee = await db.Coffees.FindAsync(id);
        if (coffee is null) return NotFound();
        db.Coffees.Remove(coffee);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private static CoffeeDto ToDto(Coffee c) => new(c.Id, c.Name, c.Description, c.Price, c.Category, Split(c.SizeOptions), c.ImageUrl, Split(c.Ingredients), c.Calories, c.IsFeatured, c.IsAvailable);
    private static Coffee FromDto(UpsertCoffeeDto dto) { var c = new Coffee(); Apply(c, dto); return c; }
    private static void Apply(Coffee c, UpsertCoffeeDto dto) { c.Name = dto.Name; c.Description = dto.Description; c.Price = dto.Price; c.Category = dto.Category; c.SizeOptions = string.Join(",", dto.SizeOptions); c.ImageUrl = dto.ImageUrl; c.Ingredients = string.Join(",", dto.Ingredients); c.Calories = dto.Calories; c.IsFeatured = dto.IsFeatured; c.IsAvailable = dto.IsAvailable; }
    private static string[] Split(string value) => value.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
}
