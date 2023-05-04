using Microsoft.AspNetCore.Mvc;
using plain_api.Models;
namespace plain_api.Controllers;

[ApiController]
[Route("[controller]")]
public class TeamsController : ControllerBase
{

    private readonly NbaappContext _DBContext;
    public TeamsController(NbaappContext dbContext)
    {
       this._DBContext=dbContext;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var team=this._DBContext.Teams.ToList();
        return Ok(team);
    }

    [HttpGet("GetByName/{name}")]
    public IActionResult GetAll(string name)
    {
        var team=this._DBContext.Teams.FirstOrDefault(o=>o.Teamname==name);
        return Ok(team);
    }

    [HttpDelete("Remove/{name}")]
    public IActionResult Remove(string name)
    {
        var team=this._DBContext.Teams.FirstOrDefault(o=>o.Teamname==name);
        if(team!=null){
            this._DBContext.Remove(team);
            this._DBContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }

    [HttpPost("Create")]
    public IActionResult Create([FromBody] Team _team)
    {
        var team=this._DBContext.Teams.FirstOrDefault(o=>o.Teamname==_team.Teamname);
        if(team!=null){
            team.Teamname = _team.Teamname;
            team.Colormain = _team.Colormain;
            team.Coloroff = _team.Coloroff;
            team.Coloraccent = _team.Coloraccent;
            team.Teamid = _team.Teamid;
           
           this._DBContext.SaveChanges();
        }
        else{
            this._DBContext.Teams.Add(_team);
            this._DBContext.SaveChanges();
        }
        return Ok(true);
    }
}
