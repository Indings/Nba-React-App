using Microsoft.AspNetCore.Mvc;
using plain_api.Models;
namespace plain_api.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayersController : ControllerBase
{

    private readonly NbaappContext _DBContext;
    public PlayersController(NbaappContext dbContext)
    {
       this._DBContext=dbContext;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var player=this._DBContext.Players.ToList();
        return Ok(player);
    }

    [HttpGet("GetByName/{firstname}/{lastname}")]
    public IActionResult GetAll(string firstname,string lastname)
    {
        var player=this._DBContext.Players.FirstOrDefault(o=>o.Firstname==firstname && o.Lastname==lastname);
        return Ok(player);
    }

    [HttpDelete("Remove/{Id}")]
    public IActionResult Remove(int code)
    {
        var player=this._DBContext.Players.FirstOrDefault(o=>o.Id==code);
        if(player!=null){
            this._DBContext.Remove(player);
            this._DBContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }

    [HttpPost("Create")]
    public IActionResult Create([FromBody] Player _player)
    {
        var player=this._DBContext.Players.FirstOrDefault(o=>o.Id==_player.Id);
        if(player!=null){
            player.Id =_player.Id;
            player.Name = _player.Name;
            player.Color = _player.Color;
            player.Personid = _player.Personid;
            player.Firstname = _player.Firstname;
            player.Lastname = _player.Lastname;
            player.Jersey = _player.Jersey;
            player.Dateofbirth = _player.Dateofbirth;
            player.Yearspro = _player.Yearspro;
            player.Collegename = _player.Collegename;
            player.Country = _player.Country;
           
           this._DBContext.SaveChanges();
        }
        else{
            this._DBContext.Players.Add(_player);
            this._DBContext.SaveChanges();
        }
        return Ok(true);
    }
}
