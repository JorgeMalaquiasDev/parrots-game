
function comparador() {
	return Math.random() - 0.5;
}

// VARIAVEIS PARA CONTROLAR O ESTADO DO JOGO
let numeroDeCartas = 0;
let cartasSelecionadas = 0;
let cartasPareadas = 0;
let jogadas = 0;
let segundos = 0;
let bloqueioDeCliques = false;
let cronometro = null;

function setCards() {
	let parrotsImages = ["img/bobrossparrot.gif", "img/explodyparrot.gif", "img/fiestaparrot.gif", "img/metalparrot.gif", "img/revertitparrot.gif",
		"img/tripletsparrot.gif", "img/unicornparrot.gif"];
	parrotsImages.sort(comparador);

	numeroDeCartas = Number(prompt("Com quantas cartas você gostaria de jogar? Obs: Precisa ser entre 4 e 14 e ser um número par"));
	while (!(numeroDeCartas <= 14 && numeroDeCartas >= 4 && numeroDeCartas % 2 === 0)) {
		numeroDeCartas = Number(prompt("Com quantas cartas você gostaria de jogar?"));
	}

	let chosenParrotsImages = [];
	for (let i = 0; i < (numeroDeCartas / 2); i++) {
		chosenParrotsImages.push(parrotsImages[i]);
		chosenParrotsImages.push(parrotsImages[i]);
	}
	chosenParrotsImages.sort(comparador);

	for (let i = 0; i < numeroDeCartas; i++) {
		document.querySelector("ul").innerHTML +=
			`<li onclick="selecionarCarta(this)" class="carta">
		<div class="back">
			<img src=${chosenParrotsImages[i]} class="figura">
		</div>
		<div class="front">
			<img src="img/front.png">
		</div>
	</li>`
	}
}


setCards();
cronometro = setInterval(relogio, 1000);

//SELECAO DA CARTA E VERIFICACAO DA IGUALDADE OU NAO DAS DUAS CARTAS VIRADAS

function selecionarCarta(carta) {
	if (
		bloqueioDeCliques ||
		carta.classList.contains("deuMatch") ||
		carta.classList.contains("selecionada") ||
		cartasSelecionadas >= 2
	) {
		return;
	}

	bloqueioDeCliques = true;
	jogadas++;
	cartasSelecionadas++;
	setTimeout(() => {
		virarCarta(carta);
		let img = document.querySelectorAll(".selecionada .figura");
		if (img.length === 2) {
			if (img[0].src === img[1].src) {
				setTimeout(() => {
					parearCartas();
					bloqueioDeCliques = false;
				}, 100);
			} else {
				setTimeout(() => {
					desvirarCartas();
					bloqueioDeCliques = false;
				}, 1000);
			}
		} else {
			bloqueioDeCliques = false;
		}
	}, 100);
}

function virarCarta(carta) {
	carta.classList.add("selecionada");
}
function parearCartas() {
	let cartas = document.querySelectorAll(".selecionada");
	for (let i = 0; i < cartas.length; i++) {
		cartas[i].classList.add("deuMatch");
		cartas[i].classList.remove("selecionada");
	}
	cartasSelecionadas = 0;
	cartasPareadas += 2;
	if (cartasPareadas === numeroDeCartas) {
		fimDeJogo();
	}
}

function desvirarCartas() {
	let cartas = document.querySelectorAll(".selecionada");
	for (let i = 0; i < cartas.length; i++) {
		cartas[i].classList.remove("selecionada");
	}
	cartasSelecionadas = 0;
}

function fimDeJogo() {
	alert(`Você ganhou em ${jogadas} jogadas e levou ${segundos} segundos!`);
	clearInterval(cronometro);

}


//RELOGIO

function relogio() {
	segundos++;
	document.querySelector(".clock").innerHTML = segundos;
}
