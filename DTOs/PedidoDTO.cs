namespace Valery.DTOs
{
    public class PedidoDTO
    {
        public int Id { get; set; }

        public DateTime DataPedido { get; set; }

        public decimal ValorTotal { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}