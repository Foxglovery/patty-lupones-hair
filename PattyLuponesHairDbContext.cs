using Microsoft.EntityFrameworkCore;
using PattyLuponesHair.Models;

public class PattyLuponesHairDbContext : DbContext
{

    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }
    public DbSet<Service> Services { get; set; }

    public PattyLuponesHairDbContext(DbContextOptions<PattyLuponesHairDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist {Id = 1, FirstName = "Groogery", LastName = "Adlerburb", isActive = true},
            new Stylist {Id = 2, FirstName = "Schlebethany", LastName = "Jerp", isActive = true},
            new Stylist {Id = 3, FirstName = "Jeef", LastName = "Dagsroll", isActive = true},
            new Stylist {Id = 4, FirstName = "Arlington", LastName = "Corlingping", isActive = false},
            new Stylist {Id = 5, FirstName = "Fash", LastName = "Brippy", isActive = true}
            
        });

        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer {Id = 1, FirstName = "Elmira", LastName = "Bick"},
            new Customer {Id = 2, FirstName = "Florence", LastName = "Tarly"},
            new Customer {Id = 3, FirstName = "Agrippa", LastName = "Shorely"},
            new Customer {Id = 4, FirstName = "Pithany", LastName = "Goosename"},
            new Customer {Id = 5, FirstName = "Loril", LastName = "Descot"},
            new Customer {Id = 6, FirstName = "Jenjamin", LastName = "Oranis"},
            new Customer {Id = 7, FirstName = "Flisha", LastName = "Purl"},
            new Customer {Id = 8, FirstName = "Karrigan", LastName = "Nothal"},
        });

        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment {Id = 1, StylistId = 2, CustomerId = 3, ScheduledFor = new DateTime(2024, 01, 15, 13, 0, 0)},

            new Appointment {Id = 2, StylistId = 1, CustomerId = 6, ScheduledFor = new DateTime(2024, 01, 16, 14, 0, 0)},
            new Appointment {Id = 3, StylistId = 3, CustomerId = 4, ScheduledFor = new DateTime(2024, 01, 15, 13, 0, 0)},
            new Appointment {Id = 4, StylistId = 2, CustomerId = 7, ScheduledFor = new DateTime(2024, 01, 15, 15, 0, 0)},
            new Appointment {Id = 5, StylistId = 5, CustomerId = 8, ScheduledFor = new DateTime(2024, 01, 17, 16, 0, 0)},
        });

        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service {Id = 1, Name = "Tik-Tok Blowout", Price = 60M},
            new Service {Id = 2, Name = "Quantum Waxing", Price = 80M},
            new Service {Id = 3, Name = "Mecha-Bikini Optimization", Price = 360M},
            new Service {Id = 4, Name = "Hot Noodle Massage", Price = 30M},
            new Service {Id = 5, Name = "Bang-Maker 3000", Price = 60M},
            new Service {Id = 6, Name = "Chinstrap Removal", Price = 5M},
            new Service {Id = 7, Name = "Krimp-It-Till-It-Dies", Price = 100M},
            new Service {Id = 8, Name = "Wig Snatch N Release", Price = 90M},
        });
        
        modelBuilder.Entity<AppointmentService>().HasData(new AppointmentService[]
        {
            new AppointmentService {Id = 1, AppointmentId = 1, ServiceId = 3},
            new AppointmentService {Id = 2, AppointmentId = 1, ServiceId = 5},
            new AppointmentService {Id = 3, AppointmentId = 1, ServiceId = 4},
            new AppointmentService {Id = 4, AppointmentId = 2, ServiceId = 6},
            new AppointmentService {Id = 5, AppointmentId = 2, ServiceId = 4},
            new AppointmentService {Id = 6, AppointmentId = 3, ServiceId = 1},
            new AppointmentService {Id = 7, AppointmentId = 4, ServiceId = 2},
            new AppointmentService {Id = 8, AppointmentId = 4, ServiceId = 7},
            new AppointmentService {Id = 9, AppointmentId = 4, ServiceId = 3},
            new AppointmentService {Id = 10, AppointmentId = 5, ServiceId = 3},
            new AppointmentService {Id = 11, AppointmentId = 5, ServiceId = 8}
        });
    
    }
}