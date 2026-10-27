async function cadastrar(event) {

    event.preventDefault();


    const usuario = {

        nome:
            document.getElementById("nome").value,

        email:
            document.getElementById("email").value,

        senha:
            document.getElementById("senha").value,

        tipoUsuario:
            "Usuario"
    };


    try {

        const resposta = await fetch(
            "https://localhost:7071/api/Usuarios",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(usuario)
            }
        );


        if (!resposta.ok) {

            alert("Erro ao cadastrar");

            return;
        }


        alert("Conta criada com sucesso!");


        window.location.href =
            "../pages/login.html";

    }

    catch (erro) {

        console.log(erro);

        alert("Erro no cadastro");
    }
}



// MOSTRAR SENHA

function toggleSenha() {

    const senha =
        document.getElementById("senha");


    if (senha.type === "password") {

        senha.type = "text";

    } else {

        senha.type = "password";
    }
}