using Microsoft.AspNetCore.Mvc;
using plain_api.Models;
namespace plain_api.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{

    private readonly NbaappContext _DBContext;
    public UsersController(NbaappContext dbContext)
    {
       this._DBContext=dbContext;
    }


    [HttpGet("GetByEmail/{email}")]
    public IActionResult GetUser(string email)
    {
        var user=this._DBContext.Users.FirstOrDefault(o=>o.Email==email);
        return Ok(user);
    }

}
