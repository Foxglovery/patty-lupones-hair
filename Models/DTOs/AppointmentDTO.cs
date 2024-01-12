namespace PattyLuponesHair.Models.DTOs;

public class AppointmentDTO
{
    public int Id { get; set; }

    public int StylistId { get; set; }
    public StylistDTO Stylist { get; set; }
    public int CustomerId { get; set; }
    public CustomerDTO Customer { get; set; }

    public DateTime ScheduledFor { get; set; }
    public List<ServiceDTO> Services { get; set; }
    //to calculate total price, define a public with only a GETTER
    //check if services is null
    //sum the price
    //display 0 otherwise
    public decimal TotalPrice
{
    get 
    {
        return Services != null ? Services.Sum(service => service.Price) : 0m;
    }
}
}