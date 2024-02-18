using BETarjet;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//configuración de la aplicación
var configuration = builder.Configuration;
builder.Services.AddDbContext<AplicationDBcontext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DevConnection")));

//configuracion CORS (permite cualquier origen, cabecera, metodo)

builder.Services.AddCors(options => options.AddPolicy("AllowWebApp",
builder => builder.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowWebApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
