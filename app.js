
let numerosSorteados = [];
let algumCampoVazio;
let resultado;
let qtdNumeros;
let valorInicial;
let valorFinal;

seCamposVazios();

function sortear() {
    qtdNumeros = parseInt(document.getElementById('quantidade').value);
    valorInicial = parseInt(document.getElementById('de').value);
    valorFinal = parseInt(document.getElementById('ate').value);

    if (valorInicial >= valorFinal) {
        limparCampos();
        alert('O valor inicial não pode ser maior que o valor final!');
    } else {
        const qtdPossivel = valorFinal - valorInicial + 1;
        if (qtdNumeros > qtdPossivel) {
            limparCampos();
            alert('Não é possível sortear!');
        } else {
            for (let i = 0; i < qtdNumeros; i++) {
                resultado = numeroAleatorio(valorInicial, valorFinal);
                while (numerosSorteados.includes(resultado)) {
                    resultado = numeroAleatorio(valorInicial, valorFinal);
                }
                numerosSorteados.push(resultado);
            }
        }
    }

    document.getElementById('btn-sortear').className = 'container__botao-desabilitado';
    document.getElementById('btn-reiniciar').className = 'container__botao';

    atualizarTexto();
}

function reiniciar() {
    limparCampos();

    let textoDiv = document.getElementById('resultado');
    let textoLabel = textoDiv.querySelector('label');

    textoLabel.textContent = 'Números sorteados:  nenhum até agora';

    document.getElementById('btn-reiniciar').className = 'container__botao-desabilitado';
    document.getElementById('btn-sortear').className = 'container__botao';

    seCamposVazios();
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function atualizarTexto() {
    let textoDiv = document.getElementById('resultado');
    let textoLabel = textoDiv.querySelector('label');

    textoLabel.textContent = `Números sorteados: ${numerosSorteados}`;

    numerosSorteados = [];
}

function limparCampos() {
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';

    numerosSorteados = [];
}

function seCamposVazios() {
    let campos = document.querySelectorAll('input');
    let botaoSortear = document.getElementById('btn-sortear');

    algumCampoVazio = Array.from(campos).some(input => !input.value);
    botaoSortear.disabled = algumCampoVazio;

    campos.forEach(input => {
        input.addEventListener('input', seCamposVazios);
    });
}
