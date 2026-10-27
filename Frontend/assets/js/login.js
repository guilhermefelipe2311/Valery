// LOGIN

async function fazerLogin(event) {

    event.preventDefault();


    // PEGAR VALORES

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;


    try {

        // BUSCAR USUÁRIOS

        const resposta =
            await fetch(
                "https://localhost:7071/api/Usuarios"
            );


        const usuarios =
            await resposta.json();


        // PROCURAR USUÁRIO

        const usuario =
            usuarios.find(u =>

                u.email === email &&
                u.senha === senha
            );


        // LOGIN INVÁLIDO

        if (!usuario) {

            alert("Email ou senha inválidos");

            return;
        }


        // SALVAR LOGIN

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuario)
        );


        // ADMIN

        if (

            usuario.tipoUsuario === "Admin" ||

            usuario.TipoUsuario === "Admin"

        ) {

            window.location.href =
                "../pages/admin.html";
        }

        // USUÁRIO

        else {

            window.location.href =
                "../pages/perfil.html";
        }

    }

    catch (erro) {

        console.log("Erro no login:", erro);

        alert("Erro ao fazer login");
    }
}



// MOSTRAR / ESCONDER SENHA

function toggleSenha() {

    const senha =
        document.getElementById("senha");


    if (senha.type === "password") {

        senha.type = "text";

    }

    else {

        senha.type = "password";
    }
}