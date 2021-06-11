using Backend.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {

        }

        public DbSet<Cliente> Clientes { get; set; }

        public DbSet<Produto> Produtos { get; set; }

        public DbSet<Pedido> Pedido { get; set; }
    }
}
