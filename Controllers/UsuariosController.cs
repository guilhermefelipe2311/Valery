using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Valery.Data;
using Valery.Models;

namespace Valery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // LISTAR USUÁRIOS
        // ==========================================

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var usuarios = await _context.Usuarios
                .ToListAsync();

            return Ok(usuarios);
        }

        // ==========================================
        // CADASTRAR USUÁRIO
        // ==========================================

        [HttpPost]
        public async Task<IActionResult> Criar(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return Ok(usuario);
        }

        // ==========================================
        // LOGIN
        // ==========================================

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] Usuario dados)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u =>
                    u.Email == dados.Email &&
                    u.Senha == dados.Senha
                );

            if (usuario == null)
            {
                return Unauthorized(
                    "Email ou senha inválidos");
            }

            return Ok(usuario);
        }

        // ==========================================
        // ALTERAR TIPO DO USUÁRIO
        // ==========================================

        [HttpPut("{id}")]
        public async Task<IActionResult> AlterarTipo(
            int id,
            [FromBody] Usuario dados)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
            {
                return NotFound(
                    "Usuário não encontrado.");
            }

            // PROTEGE O ADMINISTRADOR PRINCIPAL
            if (usuario.Id == 1)
            {
                return BadRequest(
                    "O administrador principal não pode ter o tipo alterado.");
            }

            if (string.IsNullOrWhiteSpace(
                    dados.TipoUsuario))
            {
                return BadRequest(
                    "Informe o tipo do usuário.");
            }

            string novoTipo =
                dados.TipoUsuario.Trim();

            if (!string.Equals(
                    novoTipo,
                    "Admin",
                    StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(
                    novoTipo,
                    "Cliente",
                    StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(
                    "O tipo de usuário deve ser Admin ou Cliente.");
            }

            usuario.TipoUsuario =
                string.Equals(
                    novoTipo,
                    "Admin",
                    StringComparison.OrdinalIgnoreCase)
                    ? "Admin"
                    : "Cliente";

            await _context.SaveChangesAsync();

            return Ok(usuario);
        }

        // ==========================================
        // EXCLUIR USUÁRIO
        // ==========================================

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(
            int id)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
            {
                return NotFound(
                    "Usuário não encontrado.");
            }

            // PROTEGE O ADMINISTRADOR PRINCIPAL
            if (usuario.Id == 1)
            {
                return BadRequest(
                    "O administrador principal não pode ser excluído.");
            }

            _context.Usuarios.Remove(usuario);

            await _context.SaveChangesAsync();

            return Ok(
                new
                {
                    mensagem =
                        "Usuário excluído com sucesso."
                });
        }
    }
}