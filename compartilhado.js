function filtrar(caixaSelecao) {
    var idTabela = caixaSelecao.getAttribute('referencia');
    var tabela = document.getElementById(idTabela);
    var statusAtual = caixaSelecao.value;
    var linhas = tabela.querySelectorAll('tr.lin_impar_hover, tr.lin_par_hover');

    if (statusAtual == 'Todos') {
        for (i = 0; i < linhas.length; i++) {
            linhas[i].removeAttribute('style');
        }
    } else {
        for (i = 0; i < linhas.length; i++) {
            if (linhas[i].cells[7].getAttribute('sorttable_customkey') == statusAtual) {
                linhas[i].removeAttribute('style');
            } else {
                linhas[i].style.display = 'none';
            }
        }
    }
}