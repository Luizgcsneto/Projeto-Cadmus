using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Backend.models
{
    public class Produto
    {
        
        public int ProdutoId { get; set; }

        public string Descricao { get; set; }

        public decimal Preco { get; set; }
    }
}