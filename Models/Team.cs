using System;
using System.Collections.Generic;

namespace plain_api.Models;

public partial class Team
{
    public string Teamname { get; set; } = null!;

    public string? Colormain { get; set; }

    public string? Coloroff { get; set; }

    public string? Coloraccent { get; set; }

    public string? Teamid { get; set; }
}
