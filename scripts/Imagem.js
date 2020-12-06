class Imagem {
    id;
    caminhoAbsoluto;
    foiExibido = false;

    constructor(id, caminhoAbsoluto) {
        this.id = id;
        this.caminhoAbsoluto = caminhoAbsoluto;
    }
}

export default Imagem;