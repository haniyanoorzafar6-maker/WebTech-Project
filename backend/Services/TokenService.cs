using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BrewPoint.Api.DTOs;
using BrewPoint.Api.Models;
using Microsoft.IdentityModel.Tokens;

namespace BrewPoint.Api.Services;

public class TokenService(IConfiguration configuration)
{
    public AuthResponseDto CreateAuthResponse(User user)
    {
        var jwt = configuration.GetSection("Jwt");
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim(ClaimTypes.Role, user.Role.Name)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Secret"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(jwt["Issuer"], jwt["Audience"], claims, expires: DateTime.UtcNow.AddMinutes(int.Parse(jwt["ExpiresMinutes"]!)), signingCredentials: credentials);
        var dto = new UserDto(user.Id, user.FullName, user.Email, user.Phone, user.Role.Name);
        return new AuthResponseDto(new JwtSecurityTokenHandler().WriteToken(token), dto);
    }
}
