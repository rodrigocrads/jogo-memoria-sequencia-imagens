class Imagem {
    id;
    caminhoArquivo;
    foiExibido = false;

    constructor(id, caminhoArquivo) {
        this.id = id;
        this.caminhoArquivo = caminhoArquivo;
    }
}

export default Imagem;