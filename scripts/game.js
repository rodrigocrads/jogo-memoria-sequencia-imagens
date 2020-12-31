import Imagem from "./Imagem.js";

var sequencySize = 7;
let sequenciaImagensMemorizacao = construirSequenciaImagens();
var listaOpcoesImagens = [];
var ultimaPosicaoEscolhida = 0;
var jogoFinalizado = false;

var temporizadorSequencia = setInterval(
        exibirSequenciaImagens,
        '2000',
        sequenciaImagensMemorizacao
    );

function construirSequenciaImagens() {
    let listaSequenciaIndicesImagens = gerarSequenciaIndicesImagens();

    let listaSequenciaImagens = [];
    for(var i=0; i < listaSequenciaIndicesImagens.length; i++) {
        let identificador = listaSequenciaIndicesImagens[i];
        listaSequenciaImagens.push(
            new Imagem(identificador, `imgs/${identificador}.jpg`)
        );
    }
    return listaSequenciaImagens;
}

function gerarSequenciaIndicesImagens() {
    let listaSequenciaIndicesImagens = [];

    for (var i = 0; i < sequencySize; i++) {
        let deveGerarNumeroRandomico = true;
        do {
            let numeroRandomico = gerarNumeroRandomico();
            if (!listaSequenciaIndicesImagens.includes(numeroRandomico)) {
                listaSequenciaIndicesImagens.push(numeroRandomico);
                deveGerarNumeroRandomico = false;
            }
        } while (deveGerarNumeroRandomico);
    }

    return listaSequenciaIndicesImagens;
}

function gerarNumeroRandomico() {
    let numeroRandomico = Math.floor(Math.random() * sequencySize + 1);
    return numeroRandomico;
}

function exibirSequenciaImagens(listaImagens) {
    let imageHtmlElement = document.getElementById('image');

    let imagensNaoExibidas = listaImagens.filter(imagem => imagem.foiExibido === false);

    if (imagensNaoExibidas.length === 0) {
        imageHtmlElement.style.display = 'none';
        clearInterval(temporizadorSequencia);
        exibirOpcoesImagensApresentados();
        return;
    }

    for (let imagem in listaImagens) {
        if (listaImagens[imagem].foiExibido === false) {
            imageHtmlElement.src = listaImagens[imagem].caminhoAbsoluto;
            listaImagens[imagem].foiExibido = true;
            return;
        }
    }
}

function exibirOpcoesImagensApresentados() {
    let boxImagesElement = document.getElementById('box-choice-sequency-images');
    let listaAleatoriaImagens = construirSequenciaImagens();

    for (var i=0; i<sequencySize;i++) {
        let divHtmlElemento = document.createElement('div');
        let imgHtmlElemento = document.createElement('img');
        let spanHtmlElemento = document.createElement('span');

        imgHtmlElemento.src = listaAleatoriaImagens[i].caminhoAbsoluto;
        let idImagem = listaAleatoriaImagens[i].id;
        let idImgHtmlElemento = `opcao-image-${idImagem}`;
        imgHtmlElemento.id = idImgHtmlElemento;
        imgHtmlElemento.addEventListener('click', function () { selecionarOuRemoverOpcao(this);});

        spanHtmlElemento.setAttribute('id', `posicao-escolhida-opcao-image-${idImagem}`);
        spanHtmlElemento.setAttribute('class', `box-posicao-escolhida`);

        divHtmlElemento.append(spanHtmlElemento);
        divHtmlElemento.append(imgHtmlElemento);

        boxImagesElement.append(divHtmlElemento);

        listaOpcoesImagens.push({
            idImagem: idImagem,
            idImgHtmlElemento: idImgHtmlElemento,
            selecionado : false,
            posicaoEscolhida: null,
        });
    }
}

function selecionarOuRemoverOpcao(el) {
    let classValues = el.getAttribute('class');

    if (classValues && classValues.includes('selected')) {
        // @todo realizar a lógica quando selecionar uma opcao já selecionado
        //for (let opcao in listaOpcoesImagens) {
        //    if (listaOpcoesImagens[opcao].idElemento === el.id) {
        //        listaOpcoesImagens[opcao].selecionado = false;
        //        listaOpcoesImagens[opcao].posicaoEscolhida = null;
        //   }
        //}
        //el.removeAttribute("class");
    } else {
        for (let opcao in listaOpcoesImagens) {
            if (listaOpcoesImagens[opcao].idImgHtmlElemento === el.id) {
                listaOpcoesImagens[opcao].selecionado = true;
                listaOpcoesImagens[opcao].posicaoEscolhida = ++ultimaPosicaoEscolhida;
            }
        }

        let spanHtmlElemento = document.getElementById(`posicao-escolhida-${el.id}`);
        spanHtmlElemento.textContent = ultimaPosicaoEscolhida;
        el.setAttribute("class", "selected");
    }

    if (ultimaPosicaoEscolhida === sequencySize && jogoFinalizado === false) {
        exibirImagensApresentados();
        exibirResultadoJogo();
        jogoFinalizado = true;
    }
}

function exibirImagensApresentados() {
    let boxImagesElement = document.getElementById('box-sequency-images');

    for (var i = 0; i < sequencySize; i++) {
        let divHtmlElemento = document.createElement('div');
        let imgHtmlElemento = document.createElement('img');
        let spanHtmlElemento = document.createElement('span');

        imgHtmlElemento.src = sequenciaImagensMemorizacao[i].caminhoAbsoluto;
        imgHtmlElemento.setAttribute("class", "selected");

        // verificando se a posição da sequência das imagens foi igual ao que o usuário selecionou nas opções
        let opcaoImagem = obterOpcaoImagemSelecionadoPorId(sequenciaImagensMemorizacao[i].id);
        if (opcaoImagem && opcaoImagem.posicaoEscolhida !== i+1)
            imgHtmlElemento.setAttribute("class", "errou");

        spanHtmlElemento.setAttribute('id', `posicao-escolhida-opcao-image-${i+1}`);
        spanHtmlElemento.setAttribute('class', `box-posicao-escolhida`);
        spanHtmlElemento.textContent = i+1;

        divHtmlElemento.append(spanHtmlElemento);
        divHtmlElemento.append(imgHtmlElemento);

        boxImagesElement.append(divHtmlElemento);

    }
}

function obterOpcaoImagemSelecionadoPorId(id)
{
    for (var i=0; i < listaOpcoesImagens.length; i++) {
        if (listaOpcoesImagens[i].idImagem === id) {
            return listaOpcoesImagens[i];
        }
    }

    return undefined;
}

function exibirResultadoJogo() {
    // @todo Realizar logica de verificação do Game
}

