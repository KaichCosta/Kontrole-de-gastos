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

