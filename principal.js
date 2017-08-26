function montarCaixaSelecao(status, tabela, coluna) {
    var caixaSelecao = document.createElement('select');
    var opcao = document.createElement('option');
    opcao.text = 'Todos';
    opcao.value = 'Todos';
    caixaSelecao.add(opcao);

    for (let statusAtual of status.values()) {
        opcao = document.createElement('option');
        opcao.text = statusAtual;
        opcao.value = statusAtual;
        caixaSelecao.add(opcao);
    }

    var atributo = document.createAttribute("referencia");
    atributo.value = tabela;
    caixaSelecao.setAttributeNode(atributo);

    atributo = document.createAttribute("coluna");
    atributo.value = coluna;
    caixaSelecao.setAttributeNode(atributo);    

    atributo = document.createAttribute("onchange");
    atributo.value = "filtrar(this)";
    caixaSelecao.setAttributeNode(atributo);

    return caixaSelecao;
}

function carregar() {
    var abas = document.querySelectorAll('.tabbertab');
    var status = new Set();

    for (i = 0; i < abas.length; i++) {
        status.clear();

        var aba = abas[i];
        if (aba.getElementsByTagName('div')[0] !== undefined) {
            var idAba = aba.getElementsByTagName('div')[0].id;

            var tabela = aba.getElementsByTagName('table')[1];
            var idTabela = tabela.id;
            var linhas = tabela.querySelectorAll('tr.lin_impar_hover, tr.lin_par_hover');
            
            var titulos = tabela.querySelectorAll('thead tr th');
            var coluna = 7;
            for(k = titulos.length - 1; k != 0; k--) {
                if (titulos[k].textContent == "Status") {
                    coluna = k;
                    break;
                }
            }

            for (j = 0; j < linhas.length; j++) {
                var statusLinha = linhas[j].cells[coluna].getAttribute('sorttable_customkey');
                status.add(statusLinha);
            }

            var caixaSelecao = montarCaixaSelecao(status, idTabela, coluna);
            inserirFiltro(idAba, caixaSelecao);
        }
    }
}

function inserirFiltro(aba, caixaSelecao) {
    var linha = document.querySelector('#' + aba + ' table tr');
    var coluna = linha.insertCell(-1);
    var atributo = document.createAttribute("align");
    atributo.value = 'right'; 
    coluna.setAttributeNode(atributo);
    coluna.innerHTML = caixaSelecao.outerHTML;
}

function injetarScript() {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = chrome.extension.getURL('compartilhado.js');
    document.getElementsByTagName('head')[0].appendChild(script);
}

injetarScript();
carregar();