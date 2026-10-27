namespace Valery.Models
{
    public class ItemPedido
    {
        public int Id { get; set; }

        public int Quantidade { get; set; }

        public decimal PrecoUnitario { get; set; }


        // Pedido
        public int PedidoId { get; set; }

        public Pedido? Pedido { get; set; }


        // Produto
        public int ProdutoId { get; set; }

        public Produto? Produto { get; set; }
    }
}