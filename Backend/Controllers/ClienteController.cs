using Backend.models;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : Controller
    {
        private readonly Contexto _contexto;

        public ClienteController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetAllAsync()
        {
            return await _contexto.Clientes.ToListAsync();
        }

        [HttpGet("{ClienteId}")]
        public async Task<ActionResult<Cliente>> GetById(int clienteId)
        {
            Cliente cliente = await _contexto.Clientes.FindAsync(clienteId);
            if (cliente == null)
                NotFound();

            return cliente;
        }

        [HttpPost]
        public async Task<ActionResult<Cliente>> SaveClientAsync(Cliente cliente)
        {
            await _contexto.Clientes.AddAsync(cliente);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateClientAsync(Cliente cliente)
        {
            _contexto.Clientes.Update(cliente);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{ClienteId}")]
        public async Task<ActionResult> DeleteClientAsync(int clienteId)
        {
            Cliente cliente = await _contexto.Clientes.FindAsync(clienteId);
            if (cliente == null)
                return NotFound();
            _contexto.Remove(cliente);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}