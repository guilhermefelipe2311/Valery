using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Valery.Data;
using Valery.Models;

namespace Valery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }


        // LISTAR PRODUTOS
        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var produtos = await _context.Produtos.ToListAsync();

            return Ok(produtos);
        }


        // BUSCAR PRODUTO POR ID
        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarPorId(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
            {
                return NotFound("Produto não encontrado");
            }

            return Ok(produto);
        }


        // CRIAR PRODUTO
        [HttpPost]
        public async Task<IActionResult> Criar(Produto produto)
        {
            _context.Produtos.Add(produto);

            await _context.SaveChangesAsync();

            return Ok(produto);
        }


        // EDITAR PRODUTO
        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(int id, Produto produto)
        {
            var produtoBanco = await _context.Produtos.FindAsync(id);

            if (produtoBanco == null)
            {
                return NotFound("Produto não encontrado");
            }

            produtoBanco.Nome = produto.Nome;
            produtoBanco.Descricao = produto.Descricao;
            produtoBanco.Preco = produto.Preco;
            produtoBanco.Quantidade = produto.Quantidade;
            produtoBanco.ImagemUrl = produto.ImagemUrl;
            produtoBanco.CategoriaId = produto.CategoriaId;

            await _context.SaveChangesAsync();

            return Ok(produtoBanco);
        }


        // DELETAR PRODUTO
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
            {
                return NotFound("Produto não encontrado");
            }

            _context.Produtos.Remove(produto);

            await _context.SaveChangesAsync();

            return Ok("Produto deletado com sucesso");
        }
    }
}