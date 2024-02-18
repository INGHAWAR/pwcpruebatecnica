using System.ComponentModel.DataAnnotations;

namespace BETarjet.Models
{
    public class TarjetaCredito
    {
        public int Id { get; set; }
        public required string Titular { get; set; }
        public required string NumeroTarjeta { get; set; }
        public required string FechaExpiracion { get; set; }
        public required string CVV { get; set; }

    }
}
