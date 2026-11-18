async function buscarEstados() {
    try {
        const resposta = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const dados = await resposta.json();
        const estado = document.getElementById("estado");

        dados.forEach(item => {
            const opcao = document.createElement("option");
            opcao.value = item.sigla;
            opcao.textContent = item.nome;
            estado.appendChild(opcao);
        });
    } catch (erro) {
        alert("Erro ao carregar estados");
    }
}

async function buscarCidades() {
    const uf = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade");

    cidade.innerHTML = '<option value="">Selecione uma cidade</option>';
    document.getElementById("resultado").innerHTML = "";

    if (uf == "") return;

    try {
        const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const dados = await resposta.json();

        dados.forEach(item => {
            const opcao = document.createElement("option");
            opcao.value = item.nome;
            opcao.textContent = item.nome;
            cidade.appendChild(opcao);
        });
    } catch (erro) {
        alert("Erro ao carregar cidades");
    }
}

function mostrarCidade() {

    const estado = document.getElementById("estado");
     const cidade = document.getElementById("cidade");

    if (estado.value == "" || cidade.value == "") return;

    const nomeEstado = estado.options[estado.selectedIndex].textContent;
     document.getElementById("resultado").innerHTML =
        `Voce selecionou: ${cidade.value} - ${nomeEstado}`;
}
buscarEstados();
