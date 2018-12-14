function filtrar(caixaSelecao) {
    var idTabela = caixaSelecao.getAttribute('referencia');
    var coluna = caixaSelecao.getAttribute('coluna');
    var tabela = document.getElementById(idTabela);
    var statusAtual = caixaSelecao.value;
    var linhas = tabela.querySelectorAll('tr.lin_impar_hover, tr.lin_par_hover');

    if (statusAtual == 'Todos') {
        for (i = 0; i < linhas.length; i++) {
            linhas[i].removeAttribute('style');
        }
    } else {
        for (i = 0; i < linhas.length; i++) {
            if (linhas[i].cells[coluna].getAttribute('sorttable_customkey') == statusAtual) {
                linhas[i].removeAttribute('style');
            } else {
                linhas[i].style.display = 'none';
            }
        }
    }
}

function definirEventos() {
    let caixasSelecao = document.querySelectorAll('select[tipo="filtro"]');
    for (let i = 0; i < caixasSelecao.length; i++) {
        let caixaSelecao = caixasSelecao[i];
        caixaSelecao.addEventListener('change', function() { filtrar(this) });
    }
}

definirEventos();