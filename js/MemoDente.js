var audioAcerto = document.createElement('audio');

var audioClique = document.createElement('audio');
audioClique.setAttribute('src', './mp3/clique.mp3');

var audioFinalizado = document.createElement('audio');
audioFinalizado.setAttribute('src', './mp3/finalizado.mp3');

var imagem0 = './img/0.jpg';
var tamanhoMesa = 0;
var maxImagem = 12;
var tentativas = 0;
var acertos = 0;
var eImpar = false;
var dadosAcerto = [
	{ "idAcerto": "./img/1.jpg", "audioSrc":"./mp3/acerto-1.mp3", "textoMensagem": "Um dentinho bem cuidado brilha de felicidade!"},
	{ "idAcerto": "./img/2.jpg", "audioSrc":"./mp3/acerto-2.mp3", "textoMensagem": "A cada refeição, uma nova escovação e seu dentinho sempre estará saudável!"},
	{ "idAcerto": "./img/3.jpg", "audioSrc":"./mp3/acerto-3.mp3", "textoMensagem": "A escovação é um trabalho em equipe, com a ajuda de um adulto a limpeza é garantida!"},
	{ "idAcerto": "./img/4.jpg", "audioSrc":"./mp3/acerto-4.mp3", "textoMensagem": "Depois das refeições, os super-heróis salvam o dentinho com um pedacinho de fio dental!"},
	{ "idAcerto": "./img/5.jpg", "audioSrc":"./mp3/acerto-5.mp3", "textoMensagem": "Os alimentos saudáveis vão ajudar o seu dentinho a ficar forte!"},
	{ "idAcerto": "./img/6.jpg", "audioSrc":"./mp3/acerto-6.mp3", "textoMensagem": "Com os dentinhos limpinhos, você terá sempre um lindo sorriso!"},
	{ "idAcerto": "./img/7.jpg", "audioSrc":"./mp3/acerto-7.mp3", "textoMensagem": "Evite alimentos açucarados, para seus dentinhos não ficarem doentinhos."},
	{ "idAcerto": "./img/8.jpg", "audioSrc":"./mp3/acerto-8.mp3", "textoMensagem": "O fio dental limpa o sujinho que fica entre os dentinhos, para que você sorria sempre contente!"},
	{ "idAcerto": "./img/9.jpg", "audioSrc":"./mp3/acerto-9.mp3", "textoMensagem": "Seu dentinho ama ser escovado, assim ele sempre estará limpinho!"},
	{ "idAcerto": "./img/10.jpg", "audioSrc":"./mp3/acerto-10.mp3", "textoMensagem": "Não precisa creme dental de montão, um pouquinho como, um grãozinho de feijão, faz toda a diversão!"},
	{ "idAcerto": "./img/11.jpg", "audioSrc":"./mp3/acerto-11.mp3", "textoMensagem": "O fio dental passa devagarinho entre os dentinhos, limpando com muito carinho!"},
	{ "idAcerto": "./img/12.jpg", "audioSrc":"./mp3/acerto-12.mp3", "textoMensagem": "Limpe a língua devagar, para a sujeira retirar!"}
];

function criaMesa(pThis, pX, pY) {
	if((pX * pY) - 1 > maxImagem * 2) {
		alert("Quantidade cartas ((Linhas x Colunas) / 2) deve ser menor que o máximo de imagens: " + maxImagem);
		return;
	}

	montaMesa(pX, pY);
}

function montaMesa(pX, pY) {
	var cartas = [];
	tentativas = 0;
	acertos = 0;
	eImpar = false;
	tamanhoMesa = pX * pY;

	$('#mesa').empty();
	$('#placar').text('Acertos: ' + acertos + ' de ' + Math.floor(tamanhoMesa/2) + ' \u2605 ' +' Tentativas: ' + tentativas);

	if((pX * pY) % 2 != 0) {
		eImpar = true;
		tamanhoMesa--;
	}

	for(i = 0; i < tamanhoMesa/2; i++) {
		do {
			valor = getRandomInt(1, maxImagem);
		} while (cartas.indexOf(valor) >= 0);
		cartas.push(valor);
		cartas.push(valor);
	}

	for(iX = 1; iX <= pX; iX++) {
		$('#mesa').append('<div id="linha' + iX +'" class="row linha-' + pX + '"> </div>');
		for(iY = 1; iY <= pY; iY++) {
			if(eImpar && iX == iY && iX == Math.ceil(pX / 2) ) {
				$('#linha' + iX).append(
					  '<div id="carta' + iX + iY +'" class="col altura">'
					+ '	<img id="img' + iX + iY +'" class="rounded img-fluid border border-2 border-primary altura" src="./img/99.jpg" />'
					+ '</div>'
				);
				continue;
			}

			carta = getRandomInt(0, (cartas.length - 1));
			$('#linha' + iX).append(
				  '<div id="carta' + iX + iY +'" class="col altura">'
				+ '	<img id="img' + iX + iY +'" class="rounded img-fluid border border-2 border-primary altura" src="./img/0.jpg" onclick="revelaCarta(this, \'./img/' 
					+ cartas.splice(carta,1)
					+ '.jpg\');" />'
				+ '</div>'
			);
		}
	}
}

function revelaCarta(pThis, pValor) {
	// Ignora click em carta já revelada.
	if(pThis.src == pValor || $('#id00').val() == pThis.id) {
		return;
	}

	audioClique.play();

	// Revela carta.
	pThis.src = pValor;

	// Verifica tem carta revelada, se sim trata a jogada, se não atribui valor a carta revelada.
	if($('#valor00').val() == '') {
		$('#valor00').val(pValor);
		$('#id00').val(pThis.id);
		return;
	}

	window.setTimeout(function(){
		trataCartaRevelada(pThis, pValor);
	}, 1000);
}

function trataCartaRevelada(pThis, pValor) {
	tentativas++;
	// Caso tenha carta revelada.
	if($('#valor00').val() == pValor) {
		trataAcerto(pThis);
	} else {
		// Se a comparação resultar em diferentes remove a carta revelada e oculta as duas.
		pThis.src = imagem0;
		$('#' + $('#id00').val()).attr('src',imagem0);
	}
	
	// Atualizar placar.
	$('#placar').text('Acertos: ' + acertos + ' de ' + (tamanhoMesa/2) + ' \u2605 ' + ' Tentativas: ' + tentativas);

	$('#valor00').val('');
	$('#id00').val('');
}

function trataAcerto(pThis) {
	// Se a comparação resultar em iguais, remove as ações das cartas e as mantem reveladas.
	pThis.onclick = '';
	acertos++;
	
	mostraMensagemAcerto(pThis);
}

function mostraMensagemAcerto(pThis) {
	let acerto = dadosAcerto.find(acerto => acerto.idAcerto === $('#valor00').val());

	var acertoModal = new bootstrap.Modal($('#acerto'));
	
	acertoModal.show();
	
	$('#imagemAcerto').attr('src',acerto.idAcerto);
	$('#mensagemAcerto').text(acerto.textoMensagem);

    audioAcerto.setAttribute('src', acerto.audioSrc);

	$('#fecharAcerto').hide();
	
	audioAcerto.onended = null;
	audioFinalizado.onended = null;
	
	if(acertos == tamanhoMesa/2) {
		// $('#mensagemFinalizado').text('Parabéns, você encontrou todos os pares, aprendeu a cuidar melhor do seu dentinho e ganhou a medalha de dentinho campeão!');
		audioAcerto.onended = function(){ audioFinalizado.play(); 
			$('#imagemAcerto').attr('src','./img/premio frente.jpg'); 
			$('#mensagemAcerto').text('Parabéns, você encontrou todos os pares, aprendeu a cuidar melhor do seu dentinho e ganhou a medalha de dentinho campeão!');
		};
		audioFinalizado.onended = function(){$('#fecharAcerto').show();};
	} else {
		$('#mensagemFinalizado').text('');
		audioAcerto.onended = function(){$('#fecharAcerto').show();};
	}

	audioAcerto.play();

}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}