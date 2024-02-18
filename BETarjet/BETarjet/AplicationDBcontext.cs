using BETarjet.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BETarjet
{
    public class AplicationDBcontext : DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }  
        public AplicationDBcontext(DbContextOptions<AplicationDBcontext> options) : base(options) 
        {
            
        }
    }
}
