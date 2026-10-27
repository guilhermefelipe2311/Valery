using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Valery.Data;
using Valery.Models;

namespace Valery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PedidosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Pedidos
        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var pedidos = await _context.Pedidos
                .Include(p => p.Itens)
                .Select(p => new
                {
                    p.Id,
                    p.DataPedido,
                    p.ValorTotal,
                    p.Status,
                    p.UsuarioId,

                    Itens = p.Itens.Select(item => new
                    {
                        item.Id,
                        item.ProdutoId,
                        item.Quantidade,
                        item.PrecoUnitario
                    }).ToList()
                })
                .ToListAsync();

            return Ok(pedidos);
        }


        // POST: api/Pedidos
        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] Pedido pedido)
        {
            if (pedido == null)
            {
                return BadRequest("Pedido inválido.");
            }

            if (pedido.UsuarioId <= 0)
            {
                return BadRequest("Usuário inválido.");
            }

            if (pedido.Itens == null || !pedido.Itens.Any())
            {
                return BadRequest("O pedido precisa possuir pelo menos um item.");
            }

            pedido.DataPedido = DateTime.Now;
            pedido.Status = "Pendente";

            _context.Pedidos.Add(pedido);

            await _context.SaveChangesAsync();

            // Retorna somente dados simples.
            // Não retorna Pedido -> Itens -> Pedido.
            var resposta = new
            {
                pedido.Id,
                pedido.DataPedido,
                pedido.ValorTotal,
                pedido.Status,
                pedido.UsuarioId,

                Itens = pedido.Itens.Select(item => new
                {
                    item.Id,
                    item.ProdutoId,
                    item.Quantidade,
                    item.PrecoUnitario
                }).ToList()
            };

            return Ok(resposta);
        }
    }
}