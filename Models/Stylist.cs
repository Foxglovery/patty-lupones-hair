using System.ComponentModel.DataAnnotations;

namespace PattyLuponesHair.Models;

public class Stylist
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public bool isActive { get; set; }
}