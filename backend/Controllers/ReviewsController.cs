using System.Security.Claims;
using BrewPoint.Api.Data;
using BrewPoint.Api.DTOs;
using BrewPoint.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BrewPoint.Api.Controllers;

[ApiController]
[Route("api/reviews")]
public class ReviewsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ReviewDto>>> GetAll() => Ok(await Query().OrderByDescending(r => r.CreatedAt).Select(r => ToDto(r)).ToListAsync());

    [HttpGet("coffee/{coffeeId:int}")]
    public async Task<ActionResult<List<ReviewDto>>> ByCoffee(int coffeeId) => Ok(await Query().Where(r => r.CoffeeId == coffeeId).Select(r => ToDto(r)).ToListAsync());

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ReviewDto>> Create(CreateReviewDto dto)
    {
        if (dto.Rating is < 1 or > 5) return BadRequest(new { message = "Rating must be between 1 and 5." });
        var review = new Review { CoffeeId = dto.CoffeeId, UserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!), Rating = dto.Rating, Comment = dto.Comment };
        db.Reviews.Add(review);
        await db.SaveChangesAsync();
        return Created($"/api/reviews/{review.Id}", ToDto(await Query().SingleAsync(r => r.Id == review.Id)));
    }

    [Authorize]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ReviewDto>> Update(int id, CreateReviewDto dto)
    {
        var review = await db.Reviews.FindAsync(id);
        if (review is null) return NotFound();
        if (!User.IsInRole("Admin") && review.UserId != int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)) return Forbid();
        review.Rating = dto.Rating; review.Comment = dto.Comment;
        await db.SaveChangesAsync();
        return Ok(ToDto(await Query().SingleAsync(r => r.Id == id)));
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var review = await db.Reviews.FindAsync(id);
        if (review is null) return NotFound();
        if (!User.IsInRole("Admin") && review.UserId != int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)) return Forbid();
        db.Reviews.Remove(review);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private IQueryable<Review> Query() => db.Reviews.Include(r => r.Coffee).Include(r => r.User);
    private static ReviewDto ToDto(Review r) => new(r.Id, r.Rating, r.Comment, r.CreatedAt, r.Coffee.Name, r.User.FullName);
}
