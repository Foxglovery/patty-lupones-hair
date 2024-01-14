using PattyLuponesHair.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using PattyLuponesHair.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<PattyLuponesHairDbContext>(builder.Configuration["PattyLuponesHairDbConnectionString"]);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/stylists", (PattyLuponesHairDbContext db) =>
{
    return db.Stylists
    .Select(s => new StylistDTO
    {
        Id = s.Id,
        FirstName = s.FirstName,
        LastName = s.LastName,
        isActive = s.isActive
    }).ToList();
});

app.MapGet("/api/services", (PattyLuponesHairDbContext db) =>
{
    return db.Services
    .Select(s => new ServiceDTO
    {
        Id = s.Id,
        Name = s.Name,
        Price = s.Price
    }).ToList();
});

app.MapGet("/api/customers", (PattyLuponesHairDbContext db) =>
{
    return db.Customers
    .Select(s => new CustomerDTO
    {
        Id = s.Id,
        FirstName = s.FirstName,
        LastName = s.LastName,
    }).ToList();
});

app.MapGet("/api/appointments", (PattyLuponesHairDbContext db) =>
{
    return db.Appointments
    .Include(a => a.Stylist)
    .Include(a => a.Customer)
    .Include(a => a.AppointmentServices)
        .ThenInclude(ap => ap.Service)
    .Select(a => new AppointmentDTO
    {
        Id = a.Id,
        StylistId = a.StylistId,
        Stylist = new StylistDTO
        {
            Id = a.Stylist.Id,
            FirstName = a.Stylist.FirstName,
            LastName = a.Stylist.LastName
        },
        CustomerId = a.CustomerId,
        Customer = new CustomerDTO
        {
            Id = a.Customer.Id,
            FirstName = a.Customer.FirstName,
            LastName = a.Customer.LastName
        },
        ScheduledFor = a.ScheduledFor,
        Services = a.AppointmentServices
                    .Select(ap => new ServiceDTO
                    {
                        Id = ap.Service.Id,
                        Name = ap.Service.Name,
                        Price = ap.Service.Price
                    }).ToList()
    })
    .ToList();
});

//This posts but the date is wrong. 
app.MapPost("/api/appointments", (PattyLuponesHairDbContext db, AppointmentCreationDTO appointmentCreationDTO) =>
{
    var newAppointment = new Appointment
    {
        StylistId = appointmentCreationDTO.NewAppointment.StylistId,
        CustomerId = appointmentCreationDTO.NewAppointment.CustomerId,
        ScheduledFor = appointmentCreationDTO.NewAppointment.ScheduledFor
    };
    var serviceIds = appointmentCreationDTO.ServiceIds;
    db.Appointments.Add(newAppointment);
    db.SaveChanges();

    foreach(var serviceId in serviceIds)
    {
        var newAppointmentService = new AppointmentService
        {
            AppointmentId = newAppointment.Id,
            ServiceId = serviceId
        };
        db.AppointmentServices.Add(newAppointmentService);
    }
    db.SaveChanges();
    return Results.Created($"/api/appointments/{newAppointment.Id}", newAppointment);
});

app.MapDelete("/api/appointments", (PattyLuponesHairDbContext db, int id) =>
{
    Appointment appointmentToDelete = db.Appointments.SingleOrDefault(a => a.Id == id);

    if (appointmentToDelete == null)
    {
        return Results.NotFound();
    }
    db.Appointments.Remove(appointmentToDelete);
    db.SaveChanges();
    return Results.NoContent();
});


app.Run();

