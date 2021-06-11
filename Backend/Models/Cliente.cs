using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.models
{
    public class Cliente
    {
       
        public int ClienteId { get; set; }

   
        public string Nome { get; set; }

     
        public string Email { get; set; }

    
        public string Aldeia { get; set; }
    }
}