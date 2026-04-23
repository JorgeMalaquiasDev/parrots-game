
//!!!!DEFINICAO DE NUMERO DE CARTAS E EMBARALHAMENTO!!!!!

function comparador() { 
	return Math.random() - 0.5; 
}

let cartasTotais = ["img/bobrossparrot.gif", "img/explodyparrot.gif", "img/fiestaparrot.gif", "img/metalparrot.gif", "img/revertitparrot.gif",
"img/tripletsparrot.gif", "img/unicornparrot.gif"];
cartasTotais.sort(comparador);


let numeroDeCartas = Number(prompt("Com quantas cartas você gostaria de jogar?"));
while(!(numeroDeCartas<=14 && numeroDeCartas>=4 && numeroDeCartas%2===0)){
	numeroDeCartas = Number(prompt("Com quantas cartas você gostaria de jogar?"));
}

let cartasDoJogo = [];
for(let i=0;i<(numeroDeCartas/2);i++){
	cartasDoJogo.push(cartasTotais[i]);
	cartasDoJogo.push(cartasTotais[i]);
}
cartasDoJogo.sort(comparador);

for(let i=0;i<numeroDeCartas;i++){
	document.querySelector("ul").innerHTML += `<li onclick="selecionarCarta(this)" class="carta">
	<div class="back">
		<img src=${cartasDoJogo[i]} class="figura">
	</div>
	<div class="front">
		<img src="img/front.png">
	</div>
</li>`
}





//VARIAVEIS PARA CONTROLAR A ATUALIZAR Nº DE PARES ENCONTRADOS, Nº DE JOGADAS E CARTAS SELECIONADAS
let cartasSelecionadas = 0;
let cartasPareadas = 0;
let jogadas = 0;

let segundos = 0;

//SELECAO DA CARTA E VERIFICACAO DA IGUALDADE OU NAO DAS DUAS CARTAS VIRADAS

function selecionarCarta(carta){
	if((!carta.classList.contains("deuMatch")) && cartasSelecionadas<2){
		jogadas++;
		cartasSelecionadas++;
		setTimeout(virarCarta(carta), 0500);
	}
	if(cartasSelecionadas===2){
		let img = document.querySelectorAll(".selecionada .figura");
		
		if(img[0].src===img[1].src){
			setTimeout(parearCartas, 1000);
		}else{
			setTimeout(desvirarCartas, 1000);
		}
	}
}

function virarCarta(carta){
	carta.classList.toggle("selecionada");
}
function parearCartas(){
	document.querySelector(".selecionada").classList.add("deuMatch");
	document.querySelector(".selecionada").classList.remove("selecionada");
	document.querySelector(".selecionada").classList.add("deuMatch");
	document.querySelector(".selecionada").classList.remove("selecionada");
	cartasSelecionadas = 0;
	cartasPareadas += 2;
	if(cartasPareadas===numeroDeCartas){
		fimDeJogo();
	}
}
	
function desvirarCartas(){
	document.querySelector(".selecionada").classList.remove("selecionada");
	document.querySelector(".selecionada").classList.remove("selecionada");
	cartasSelecionadas = 0;
}

function fimDeJogo(){
	alert(`Você ganhou em ${jogadas} jogadas e levou ${segundos} segundos!`);
	clearInterval(1);

}


//RELOGIO

setInterval(relogio,1000);

function relogio(){
	segundos++;
	document.querySelector(".clock").innerHTML = segundos;
}