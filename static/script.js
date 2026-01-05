document.addEventListener('DOMContentLoaded', () => {
    const containerSelecionadorData = document.querySelector('#seletor-data');
    let campoExibicaoData = document.getElementById('exibicao-data-despesa');
    let entradaDataOculta = document.getElementById('entrada-data-oculta');

    if (!campoExibicaoData.value) {
        campoExibicaoData.value = 'dd/mm/aaaa';
    }

    containerSelecionadorData.addEventListener('click', () => {
        entradaDataOculta.showPicker();
    });


    entradaDataOculta.addEventListener('change', () => {
        let dataSelecionada = entradaDataOculta.value
        if (dataSelecionada) {

            let [ano, mes, dia] = dataSelecionada.split('-');
            campoExibicaoData.value = `${dia}/${mes}/${ano}`;
        }
    });

    //data atual automática
    let hoje = new Date();
    let diaAtual = String(hoje.getDate()).padStart(2, '0');
    let mesAtual = String(hoje.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexado
    let anoAtual = hoje.getFullYear();
    entradaDataOculta.value = `${anoAtual}-${mesAtual}-${diaAtual}`;
    campoExibicaoData.value = `${diaAtual}/${mesAtual}/${anoAtual}`;

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // FIM DA LOGICA DO INPUT DATA, INÍCIO LOGICA DO INPUT VALOR
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    const valor_em_seletor_valor = document.getElementById("valor")
    console.log(valor_em_seletor_valor)     

    const formatarMoeda = (evento) => {
        let valor = evento.target.value;
        valor = valor.replace(/\D/g, "");

        if (valor === "") {
            valor = "0";
        }

        const converterFloat = parseFloat(valor) / 100;

        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(converterFloat);

        evento.target.value = valorFormatado;
        
    }

    valor_em_seletor_valor.addEventListener('input', formatarMoeda);
    // isso aqui serve se estiver vazio, mostrar R$ 0,00
    valor_em_seletor_valor.addEventListener('focus', (e) => {
        if(e.target.value === '') {
            formatarMoeda(e);
        }
    });

    // isso aqui serve se o usuario digitar e sair do input, o valor pre definido RS 0,00 some e volta o placeholder
    valor_em_seletor_valor.addEventListener('blur', (e) => {
        const valorLimpo = e.target.value.replace(/\D/g, "");
        if(valorLimpo === "0" || valorLimpo === "") {
            e.target.value = "";
        }
    });

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // FIM DA LOGICA DO INPUT VALOR, INÍCIO LOGICA DO INPUT METODO PAGAMENTO
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function selecionarOpcaoPagamento(idDoPagamento) {
        console.log(">>> CLIQUE DETECTADO! ID: " + idDoPagamento);

        // 2. Tenta achar o input
        const inputEscondido = document.getElementById('metodo_pagamento_input');
        
        if (inputEscondido) {
            inputEscondido.value = idDoPagamento;
            console.log(">>> SUCESSO: Valor salvo no input: " + inputEscondido.value);
            
            // Um alerta visual chato pra ter certeza que funcionou
            alert("FUNCIONOU! Você escolheu o ID: " + idDoPagamento);
        } else {
            console.error(">>> ERRO CRÍTICO: Não achei o input com id 'metodo_pagamento_input'");
            alert("ERRO: O input sumiu!");
        }
    }
    
    function ativarGrupo(seletor) {
        const grupo = document.querySelector(seletor);
        const labels = grupo.querySelectorAll('label');

        labels.forEach(label => {
            const input = label.querySelector('input');
            const button = label.querySelector('button');

            label.addEventListener('click', () => {
                // desativa todos do grupo
                labels.forEach(l => {
                    l.querySelector('button').classList.remove('btn-ativo');
                });

                // ativa o clicado
                input.checked = true;
                button.classList.add('btn-ativo');
            });
        });
    }

    ativarGrupo('#seletor-metodo-pagamento');
    ativarGrupo('#seletor-tipo-de-gasto');

    // ===========
    //LOGICA MODAL
    //============
    const modal = document.getElementById('modal-overlay');
    const btnCartaoGenerico = document.getElementById('btn-abre-modal-cartao');

    // Função para abrir
    function abrirModalCartao() {
        modal.style.display = 'flex'; // Torna visível (flex para centralizar)
    }

    // Função para fechar
    function fecharModal() {
        modal.style.display = 'none';
    }

    // Fecha se clicar fora da caixinha branca (na parte escura)
    function fecharModalFora(event) {
        if (event.target === modal) {
            fecharModal();
        }
    }

    // Função chamada quando escolhe Crédito ou Débito
    function selecionarCartao(tipo) {
        // 1. Fecha o modal
        fecharModal();
        
        // 2. Muda a cor do botão genérico para mostrar que foi selecionado
        // Primeiro remove a seleção visual dos outros (dinheiro/pix) se houver lógica para isso
        // Adiciona classe de destaque ao botão do cartão
        btnCartaoGenerico.classList.add('cartao-selecionado');
        
        // Opcional: Mudar o ícone do botão principal para refletir a escolha
        const iconePrincipal = btnCartaoGenerico.querySelector('i');
        if(tipo === 'Crédito') {
            iconePrincipal.className = 'ph ph-credit-card';
        } else {
            iconePrincipal.className = 'ph ph-cardholder';
        }
        
        console.log(`Você selecionou: ${tipo}`);
    }

    // Dica extra de Sênior:
    // Adicione um evento para limpar o estilo do botão 'cartão' se a pessoa clicar em Pix ou Dinheiro depois.
    const inputsPagamento = document.querySelectorAll('input[name="metodo_pagamento"]');
    inputsPagamento.forEach(input => {
        input.addEventListener('change', (e) => {
            // Se o valor for 1 (Dinheiro) ou 2 (Pix), remove o destaque do botão cartão
            if (e.target.value === '1' || e.target.value === '2') {
                btnCartaoGenerico.classList.remove('cartao-selecionado');
                // Reseta icone
                btnCartaoGenerico.querySelector('i').className = 'ph ph-cards';
            }
        });
    });
});


// adicionar um botão com simbolo de '?' que mostra como usar o app e os tipos de gasto e pagamento
// quando for fazer a validação das escolhas no btn Salvar,
// adicionar um pop up modal confirmando as escolhas, exemplo:
//  Vc deseja salvar? 
// data: 08/12/2025
// descrição: bolacha
// valor:2,50 
// metodo pagamento: pix
// tipo de gasto: não essenciais

