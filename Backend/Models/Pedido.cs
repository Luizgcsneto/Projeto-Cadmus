using Backend.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Pedido
    {
       
        public int PedidoId { get; set; }
      
        public DateTime Data { get; set; }
       
        public List<Produto> Produtos { get; set; }
      
        public int ClienteId { get; set; }
      
        public Cliente Cliente { get; set; }
     
        public decimal Valor { get; set; }

        public decimal Desconto { get; set; }

        
        public decimal ValorTotal { get; set; }


    }
}
