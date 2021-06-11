using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : Controller
    {
        private readonly Contexto _contexto;

        public PedidoController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetAllAsync()
        {
            return await _contexto.Pedido.ToListAsync();
        }

        [HttpGet("{PedidoId}")]
        public async Task<ActionResult<Pedido>> GetById(int pedidoId)
        {
            Pedido pedido = await _contexto.Pedido.FindAsync(pedidoId);
            if (pedido == null)
                NotFound();

            return pedido;
        }

        [HttpPost]
        public async Task<ActionResult<Pedido>> SaveOrderAsync(Pedido pedido)
        {
            await _contexto.Pedido.AddAsync(pedido);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateOrderAsync(Pedido pedido)
        {
            _contexto.Pedido.Update(pedido);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{PedidoId}")]
        public async Task<ActionResult> DeleteOrderAsync(int pedidoId)
        {
            Pedido pedido = await _contexto.Pedido.FindAsync(pedidoId);
            if (pedido == null)
                return NotFound();
            _contexto.Remove(pedido);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}