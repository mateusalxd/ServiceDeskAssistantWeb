function filtrar(caixaSelecao) {
    var idTabela = caixaSelecao.getAttribute('referencia');
    var tabela = document.getElementById(idTabela);
    var statusAtual = caixaSelecao.value;
    var linhas = tabela.getElementsByTagName('tr');

    if (statusAtual == 'Todos') {
        for (i = 1; i < linhas.length; i++) {
            linhas[i].removeAttribute('style');
        }
    } else {
        for (i = 1; i < linhas.length; i++) {
            if (linhas[i].cells[7].getAttribute('sorttable_customkey') == statusAtual) {
                linhas[i].removeAttribute('style');
            } else {
                linhas[i].style.display = 'none';
            }
        }
    }
}