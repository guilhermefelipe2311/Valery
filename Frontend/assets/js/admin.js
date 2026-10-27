let produtoEditando = null;


// CADASTRAR PRODUTO

async function cadastrarProduto() {

    const produto = {

        nome:
            document.getElementById("nome").value,

        descricao:
            document.getElementById("descricao").value,

        preco:
            parseFloat(
                document.getElementById("preco").value
            ),

        quantidade:
            parseInt(
                document.getElementById("quantidade").value
            ),

        imagemUrl:
            document.getElementById("imagemUrl").value,

        categoriaId: 1
    };


    try {

        await fetch("https://localhost:7071/api/Produtos", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(produto)
        });


        alert("Produto cadastrado!");


        limparCampos();


        carregarDashboard();

    } catch (erro) {

        console.log(erro);

        alert("Erro ao cadastrar produto");

    }

}




// DASHBOARD

async function carregarDashboard() {

    carregarProdutosAdmin();

    carregarUsuarios();

    carregarPedidos();
}




// PRODUTOS

async function carregarProdutosAdmin() {

    const resposta =
        await fetch("https://localhost:7071/api/Produtos");


    const produtos =
        await resposta.json();



    // TOTAL PRODUTOS

    document.getElementById("total-produtos")
        .innerText = produtos.length;



    // LISTA

    const lista =
        document.getElementById("lista-admin");


    lista.innerHTML = "";



    produtos.forEach(produto => {

        lista.innerHTML += `

            <div class="card-admin">

                <img src="${produto.imagemUrl}">

                <div class="card-admin-info">

                    <h3>${produto.nome}</h3>

                    <p>
                        R$ ${produto.preco}
                    </p>

                </div>

                <div class="acoes">

                    <button
                        class="btn-editar"
                        onclick="editarProduto(${produto.id})">

                        Editar

                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${produto.id})">

                        Excluir

                    </button>

                </div>

            </div>

        `;
    });

}




// USUÁRIOS

async function carregarUsuarios() {

    try {

        const resposta =
            await fetch("https://localhost:7071/api/Usuarios");


        const usuarios =
            await resposta.json();


        document.getElementById("total-usuarios")
            .innerText = usuarios.length;

    } catch (erro) {

        console.log(erro);
    }
}




// PEDIDOS

// PEDIDOS

async function carregarPedidos() {

    try {

        const resposta =
            await fetch("https://localhost:7071/api/Pedidos");


        const pedidos =
            await resposta.json();


        // TOTAL PEDIDOS

        document.getElementById("total-pedidos")
            .innerText = pedidos.length;


        // LISTA PEDIDOS

        const lista =
            document.getElementById("lista-pedidos");


        lista.innerHTML = "";


        pedidos.forEach(pedido => {

            lista.innerHTML += `

                <div class="card-admin">

                    <div class="card-admin-info">

                        <h3>
                            Pedido #${pedido.id}
                        </h3>

                        <p>
                            Valor:
                            R$ ${pedido.valorTotal}
                        </p>

                        <p>
                            Status:
                            ${pedido.status}
                        </p>

                        <p>
                            Usuário:
                            ${pedido.usuarioId}
                        </p>

                    </div>

                </div>

            `;
        });

    } catch (erro) {

        console.log(erro);
    }
}



// EXCLUIR PRODUTO

async function excluirProduto(id) {

    await fetch(`https://localhost:7071/api/Produtos/${id}`, {

        method: "DELETE"
    });


    carregarDashboard();
}




// EDITAR PRODUTO

async function editarProduto(id) {

    const resposta =
        await fetch(`https://localhost:7071/api/Produtos/${id}`);


    const produto =
        await resposta.json();


    produtoEditando = id;


    document.getElementById("nome").value =
        produto.nome;

    document.getElementById("descricao").value =
        produto.descricao;

    document.getElementById("preco").value =
        produto.preco;

    document.getElementById("quantidade").value =
        produto.quantidade;

    document.getElementById("imagemUrl").value =
        produto.imagemUrl;


    const botao =
        document.querySelector(".form-produto button");


    botao.innerText =
        "Salvar Alterações";


    botao.onclick =
        salvarEdicao;
}




// SALVAR EDIÇÃO

async function salvarEdicao() {

    const produto = {

        id: produtoEditando,

        nome:
            document.getElementById("nome").value,

        descricao:
            document.getElementById("descricao").value,

        preco:
            parseFloat(
                document.getElementById("preco").value
            ),

        quantidade:
            parseInt(
                document.getElementById("quantidade").value
            ),

        imagemUrl:
            document.getElementById("imagemUrl").value,

        categoriaId: 1
    };


    await fetch(

        `https://localhost:7071/api/Produtos/${produtoEditando}`,

        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(produto)
        }
    );


    alert("Produto atualizado!");


    produtoEditando = null;


    limparCampos();


    const botao =
        document.querySelector(".form-produto button");


    botao.innerText =
        "Cadastrar Produto";


    botao.onclick =
        cadastrarProduto;


    carregarDashboard();
}




// LIMPAR CAMPOS

function limparCampos() {

    document.getElementById("nome").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("preco").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("imagemUrl").value = "";
}




// SAIR DA CONTA

function sair() {

    localStorage.removeItem("usuarioLogado");

    window.location.href =
        "../pages/login.html";
}
// LISTAR PEDIDOS

async function carregarPedidos() {

    try {

        const resposta =
            await fetch("https://localhost:7071/api/Pedidos");


        const pedidos =
            await resposta.json();


        // TOTAL

        document.getElementById("total-pedidos")
            .innerText = pedidos.length;


        // LISTA

        const lista =
            document.getElementById("lista-pedidos");


        lista.innerHTML = "";


        pedidos.forEach(pedido => {

            lista.innerHTML += `

                <div class="card-admin">

                    <div class="card-admin-info">

                        <h3>
                            Pedido #${pedido.id}
                        </h3>

                        <p>
                            Valor:
                            R$ ${pedido.valorTotal}
                        </p>

                        <p>
                            Status:
                            ${pedido.status}
                        </p>

                    </div>

                </div>

            `;
        });

    } catch (erro) {

        console.log(erro);
    }
}



// EXECUTAR

carregarDashboard();