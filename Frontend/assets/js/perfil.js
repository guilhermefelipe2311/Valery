// USUÁRIO LOGADO

const usuario =
    JSON.parse(
        localStorage.getItem("usuarioLogado")
    );



// VERIFICAR LOGIN

if (!usuario) {

    window.location.href =
        "../pages/login.html";
}



// MOSTRAR DADOS

document.getElementById("nome-usuario")
    .innerText =
    `Olá, ${usuario.nome} 👋`;


document.getElementById("email-usuario")
    .innerText =
    usuario.email;





// CARREGAR PEDIDOS

async function carregarPedidos() {

    try {

        const resposta =
            await fetch("https://localhost:7071/api/Pedidos");


        const pedidos =
            await resposta.json();


        const lista =
            document.getElementById("lista-pedidos");


        lista.innerHTML = "";


        pedidos.forEach(pedido => {

            lista.innerHTML += `

                <div class="pedido-card">

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

            `;
        });

    } catch (erro) {

        console.log(erro);
    }
}





// LOGOUT

function logout() {

    localStorage.removeItem(
        "usuarioLogado"
    );

    window.location.href =
        "../pages/login.html";
}




// EXECUTAR

carregarPedidos();