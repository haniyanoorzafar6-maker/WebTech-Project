using BrewPoint.Api.Data;
using BrewPoint.Api.DTOs;
using BrewPoint.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BrewPoint.Api.Controllers;

[ApiController]
[Route("api/locations")]
public class LocationsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<LocationDto>>> GetAll() => Ok(await db.Locations.OrderBy(l => l.Id).Select(l => ToDto(l)).ToListAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<LocationDto>> Get(int id)
    {
        var location = await db.Locations.FindAsync(id);
        return location is null ? NotFound() : Ok(ToDto(location));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<LocationDto>> Create(UpsertLocationDto dto)
    {
        var location = new Location { Name = dto.Name, Address = dto.Address, Phone = dto.Phone, OpeningHours = dto.OpeningHours, Latitude = dto.Latitude, Longitude = dto.Longitude };
        db.Locations.Add(location);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = location.Id }, ToDto(location));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<LocationDto>> Update(int id, UpsertLocationDto dto)
    {
        var location = await db.Locations.FindAsync(id);
        if (location is null) return NotFound();
        location.Name = dto.Name; location.Address = dto.Address; location.Phone = dto.Phone; location.OpeningHours = dto.OpeningHours; location.Latitude = dto.Latitude; location.Longitude = dto.Longitude;
        await db.SaveChangesAsync();
        return Ok(ToDto(location));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var location = await db.Locations.FindAsync(id);
        if (location is null) return NotFound();
        db.Locations.Remove(location);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private static LocationDto ToDto(Location l) => new(l.Id, l.Name, l.Address, l.Phone, l.OpeningHours, l.Latitude, l.Longitude);
}
