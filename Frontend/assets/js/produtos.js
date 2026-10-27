const listaProdutos =
    document.getElementById("lista-produtos");


async function carregarProdutos() {

    try {

        const resposta =
            await fetch("https://localhost:7071/api/Produtos");


        const produtos =
            await resposta.json();


        listaProdutos.innerHTML = "";


        produtos.forEach(produto => {

            listaProdutos.innerHTML += `

                <div class="card-produto">

                    <img src="${produto.imagemUrl}" alt="">

                    <div class="card-info">

                        <h3>${produto.nome}</h3>

                        <p>${produto.descricao}</p>

                        <span class="preco">
                            R$ ${produto.preco}
                        </span>

                        <button onclick="verProduto(${produto.id})">
                            Comprar
                        </button>

                    </div>

                </div>

            `;
        });

    } catch (erro) {

        console.log("Erro:", erro);

    }
}


function verProduto(id) {

    window.location.href =
        `pages/produto.html?id=${id}`;
}


carregarProdutos();