const parametros =
    new URLSearchParams(window.location.search);


const id =
    parametros.get("id");



let produto = null;



async function carregarProduto() {

    try {

        // BUSCAR PRODUTO

        const resposta =
            await fetch(`https://localhost:7071/api/Produtos/${id}`);


        produto =
            await resposta.json();



        // IMAGEM

        document.getElementById("produto-imagem").src =
            produto.imagemUrl;



        // NOME

        document.getElementById("produto-nome").innerText =
            produto.nome;



        // DESCRIÇÃO

        document.getElementById("produto-descricao").innerText =
            produto.descricao;



        // PREÇO

        document.getElementById("produto-preco").innerText =
            `R$ ${produto.preco}`;

    }

    catch (erro) {

        console.log(
            "Erro ao carregar produto:",
            erro
        );

    }

}



/* ADICIONAR AO CARRINHO */

function adicionarCarrinho() {

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];



    carrinho.push(produto);



    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );



    alert("Produto adicionado ao carrinho!");



    // REDIRECIONAR

    window.location.href =
        "carrinho.html";

}



/* EXECUTAR */

carregarProduto();