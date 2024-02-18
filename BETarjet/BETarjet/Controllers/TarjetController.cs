using BETarjet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BETarjet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetController : ControllerBase
    {
        private readonly AplicationDBcontext _context;

        public TarjetController (AplicationDBcontext context)
        {
            _context = context;
        }
        // GET: api/<TarjetController>
        [HttpGet]
        //public IEnumerable<string> Get()
        public async Task <IActionResult> Get()
        {
            // return new string[] { "value1", "value2" };
            try
            {
                var listTarjetas = await _context.TarjetaCredito.ToListAsync();
                return Ok(listTarjetas);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<TarjetController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<TarjetController>
        [HttpPost]
        //public void Post([FromBody] string value)
        //Para agregar una tarjeta
        public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                _context.Add(tarjeta);
                await _context.SaveChangesAsync();
                return Ok (tarjeta);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<TarjetController>/5
        [HttpPut("{id}")]
        //Editar una tarjeta
        public async Task <IActionResult> Put(int id, [FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                if(id != tarjeta.Id)
                {
                    return NotFound();
                }
                
                _context.Update(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(new {message = "La tarjeta fue actualizada con exito!"});
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);           
            }
        }

        // DELETE api/<TarjetController>/5
        [HttpDelete("{id}")]
        //Eliminar Tarjeta
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var tarjeta = await _context.TarjetaCredito.FindAsync(id);
                if (tarjeta == null)
                {
                    return NotFound();
                }

                _context.TarjetaCredito.Remove(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(new { message = "La tarjeta fue eliminada con exito!" });
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

