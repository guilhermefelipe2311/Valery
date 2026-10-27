const listaCarrinho =
    document.getElementById("lista-carrinho");

const total =
    document.getElementById("total");



let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];



function carregarCarrinho() {

    listaCarrinho.innerHTML = "";

    let totalCompra = 0;



    carrinho.forEach((produto, index) => {

        totalCompra += produto.preco;



        listaCarrinho.innerHTML += `

        <div class="item-carrinho">

            <img class="imagem-carrinho"
                 src="${produto.imagemUrl}">


            <div class="item-info">

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    ${produto.descricao}
                </p>

                <span>
                    R$ ${produto.preco}
                </span>

            </div>


            <button onclick="removerItem(${index})">

                Excluir

            </button>

        </div>

        `;

    });



    total.innerText =
        `Total: R$ ${totalCompra}`;

}




// REMOVER ITEM

function removerItem(index) {

    carrinho.splice(index, 1);


    localStorage.setItem(

        "carrinho",

        JSON.stringify(carrinho)
    );


    carregarCarrinho();
}




// FINALIZAR PEDIDO

async function finalizarPedido() {

    try {

        // TOTAL

        let valorTotal = 0;


        carrinho.forEach(produto => {

            valorTotal += produto.preco;

        });



        // DADOS PEDIDO

        const pedido = {

            usuarioId: 1,

            valorTotal: valorTotal,

            status: "Pendente"
        };



        // ENVIAR PARA API

        await fetch(

            "https://localhost:7071/api/Pedidos",

            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(pedido)
            }
        );



        alert("Pedido realizado com sucesso!");



        // LIMPAR CARRINHO

        localStorage.removeItem("carrinho");


        window.location.reload();

    }

    catch (erro) {

        console.log(erro);

        alert("Erro ao finalizar pedido");
    }
}




// EXECUTAR

carregarCarrinho();