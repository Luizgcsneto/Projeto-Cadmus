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
    public class ProdutoController : Controller
    {
        private readonly Contexto _contexto;

        public ProdutoController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetAllAsync()
        {
            return await _contexto.Produtos.ToListAsync();
        }

        [HttpGet("{ProdutoId}")]
        public async Task<ActionResult<Produto>> GetById(int produtoId)
        {
            Produto produto = await _contexto.Produtos.FindAsync(produtoId);
            if (produto == null)
                NotFound();

            return produto;
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> SaveProductAsync(Produto produto)
        {
            await _contexto.Produtos.AddAsync(produto);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProductAsync(Produto produto)
        {
            _contexto.Produtos.Update(produto);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{ProdutoId}")]
        public async Task<ActionResult> DeleteProductAsync(int produtoId)
        {
            Produto produto = await _contexto.Produtos.FindAsync(produtoId);
            if (produto == null)
                return NotFound();
            _contexto.Remove(produto);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}