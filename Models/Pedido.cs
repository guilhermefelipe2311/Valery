namespace Valery.Models
{
    public class Pedido
    {
        public int Id { get; set; }

        public DateTime DataPedido { get; set; } = DateTime.Now;

        public decimal ValorTotal { get; set; }

        public string Status { get; set; } = "Pendente";


        // Usuario
        public int UsuarioId { get; set; }

        public Usuario? Usuario { get; set; }


        // Itens do pedido
        public List<ItemPedido>? Itens { get; set; }
    }
}