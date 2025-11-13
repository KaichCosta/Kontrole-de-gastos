document.addEventListener('DOMContentLoaded', () => {
    const containerSelecionadorData = document.querySelector('#seletor-data');
    let campoExibicaoData = document.getElementById('exibicao-data-despesa');
    let entradaDataOculta = document.getElementById('entrada-data-oculta');

    if (!campoExibicaoData.value) {
        campoExibicaoData.value = 'dd/mm/aaaa';
    }
    //Quando o container principal ou o campo de exibição é clicado, abre o seletor de data escondido
    containerSelecionadorData.addEventListener('click', () => {
        entradaDataOculta.showPicker();
    });

    // Quando a data é selecionada no input type="date" escondido
    entradaDataOculta.addEventListener('change', () => {
        let dataSelecionada = entradaDataOculta.value
        if (dataSelecionada) {
        // Formata a data para DD/MM/AAAA
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
});

