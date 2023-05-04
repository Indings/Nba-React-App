using System;
using System.Collections.Generic;

namespace plain_api.Models;

public partial class Player
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Color { get; set; }

    public string? Personid { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Jersey { get; set; }

    public string? Dateofbirth { get; set; }

    public string? Yearspro { get; set; }

    public string? Collegename { get; set; }

    public string? Country { get; set; }
}
