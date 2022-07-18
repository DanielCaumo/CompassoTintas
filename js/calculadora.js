//ELEMENTOS

//Campos de Input
const TodosCamposCor = Array.from(document.querySelectorAll(".cor"));
const TodosCamposAltura = Array.from(document.querySelectorAll(".altura"));
const TodosCamposLargura = Array.from(document.querySelectorAll(".largura"));
const TodosCamposPortas = Array.from(document.querySelectorAll(".portas"));
const TodosCamposJanelas = Array.from(document.querySelectorAll(".janelas"));

//Campos de Resultados por Parede
const TodosCamposCorParedes = Array.from(document.querySelectorAll(".cor-parede"));
const TodosCamposSuperficie = Array.from(document.querySelectorAll(".superficie"));
const TodosCamposTintasParedes = Array.from(document.querySelectorAll(".tinta-parede"));

//Campos de Resultados Gerais
const campoCor = document.querySelector("#cor-final");
const campoSuperficieTotal = document.querySelector("#superficie-total");
const campoTintaTotal = document.querySelector("#tinta-total");
const containerDiferenca = document.querySelector("#container-diferenca")
const campoTituloDiferenca = document.querySelector("#titulo-diferenca")
const campoDiferenca = document.querySelector("#diferenca");
const campoLitrosDiferenca = document.querySelector("#litros-diferenca")
const campoLata180 = document.querySelector("#lata180");
const campoLata36 = document.querySelector("#lata36");
const campoLata25 = document.querySelector("#lata25");
const campoLata5 = document.querySelector("#lata5");

//CONSTANTES
const alturaPorta = 1.9;
const larguraPorta = 0.8;
const alturaJanela = 1.2;
const larguraJanela = 2;

//FUNÇÕES

//Cálculo de Áreas

function calcularAreaAberturas(portas=0, janelas=0, i, areaParede){
    var areaPortas = alturaPorta * larguraPorta * portas;
    var areaJanelas = alturaJanela * larguraJanela * janelas;
    areaAberturas = areaPortas + areaJanelas;
    validarSuperficie(areaAberturas, i, areaParede);
    return (areaPortas + areaJanelas).toFixed(2)
}

function calcularAreaParede(altura=0, largura=0, i){
    var area = altura * largura;
    validarArea(area, i)
    return area.toFixed(2);
}

function calcularSuperficieParedes(){
    
}

function somarResultadosParedes(){
    var sTotal = 0
    for(i=0; i<4; i++){
        var superficie = TodosCamposSuperficie[i].value
        sTotal = sTotal + superficie;
        superficieTotal.innerHTML = sTotal 
    }
}


//Cálculo de Tinta

function calcularTintaNecessaria(superficie){
    const rendimentoTinta = 5;
    return (superficie/rendimentoTinta).toFixed(3);
}

function distribuirLatas(tinta){
    var tintaFaltante = tinta
    var lata180 = 0;
    var lata36 = 0;
    var lata25 = 0;
    var lata5 = 0;
    while(tintaFaltante>0){
        if(tintaFaltante>=18){
            tintaFaltante=tintaFaltante-18;
            lata180++;
        } else if(tintaFaltante>=3.6){
            tintaFaltante=tintaFaltante-3.6;
            lata36++;
        } else if(tintaFaltante>=2.5){
            tintaFaltante=tintaFaltante-2.5;
            lata25++;
        } else if(tintaFaltante>=0.5){
            tintaFaltante=tintaFaltante-0.5;
            lata5++;
        } else if(tintaFaltante>0){
            tintaFaltante=0;
            lata5=lata5+1;
        }
    }
    for(;lata5==5;lata5=0){
        lata25++
    }
    campoLata180.innerHTML = lata180;
    campoLata36.innerHTML = lata36;
    campoLata25.innerHTML = lata25;
    campoLata5.innerHTML = lata5;
}

function pintarCampo(texto, cor1, cor2){
    campoTituloDiferenca.innerHTML = texto;
    campoTituloDiferenca.style.color = cor1;
    campoDiferenca.style.color = cor1;
    campoLitrosDiferenca.style.color = cor1;
    containerDiferenca.style.background = cor2;
}

function calcularSobraTinta(){
    var sobra = 0
    sobra = parseFloat(campoLata180.textContent) * 18 + parseFloat(campoLata36.textContent) * 3.6 + parseFloat(campoLata25.textContent) * 2.5 + parseFloat(campoLata5.textContent) * 0.5 - parseFloat(campoTintaTotal.textContent)
    if(sobra > 0){
        var texto = "Sobram";
        var cor1 = "darkgreen";
        var cor2 = "lightgreen";
    }else if (sobra < 0){
        var texto = "Faltam";
        var cor1 = "red";
        var cor2 = "lightsalmon";
    }else{
        var texto = "Diferença";
        var cor1 = "black";
        var cor2 = "whitesmoke";
    }
    pintarCampo(texto,cor1,cor2);
    campoDiferenca.innerHTML = sobra.toFixed(3)
}

//Validações

function validarArea(area, i){
    if(area < 1){
        alert("A área da parede "+(i+1)+" deve ser maior do que 1m².");
        e.preventDefault();
    } else if(area > 50){
        alert("A área da parede "+(i+1)+" deve ser menor do que 50m².");
        e.preventDefault();
    }
}

function validarSuperficie(areaAberturas, i, areaParede){
    if(areaParede < areaAberturas * 2){
        alert("A área de portas e janelas da parede "+(i+1)+" não pode ultrapassar 50% da área total.")
        e.preventDefault();
    }
};

function validarAltura(altura, qtdePortas, i){
   alturaPorta.toFixed(2);
    if(qtdePortas > 0 && altura < alturaPorta + 0.3){
        alert("A parede "+(i+1)+" precisa ter mais do que "+(alturaPorta+0.30)+"m de altura para abrigar uma porta.");
        e.preventDefault();
    }
}

function validarLargura(largura, qtdePortas, qtdeJanelas, i){
    if(largura < qtdePortas * larguraPorta){
        alert("A largura da parede "+(i+1)+"  não comporta a quantidade de portas informadas.")
        e.preventDefault();
    }
    if(largura < qtdeJanelas * larguraJanela){
        alert("A largura da parede "+(i+1)+"  não comporta a quantidade de janelas informadas.")
        e.preventDefault();
    }
    if(largura < (qtdePortas * larguraPorta) + (qtdeJanelas * larguraJanela)){
        alert("A largura da parede "+(i+1)+"  não comporta a quantidade de portas e janelas informadas.")
        e.preventDefault();
    }
}

function validarPorta(somaPortas){
    var somaPortas = 0;
    for(i=0; i<4; i++){
        somaPortas += TodosCamposPortas[i].value
    }
    if (somaPortas == 0){
        alert("O cômodo precisa ter pelo menos uma porta!");
        e.preventDefault();
    }
}

//Funções Gerais

function calcular(){
    var superficieTotal = 0;
    for(i=0; i<TodosCamposAltura.length; i++){
        var altura = TodosCamposAltura[i].value; 
        var largura = TodosCamposLargura[i].value;
        var qtdePortas = TodosCamposPortas[i].value;
        var qtdeJanelas = TodosCamposJanelas[i].value;
        validarAltura(altura,qtdePortas,i);
        var areaParede = calcularAreaParede(altura, largura, i);
        var areaAberturas = calcularAreaAberturas(qtdePortas, qtdeJanelas, i, areaParede);
        var superficie = areaParede - areaAberturas;
        TodosCamposSuperficie[i].innerHTML = superficie;
        TodosCamposTintasParedes[i].innerHTML = calcularTintaNecessaria(superficie);
        superficieTotal = superficieTotal + superficie
        campoSuperficieTotal.innerHTML = superficieTotal
        validarPorta();
        validarLargura(largura, qtdePortas, qtdeJanelas, i);
    }
    var tintaNecessaria = calcularTintaNecessaria(superficieTotal);
    campoTintaTotal.innerHTML = tintaNecessaria;
    distribuirLatas(tintaNecessaria);
    calcularSobraTinta();
}

function resetar(){
    for(i=0; i<TodosCamposAltura.length; i++){
        TodosCamposCor[i].value = "";
        TodosCamposAltura[i].value = "";
        TodosCamposLargura[i].value = "";
        TodosCamposJanelas[i].value = "";
        TodosCamposPortas[i].value = "";
    }
    calcular();
};

// BOTÕES

const botaoCalcular = document.querySelector("#Calcular")
botaoCalcular.addEventListener('click', calcular)

const botaoResetar = document.querySelector("#Resetar")
botaoResetar.addEventListener('click', resetar)

const BotoesDiminuir = Array.from(document.querySelectorAll(".botao-menos"));
const BotoesAumentar = Array.from(document.querySelectorAll(".botao-mais"));
const ResultadosLatas = Array.from(document.querySelectorAll(".resultado-lata"));

// VALIDAÇÕES EXTRAS

// Impedir inserção de números negativos e "e"

var caracteresInvalidos = [
  "-",
  "+",
  "e",
];

var inputs = document.querySelectorAll('input')

inputs.forEach(input =>{
    input.addEventListener('keydown', function(e){
        if (caracteresInvalidos.includes(e.key)){
            e.preventDefault();
        }
    })
})