function btnNovoJogo() {
    var form1 = document.getElementById("form-cadastro")
    var form2 = document.getElementById("form-jogo")

    form1.setAttribute("class","d-none")
    form2.removeAttribute("class")
}

function carregaDados() {
    var palavras=[]
    var dicas=[]
    
    document.getElementById("btnJogar").setAttribute("disabled", "disabled")

    palavras.push("ABELHA")
    dicas.push("Mel")
    palavras.push("AMARELO")
    dicas.push("Sol")
    palavras.push("ANIL")
    dicas.push("Cor do arco-iris que todos esquecem")
    palavras.push("AZUL")
    dicas.push("Cor do mar")
    palavras.push("BALEIA")
    dicas.push("Aquático, grande e pasado")
    palavras.push("BASQUETE")
    dicas.push("Enterrada")
    palavras.push("BRANCO")
    dicas.push("Cor da paz")
    palavras.push("CACHORRO")
    dicas.push("Amigo do homem")
    palavras.push("CANGURU")
    dicas.push("Lutador de boxe selvagem")
    palavras.push("CICLISMO")
    dicas.push("Esporte de bicicletas")
    palavras.push("CINZA")
    dicas.push("Preto com branco")
    palavras.push("CORRIDA")
    dicas.push("Velocidade")
    palavras.push("ELEFANTE")
    dicas.push("Marfim")
    palavras.push("FLAMINGO")
    dicas.push("Penas rosas")
    palavras.push("FUTEBOL")
    dicas.push("Brasil, país do...")
    palavras.push("FUTSAL")
    dicas.push("Futebol de quadra")
    palavras.push("GATO")
    dicas.push("Tem 7 vidas")
    palavras.push("GINASTICA")
    dicas.push("Daiane dos Santos")
    palavras.push("GIRAFA")
    dicas.push("Provavelmente o animal mais alto")
    palavras.push("GOLF")
    dicas.push("Carrinho, bandeira e lagos")
    palavras.push("GORILA")
    dicas.push("King Kong")
    palavras.push("HANDEBOL")
    dicas.push("Esporte de trave paralelepípeda")
    palavras.push("HIPISMO")
    dicas.push("Esporte de Cavalos")
    palavras.push("JUDO")
    dicas.push("Luta")
    palavras.push("LARANJA")
    dicas.push("Fruta cítrica")
    palavras.push("MAGENTA")
    dicas.push("Tinta rosa de impressora")
    palavras.push("MARROM")
    dicas.push("Cor de terra")
    palavras.push("MOSTARDA")
    dicas.push("Cor Cachorro-quente")
    palavras.push("NATACAO")
    dicas.push("Piscina")
    palavras.push("OVELHA")
    dicas.push("Lã")
    palavras.push("PAPAGAIO")
    dicas.push("Ave que fala")
    palavras.push("PRATA")
    dicas.push("Cor metálica")
    palavras.push("PRETO")
    dicas.push("Não reflete luz")
    palavras.push("ROSA")
    dicas.push("flor")
    palavras.push("RUGBY")
    dicas.push("Estilo Futebol Americano")
    palavras.push("SURF")
    dicas.push("Praia")
    palavras.push("TENIS")
    dicas.push("Esporte de raquete")
    palavras.push("VERDE")
    dicas.push("Natureza")
    palavras.push("VERMELHO")
    dicas.push("Cor do sangue")
    palavras.push("VOLEI")
    dicas.push("Manchete")

    montaTabuleiro(palavras, dicas)
}

var lado = 0, mantemDirecao = false
var vetorPalavras = []
var mapaPalavras = []
var x, y, direcao
var acertos = []
function montaTabuleiro(palavras, dicas) {

    // Embaralhar vetores
    var m = palavras.length, t, i
    var t2
    while (m) {
        i = Math.floor(Math.random() * m--)
        t = palavras[m]
        t2 = dicas[m]
        palavras[m] = palavras[i]
        dicas[m] = dicas[i]
        palavras[i] = t
        dicas[i] = t2
    }

    swal("Dicas", "• Clique nas células azuis para preencher uma palavra\n• Utilize as setas de navegação para percorrer o tabuleiro\n• Experimente utilizar a tecla Backspace para corrigir erros\n• Todas as palavras foram cadastradas sem acentos", "info");

    vetorPalavras = palavras
    for (var i=0; i<vetorPalavras.length; i++)
        acertos[i] = []

    // MAPEAR CADA PALAVRA DO VETOR
    // mapaPalavras[i] da palavras[i] = [coordenadaX, coordenadaY, direção]
    // direção (0 = vertical, 1 = horizontal)
    var i, j, combina
    var isolarPalavra = false
    for (i=0; i<palavras.length; i++){
        
        // Define direção intercadalada para as palavras
        direcao = i%2

        // 1. Mapeamento da primeira palavra - centralizar
        if (i == 0) {
            x = 5
            y = parseInt((12 - palavras[i].length) / 2)
            combina = true
        }
        
        // 2. Mapeamento geral - cruzar com palavra anterior
        // Se não der, cruzar com palavra anterior...
        else {
            var anterior = 1
            var cont1, cont2
            var letra1, letra2
            var testarComOutraPalavra = false

            // Enquanto não conseguir cruzar
            do {      

            if (testarComOutraPalavra) {
                // Inverte direção e troca a palavra de comparação
                direcao == 0 ? direcao = 1 : direcao = 0
                anterior++
            } testarComOutraPalavra = false

            // Impede estouro de vetor e ativa o último recurso
            if (i-anterior >= 0) {

            // Percorre palavra de comparação         
            cont1 = 0
            combina = false
            while (!combina && cont1 < palavras[i-anterior].length) {

                letra1 = palavras[i-anterior][cont1]

                // Percorre palavra a ser cruzada
                cont2 = 0
                while (!combina && cont2 < palavras[i].length) {

                    letra2 = palavras[i][cont2]

                    // Mapear somente se:
                    // (i) combinar letra
                    if (letra1 == letra2) {                        
                        var xPalavraMatch = mapaPalavras[i-anterior][0]
                        var yPalavraMatch = mapaPalavras[i-anterior][1]
                        if (direcao == 0) {
                            // (ii) a palavra couber no espaço vertical
                            if (yPalavraMatch - cont2 >= 0 && yPalavraMatch + palavras[i].length - 1 - cont2 <= 11) {
                                combina = true
                                x = xPalavraMatch + cont1
                                y = yPalavraMatch - cont2
                                
                                // (iii) não interferir em outras palavras
                                // Para cada palavra já mapeada, ver condições de interferência e não combinar, se for o caso
                                var xComp, yComp, dComp
                                for (j=0; j<mapaPalavras.length; j++) {
                                    xComp = mapaPalavras[j][0]
                                    yComp = mapaPalavras[j][1]
                                    dComp = mapaPalavras[j][2]

                                    if ((dComp == 1
                                            && xComp + palavras[j].length >= x
                                            && y + palavras[i].length >= yComp
                                            && xComp <= x
                                            && (yComp >= y || yComp == y - 1)
                                            && palavras[j][(x - xComp)] != palavras[i][yComp - y]) ||
                                        (dComp == 0
                                            && (xComp == x
                                            || xComp == x + 1
                                            || xComp == x - 1)) ||
                                        (dComp == 1
                                            && (xComp == x
                                            || xComp == x + 1
                                            || xComp == x - 1)
                                            && xComp != xPalavraMatch))

                                            combina = false
                                }
                            }
                        }
                        else {
                            // (ii) a palavra couber no espaço horizontal
                            if (xPalavraMatch - cont2 >= 0 && xPalavraMatch + palavras[i].length - 1 - cont2 <= 11) {
                                combina = true
                                x = xPalavraMatch - cont2
                                y = yPalavraMatch + cont1
                                
                                // (iii) não interferir em outras palavras
                                // Para cada palavra já mapeada, ver condições de interferência e não combinar, se for o caso
                                var xComp, yComp, dComp
                                for (j=0; j<mapaPalavras.length; j++) {
                                    xComp = mapaPalavras[j][0]
                                    yComp = mapaPalavras[j][1]
                                    dComp = mapaPalavras[j][2]

                                    if ((dComp == 0
                                            && yComp + palavras[j].length >= y
                                            && x + palavras[i].length >= xComp
                                            && yComp <= y
                                            && (xComp >= x || xComp == x - 1)
                                            && palavras[j][(y - yComp)] != palavras[i][xComp - x]) ||
                                        (dComp == 1
                                            && (yComp == y
                                            || yComp == y + 1
                                            || yComp == y - 1)) ||
                                        (dComp == 0
                                            && (yComp == y
                                            || yComp == y + 1
                                            || yComp == y - 1)
                                            && yComp != yPalavraMatch))
                                            
                                            combina = false
                                }
                            }
                        }
                    }
                    cont2++ // Incremento do laço
                } // Looping palavra a ser cruzada
                cont1++ // Incremento do laço
            } // Looping palavra de comparação
            
            // Se não cruzou com a palavra comparada, tentar com outra
            if(!combina) testarComOutraPalavra = true
            
            // Impede estouro de vetor e ativa o último recurso
            } else {isolarPalavra = true}

            } while (testarComOutraPalavra && !isolarPalavra)
        }

        // 3. Último recurso - isolar
        // Lógica de verificação semelhante ao mapeamento geral
        if (isolarPalavra) {
            var k, l
            for (j=0; j<12; j++){
                for (k=0; k<12; k++){
                    x = j
                    y = k
                    direcao = i%2
                    if (direcao == 0) {
                        if (y + palavras[i].length - 1 <= 11) {
                            combina = true
                            var xComp, yComp, dComp
                            for (l=0; l<mapaPalavras.length; l++) {
                                xComp = mapaPalavras[l][0]
                                yComp = mapaPalavras[l][1]
                                dComp = mapaPalavras[l][2]

                                if ((dComp == 1
                                        && xComp + palavras[l].length >= x
                                        && y + palavras[i].length >= yComp
                                        && xComp <= x
                                        && (yComp >= y || yComp == y - 1)
                                        && palavras[l][(x - xComp)] != palavras[i][yComp - y]) ||
                                    (dComp == 0
                                        && (xComp == x
                                        || xComp == x + 1
                                        || xComp == x - 1)) ||
                                    (dComp == 1 && (xComp == x + 1 || yComp == y - 1)))

                                        combina = false
                            }
                        }
                    } else {
                        if (x + palavras[i].length - 1 <= 11) {
                            combina = true
                            var xComp, yComp, dComp
                            for (l=0; l<mapaPalavras.length; l++) {
                                xComp = mapaPalavras[l][0]
                                yComp = mapaPalavras[l][1]
                                dComp = mapaPalavras[l][2]

                                if ((dComp == 0
                                        && yComp + palavras[l].length >= y
                                        && x + palavras[i].length >= xComp
                                        && yComp <= y
                                        && (xComp >= x || xComp == x - 1)
                                        && palavras[l][(y - yComp)] != palavras[i][xComp - x]) ||
                                    (dComp == 1
                                        && (yComp == y
                                        || yComp == y + 1
                                        || yComp == y - 1)) ||
                                    (dComp == 0 && (yComp == y + 1 || xComp == x - 1)))
                                        
                                        combina = false
                            }
                        }
                    }
                    if (combina) break
                }
                if (combina) break
            }
            isolarPalavra = false
        }

        if (x > 11 || y > 11 || (direcao != 0 && direcao != 1))
            combina = false

        // Palavra mapeada!
        // Salvar o mapeamento ou excluir palavra da lista
        if (combina) {
            mapaPalavras[i] = [x,y,direcao]
        } else {
            palavras.splice(i,1)
            dicas.splice(i,1)
            i--
        }

    } // Mapear próxima palavra da lista...

    // EXIBIR CÉLULAS MAPEADAS COM DICAS
    var celula, dicaAtual, el, d
    for (i=0; i<palavras.length; i++){

        // Informações da palavra
        x = mapaPalavras[i][0]
        y = mapaPalavras[i][1]
        direcao = mapaPalavras[i][2]
        direcao == 0 ? d = "V" : d = "H"

        // Célula inicial da palavra com borda
        celula = y*12 + (x + 1)
        el = document.getElementById("c"+celula)
        el.setAttribute("class","celula dica")

        // Adiciona dica única ou múltipla
        dicaAtual = el.getAttribute("data-original-title")        
        if (dicaAtual == "")         
            el.setAttribute("data-original-title", "(" + d + "): " + dicas[i])   
        else
            el.setAttribute("data-original-title", dicaAtual + " (" + d + "): " + dicas[i])

        // Configura atributos de cada caracter da palavra
        for (j=0; j<palavras[i].length; j++){
            if (j != 0)
                direcao == 0 ? celula += 12 : celula += 1

            el = document.getElementById("c"+celula)
            el.removeAttribute("disabled")
            el.setAttribute("oninput","javascript:confereLetra(this)")
            el.setAttribute("onfocus","this.select()")
            el.onkeydown = function() {
                var key = event.keyCode || event.charCode;   
                var celula = parseInt(this.getAttribute("id").slice(1, 4))   

                // Navegação por setas
                if(key == 37)                    
                    celula -= 1
                else if (key == 38)                  
                    celula -= 12
                else if (key == 39)                  
                    celula += 1
                else if (key == 40)                  
                    celula += 12
                
                // Retorna com backspace
                else if (key == 8 && this.value == "")
                    lado == 0 ? celula -= 12 : celula -= 1
                
                // Foca
                document.getElementById("c"+celula).focus()
                if (key == 8 && this.value == "")
                    return false
            }
        }
    }
}

function confereLetra(changed) {
    var i, j
    var celula
    var meuId = changed.getAttribute("id")
    var meuValue = changed.value.toUpperCase()

    // Busca em qual palavra foi feita a inserção
    for (i=0; i<vetorPalavras.length; i++) {
        x = mapaPalavras[i][0]
        y = mapaPalavras[i][1]
        direcao = mapaPalavras[i][2]

        celula = y*12 + (x + 1)

        for (j=0; j<vetorPalavras[i].length; j++){
            if (j != 0)
                direcao == 0 ? celula += 12 : celula += 1

            if ("c"+celula == meuId) {
                if (j == 0 && mantemDirecao == false) {
                    lado = direcao
                    mantemDirecao = true

                    var completa = true
                    for (var k=0; k<vetorPalavras[i].length; k++)
                        if (acertos[i][k] != 1)
                            completa = false
                            
                    if (completa)                    
                        lado == 0 ? lado = 1 : lado = 0
                }

                if (j == vetorPalavras[i].length - 1)
                    mantemDirecao = false

                // Preenche o vetor de acertos
                if (vetorPalavras[i][j] == meuValue)
                    acertos[i][j] = 1
                else
                    acertos[i][j] = 0

                conferePalavra(i)
            }
        }
    }

    if (changed.value != "") {
        celula = parseInt(meuId.slice(1, 4))
        lado == 0 ? celula += 12 : celula += 1
        if (document.getElementById("c"+celula) != null)
        document.getElementById("c"+celula).focus()
    }
}

function conferePalavra(i) {
    var j, celula, el, acerto = true

    x = mapaPalavras[i][0]
    y = mapaPalavras[i][1]
    direcao = mapaPalavras[i][2]

    // Confere se o vetor de acertos de uma palavra está completo
    for (j=0; j<vetorPalavras[i].length; j++){
        if (acertos[i][j] != 1)
            acerto = false
    }

    // Se sim, deixa a palavra colorida
    celula = y*12 + (x + 1) 
    if (acerto) {  
        for (j=0; j<vetorPalavras[i].length; j++){
            if (j != 0)
                direcao == 0 ? celula += 12 : celula += 1

            el = document.getElementById("c"+celula)
            if (j == 0 || el.getAttribute("class") == "celula dica" || el.getAttribute("class") == "celula dica acerto")
                el.setAttribute("class","celula dica acerto")
            else
                el.setAttribute("class","celula acerto")
        }
    } else {
        for (j=0; j<vetorPalavras[i].length; j++){
            if (j != 0)
                direcao == 0 ? celula += 12 : celula += 1

            el = document.getElementById("c"+celula)
            if (j == 0 || el.getAttribute("class") == "celula dica acerto" || el.getAttribute("class") == "celula dica")
                el.setAttribute("class","celula dica")
            else
                el.setAttribute("class","celula")
        }
    }

    // Confere se todo o vetor está completo
    acerto = true
    for (j=0; j<vetorPalavras.length; j++)
        for (var k=0; k<vetorPalavras[j].length; k++)
            if (acertos[j][k] != 1)
                acerto = false

    if (acerto)
        swal("Parabéns!","Você completou o jogo!","success").then(function(){ 
            location.reload();
            }
        );
}
