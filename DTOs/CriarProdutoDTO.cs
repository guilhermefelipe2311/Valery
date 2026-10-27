namespace Valery.DTOs
{
    public class CriarProdutoDTO
    {
        public string Nome { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public decimal Preco { get; set; }

        public int Quantidade { get; set; }

        public string ImagemUrl { get; set; } = string.Empty;

        public int CategoriaId { get; set; }
    }
}