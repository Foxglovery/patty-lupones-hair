using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PattyLuponesHair.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stylists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    isActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stylists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StylistId = table.Column<int>(type: "integer", nullable: false),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    ScheduledFor = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointments_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointments_Stylists_StylistId",
                        column: x => x.StylistId,
                        principalTable: "Stylists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppointmentId = table.Column<int>(type: "integer", nullable: false),
                    ServiceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointmentServices_Appointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "Appointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "FirstName", "LastName" },
                values: new object[,]
                {
                    { 1, "Elmira", "Bick" },
                    { 2, "Florence", "Tarly" },
                    { 3, "Agrippa", "Shorely" },
                    { 4, "Pithany", "Goosename" },
                    { 5, "Loril", "Descot" },
                    { 6, "Jenjamin", "Oranis" },
                    { 7, "Flisha", "Purl" },
                    { 8, "Karrigan", "Nothal" }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Tik-Tok Blowout", 60m },
                    { 2, "Quantum Waxing", 80m },
                    { 3, "Mecha-Bikini Optimization", 360m },
                    { 4, "Hot Noodle Massage", 30m },
                    { 5, "Bang-Maker 3000", 60m },
                    { 6, "Chinstrap Removal", 5m },
                    { 7, "Krimp-It-Till-It-Dies", 100m },
                    { 8, "Wig Snatch N Release", 90m }
                });

            migrationBuilder.InsertData(
                table: "Stylists",
                columns: new[] { "Id", "FirstName", "LastName", "isActive" },
                values: new object[,]
                {
                    { 1, "Groogery", "Adlerburb", true },
                    { 2, "Schlebethany", "Jerp", true },
                    { 3, "Jeef", "Dagsroll", true },
                    { 4, "Arlington", "Corlingping", false },
                    { 5, "Fash", "Brippy", true }
                });

            migrationBuilder.InsertData(
                table: "Appointments",
                columns: new[] { "Id", "CustomerId", "ScheduledFor", "StylistId" },
                values: new object[,]
                {
                    { 1, 3, new DateTime(2024, 1, 15, 13, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 2, 6, new DateTime(2024, 1, 16, 14, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 3, 4, new DateTime(2024, 1, 15, 13, 0, 0, 0, DateTimeKind.Unspecified), 3 },
                    { 4, 7, new DateTime(2024, 1, 15, 15, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 5, 8, new DateTime(2024, 1, 17, 16, 0, 0, 0, DateTimeKind.Unspecified), 5 }
                });

            migrationBuilder.InsertData(
                table: "AppointmentServices",
                columns: new[] { "Id", "AppointmentId", "ServiceId" },
                values: new object[,]
                {
                    { 1, 1, 3 },
                    { 2, 1, 5 },
                    { 3, 1, 4 },
                    { 4, 2, 6 },
                    { 5, 2, 4 },
                    { 6, 3, 1 },
                    { 7, 4, 2 },
                    { 8, 4, 7 },
                    { 9, 4, 3 },
                    { 10, 5, 3 },
                    { 11, 5, 8 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_CustomerId",
                table: "Appointments",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_StylistId",
                table: "Appointments",
                column: "StylistId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentServices_AppointmentId",
                table: "AppointmentServices",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentServices_ServiceId",
                table: "AppointmentServices",
                column: "ServiceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentServices");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Stylists");
        }
    }
}
