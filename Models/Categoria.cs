namespace Valery.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;


        // Relacionamento
        public List<Produto>? Produtos { get; set; }
    }
}