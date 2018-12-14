function montarCaixaSelecao(status, tabela, coluna, quantidades) {
    let caixaSelecao = document.createElement('select');
    let opcao = document.createElement('option');
    opcao.text = 'Todos';
    opcao.value = 'Todos';
    caixaSelecao.add(opcao);

    for (let statusAtual of status.values()) {
        opcao = document.createElement('option');
        opcao.text = statusAtual + ' (' + quantidades[statusAtual] + ')';
        opcao.value = statusAtual;
        caixaSelecao.add(opcao);
    }

    let atributo = document.createAttribute('referencia');
    atributo.value = tabela;
    caixaSelecao.setAttributeNode(atributo);

    atributo = document.createAttribute('coluna');
    atributo.value = coluna;
    caixaSelecao.setAttributeNode(atributo);

    atributo = document.createAttribute('tipo');
    atributo.value = 'filtro';
    caixaSelecao.setAttributeNode(atributo);

    return caixaSelecao;
}

function carregarElementos() {
    let abas = document.querySelectorAll('.tabbertab');
    let status = new Set();

    for (i = 0; i < abas.length; i++) {
        status.clear();

        let aba = abas[i];
        if (aba.getElementsByTagName('div')[0] !== undefined) {
            let idAba = aba.getElementsByTagName('div')[0].id;

            let tabela = aba.getElementsByTagName('table')[1];
            let idTabela = tabela.id;
            let linhas = tabela.querySelectorAll('tr.lin_impar_hover, tr.lin_par_hover');

            let titulos = tabela.querySelectorAll('thead tr th');
            let coluna = 7;
            for (k = titulos.length - 1; k != 0; k--) {
                if (titulos[k].textContent == 'Status') {
                    coluna = k;
                    break;
                }
            }

            let quantidades = {};
            for (j = 0; j < linhas.length; j++) {
                let statusLinha = linhas[j].cells[coluna].getAttribute('sorttable_customkey');
                status.add(statusLinha);
                if (quantidades[statusLinha] == undefined) {
                    quantidades[statusLinha] = 0;
                }

                quantidades[statusLinha] += 1;
            }

            let caixaSelecao = montarCaixaSelecao(status, idTabela, coluna, quantidades);
            inserirFiltro(idAba, caixaSelecao);
        }
    }
}

function inserirFiltro(aba, caixaSelecao) {
    let linha = document.querySelector('#' + aba + ' table tr');
    let coluna = linha.insertCell(-1);
    let atributo = document.createAttribute('align');
    atributo.value = 'right';
    coluna.setAttributeNode(atributo);
    coluna.innerHTML = caixaSelecao.outerHTML;
}

function injetarScript() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = `
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
    
    definirEventos();`
    document.getElementsByTagName('head')[0].appendChild(script);
}

carregarElementos();
injetarScript();
