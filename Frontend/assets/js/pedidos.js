const listaPedidos =
    document.getElementById("lista-pedidos");


let pedidos =
    JSON.parse(localStorage.getItem("pedidos")) || [];


function carregarPedidos() {

    listaPedidos.innerHTML = "";


    pedidos.forEach(produto => {

        listaPedidos.innerHTML += `

            <div class="card-produto">

                <img src="${produto.imagem}"
                     alt="${produto.nome}">

                <div class="card-info">

                    <h3>${produto.nome}</h3>

                    <span class="preco">
                        ${produto.preco}
                    </span>

                </div>

            </div>

        `;
    });

}


carregarPedidos();