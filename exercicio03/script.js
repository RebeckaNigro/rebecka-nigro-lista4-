async function buscarUsuarios() {
    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
        const dados = await resposta.json();
        const usuario = document.getElementById("usuario");

        dados.forEach(item => {
            const opcao = document.createElement("option");
            opcao.value = item.id;
            opcao.textContent = item.name;
            usuario.appendChild(opcao);
        });
    } catch (erro) {
        alert("Erro ao buscar usuarios");
    }
}

async function buscarPosts() {
    const id = document.getElementById("usuario").value;
    const posts = document.getElementById("posts");

    posts.innerHTML = "";
    document.getElementById("detalhes").innerHTML = "";

    if (id == "") return;
    try {
        const resposta = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const dados = await resposta.json();

        dados.forEach(post => {

            const botao = document.createElement("button");
            botao.textContent = post.title;
                botao.onclick = function () {

                verPost(post.id);
            };
            posts.appendChild(botao);
        });
    } catch (erro) {
        alert("Erro ao carregar posts");
    }
}

async function verPost(id) {
    const detalhes = document.getElementById("detalhes");

    try {
            const resposta = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
         const post = await resposta.json();

        const resposta2 = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const comentarios = await resposta2.json();

        detalhes.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <h4>Comentarios:</h4>
            <ul id="lista"></ul>
        `;

        const lista = document.getElementById("lista");

        comentarios.map(item => {
            const comentario = document.createElement("li");
             comentario.textContent = item.body;
            lista.appendChild(comentario);
        });
    } catch (erro) {
         alert("Erro ao mostrar detalhes");
    }
}

buscarUsuarios();
