async function buscarCep() {
    const cep = document.getElementById("cep").value.replace("-", " ");
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    if (cep.length != 8) {
        resultado.innerHTML = "CEP invalido";
        return;
    }
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            resultado.innerHTML = "CEP não encontrado";
            return;
        }

        resultado.innerHTML = `
            <p>Rua: ${dados.logradouro}</p>
            <p>Bairro: ${dados.bairro}</p>
            <p>Cidade: ${dados.localidade}</p>
            <p>Estado: ${dados.uf}</p>
        `;
    } catch (erro) {
        alert("Erro ao buscar o endereço");
    }
}
