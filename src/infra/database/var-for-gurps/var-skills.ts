export const pericias = [
    {
      nome: "Adestramento de Animais",
      tipo: 'mental',
      dificuldade: 'difícil',
      preDefinido: [['IQ' , 6]],
      preRequisito: null,
      descricao: "Esta é a habilidade de treinar e trabalhar com todos os tipos de animais. Para treinar um animal, o adestrador deve ser bem sucedido em um teste de habilidade em cada dia de treinamento. Uma falha significa que o animal não aprendeu nada. Uma falha crítica significa que o animal atacou o adestrador. O tempo que se leva para adestrar um animal depende da sua inteligência e afabilidade. Veja o cap. Animais, na pág. 140."
    },
    {
        nome: "Falcoaria",
        tipo: 'mental',
        dificuldade: 'média',
        preDefinido: [['IQ' , '6'] , ['Adestramento de Animais' , 6] ],
        preRequisito: "Adestramento de Animais",
        descricao: "Esta é a habilidade de caçar pequenos animais usando um falcão treinado. Um bom falcoeiro conhecerá técnicas de caça e treinamento, além de saber como cuidar de um falcão (veja a coluna lateral na pág. 142). Descobrir um ninho de falcão na primavera exige uma semana de busca e um sucesso em um teste de falcoaria. O ninho terá 1D-3 filhotes."
    },
    {
        nome: "Carregamento",
        tipo: 'mental',
        dificuldade: 'difícil',
        preDefinido: [['IQ' , 6] , ['Adestramento de Animais' , 6] ],
        preRequisito: null,
        descricao: "Esta é a habilidade de carregar e descarregar animais com rapidez e eficiência. Ela inclui a habilidade de avaliar corretamente os animais antes da compra, conseguir deles o melhor rendimento possível e selecionar as melhores rotas para as récuas. Sempre haverá demanda de peritos neste assunto em áreas comerciais com NT menor que 6. O ganho será sempre da ordem do salário de um comandante de mercenários. Se uma caravana não tiver no mínimo um mestre-carregador (NH 15+), sua velocidade diminuirá em 20%. O exército americano usou milhares de animais de carga na Segunda Guerra Mundial e teria usado muitos mais, mas não encontrou o número necessário de bons carregadores, e 4 anos de guerra não foram suficientes para treiná-los. Em cenários com NT mais elevado, esta perícia é substituída pela Fretagem, que é menos complexa (Mental/Média) por não exigir a familiaridade com animais."
    },
    {
        nome: "Cavalgar",
        tipo: 'física',
        dificuldade: 'média',
        preDefinido: [['DX' , 5] , ['Adestramento de Animais' , 3] ],
        preRequisito: null,
        descricao: "Esta perícia é diferente para cada tipo de animal (em outras palavras, você precisa escolher um animal no qual deseja se especializar). Se você encontrar um tipo de montaria com o qual não está familiarizado, deverá usar seu nível de habilidade com o tipo de animal mais próximo. Se souber como montar a cavalo, por exemplo, você estaria submetido a um redutor de -3 numa tentativa de cavalgar um camelo, -6 para um golfinho e 0 para uma mula. Você deve fazer um teste de habilidade ao tentar montar um animal pela primeira vez e repeti-lo toda vez que alguma coisa assustá-lo ou provocá-lo (por ex., um salto). Modificadores: +5 se o animal o conhece e gosta de você; -10 se o animal não for uma criatura “comum” de montaria ou não tiver sido treinado como tal."
    },
    {
        nome: "Carreiro",
        tipo: 'mental',
        dificuldade: 'média',
        preDefinido: [['DX' , 5] , ['Adestramento de Animais' , 3] ],
        preRequisito: null,
        descricao: "Esta é a perícia na condução de juntas de animais, como um carroção. Ela inclui a habilidade de atrelar e cuidar dos animais, e de avaliá-los antes de uma compra. Conduzir um grupo com mais de 4 animais, ou um grupo com animais desconhecidos, submete o NH do personagem a um redutor de -2. Cada espécie de animal exige uma perícia diferente. O nível pré-definido em cada uma delas é igual ao nível em qualquer uma das outras -3. Cavalos e mulas são cobertos pela mesma perícia. Quando um carroção ou uma carga (um canhão, p.ex.) for movimentado a galope (mais de 30 km/h ou 10 hexes/turno), o condutor deverá fazer um teste de Carreiro a cada 10 segundos, com um redutor que pode ir até -5 devido a um terreno ruim. Uma falha numa jogada significa que a carga foi derrubada. Isto equivale a uma queda de 5 metros (dano igual a 5D-10) para cada homem ou animal envolvido. O condutor precisará ser bem sucedido em testes de Adestramento de Animais para conseguir acalmar os animais. Jogue também 2 dados para cada animal. Um resultado igual a 12 significa uma perna quebrada. O tempo requerido para reacomodar a carga dependerá do que está sendo transportado, do terreno e do clima."
    },
    {
        nome: "Veterinária",
        tipo: 'mental',
        dificuldade: 'difícil',
        preDefinido: [['Medicina' , 5] , ['Adestramento de Animais' , 3] ],
        preRequisito: null,
        descricao: "Esta é a habilidade em cuidar de animais feridos ou doentes. Tratase de uma perícia Médica (veja pág. 56). Modificadores: +5 se o animal já o conhece e confia em você; -2 ou pior se o animal for de um tipo com o qual você não está familiarizado. É permitida uma Especialização opcional (pág. 43)."
    },
    {
        nome: "Artista",
        tipo: 'mental',
        dificuldade: 'difícil',
        preDefinido: [['IQ' , 6]],
        preRequisito: null,
        descricao: "Esta é a habilidade de desenhar e pintar com beleza e precisão. Um sucesso num teste desta perícia poderia significar (por exemplo) que você fez um desenho bom o suficiente para ajudar na identificação de uma pessoa, desenhar um mapa fácil de seguir ou mesmo pintar um quadro bom o suficiente para trocar por uma refeição. (No último caso, o GM não deverá permitir que o teste seja feito contra o nível pré-definido para a perícia de um personagem que não a tem efetivamente. Sua inteligência pode lhe permitir fazer um desenho acurado, mas nunca bonito.)"
    },
    {
        nome: "Trovador",
        tipo: 'mental',
        dificuldade: 'média',
        preDefinido: [['IQ' , 5] , ['Atuação' , 2]],
        preRequisito: null,
        descricao: "Esta é a habilidade de contar histórias e falar de improviso. O bom uso deste talento permitirá (por exemplo) que você faça um bom discurso político; entretenha um grupo de pessoas ao redor de uma fogueira; incite (ou acalme) um tumulto ou tenha sucesso no papel de “bobo da corte”. Modificadores: +2 se você tiver a vantagem Voz Melodiosa e qualquer bônus devido ao seu Carisma, se o tiver. Se você tentar representar em um idioma que não seja o seu, subtraia 1 de seu NH para cada ponto abaixo de 12 em seu nível de proficiência naquela língua — por exemplo, se você estiver se apresentando em francês e seu NH com esta língua é 8, você estará submetido a um redutor de -4 em sua perícia como Trovador."
    },
    {
        nome: "Dança",
        tipo: 'física',
        dificuldade: 'média',
        preDefinido: [['DX' , 5]],
        preRequisito: null,
        descricao: "Esta é a capacidade de executar danças peculiares à sua própria cultura e de aprender novos estilos rapidamente. Modificadores: -5 se a dança for desconhecida. Uma dança ser-lhe-á familiar depois que você conseguir executá-la com sucesso por 3 vezes. Note que algumas deficiências físicas tornam esta perícia completamente impossível!"
    },
    {
        nome: "Poesia",
        tipo: 'mental',
        dificuldade: 'média',
        preDefinido: [['IQ' , 5] , ['Língua' , 5]],
        preRequisito: null,
        descricao: "Esta é a habilidade de compor qualquer tipo de poesia conhecido em sua civilização com “boa” qualidade, em qualquer língua em que você tenha fluência. Um teste de Poesia bem sucedido significa que você compôs um bom poema, num espaço de tempo adequado (determinado pelo GM). Uma falha significa que você não foi capaz de apresentar boas rimas, ou (pelo motivo que for) sua audiência simplesmente não gostou de seu trabalho. Modificadores: -3 (ou pior) se você estiver muito pressionado pelo tempo; +3 (ou mais) se tiver bastante tempo; as mesmas penalidades para língua estrangeira já vistas para “Trovador”."
    },
    {
        nome: "Escultura",
        tipo: 'física',
        dificuldade: 'média',
        preDefinido: [['DX' , 5] , ['IQ' , 5]],
        preRequisito: null,
        descricao: "Esta é a habilidade de moldar uma imagem razoavelmente semelhante a um ser humano ou um objeto, usando argila, madeira, marfim ou o que lhe venha às mãos. Para se produzir uma escultura em metal é necessário ter habilidade com forjaria. O tempo necessário é decidido pelo GM. O uso principal da escultura é como meio de vida, mas ela pode ser muito útil para aventureiros. Modificadores: -5 se as ferramentas apropriadas não estiverem disponíveis; -5 se o personagem não estiver familiarizado com o material; -5 se o material for difícil de trabalhar (por ex., mármore)."
    },
    {
        nome: "Canto",
        tipo: 'física',
        dificuldade: 'fácil',
        preDefinido: [['HT' , 4] ],
        preRequisito: null,
        descricao: "O estudo desta perícia está baseado em HT, e não DX. Esta é a habilidade de cantar de modo agradável. Um sucesso em um teste de habilidade significa que a audiência gostou de sua canção. Modificadores: -2 se audiência não entender a língua em que você está cantando; +2 se você tiver a vantagem de Voz Melodiosa."
    },
    {
        nome: "Escrita",
        tipo: 'mental',
        dificuldade: 'média',
        preDefinido: [['IQ' , 5] ],
        preRequisito: null,
        descricao: "Esta é a habilidade de escrever de maneira clara e/ou divertida. Um sucesso em um teste de habilidade significa que o trabalho é legível e acurado. Modificadores: -3 se você estava com pressa; +3 se tinha bastante tempo à disposição; -5 se você estava escrevendo sobre um assunto com o qual não está familiarizado. Esta é a perícia que mais se presta para ganhar o sustento e/ou escrever para o GURPS, mas pode ser de utilidade em uma aventura ... ou depois dela. O relatório de um espião, militar ou detetive particular será muito mais útil se estiver bem escrito!"
    },
    {
        nome: "Acrobacia",
        tipo: 'física',
        dificuldade: 'difícil',
        preDefinido: [['DX' , 6] ],
        preRequisito: null,
        descricao: "Esta é a habilidade de realizar proezas acrobáticas e ginásticas, rolar, tomar tombos, etc. Deve-se fazer um teste para cada truque que você tenta. Esta perícia pode ser conveniente em uma aventura; andar na corda bamba, pirâmides humanas e trapézio, todos têm aplicações práticas. Um teste de Acrobacia pode ser substituído por um teste de DX em qualquer tentativa de saltar, rolar, evitar ser Projetado para Trás e assim por diante. No esforço de se Esquivar de um golpe, um personagem pode tentar uma Esquiva Acrobática (v. pág. 108), um salto ou um rolamento que evite o ataque de uma maneira vistosa. Um sucesso em um teste de Acrobacia reduzirá a distância efetiva de qualquer queda em 5 metros (v. pág. 131). O GM pode aplicar os redutores que achar convenientes quando se tratar de uma proeza particularmente difícil"
    },
    {
        nome: "Controle da Respiração",
        tipo: 'mental',
        dificuldade: 'muito difícil',
        preDefinido: [ ],
        preRequisito: null,
        descricao: "Esta é a habilidade de respirar com a maior eficiência possível. No caso de um sucesso em um teste de habilidade o personagem pode triplicar o tempo que ele é capaz de prender a respiração por qualquer razão (por ex., debaixo d’água). Um sucesso em um teste de habilidade também possibilitará a recuperação de 1 ponto de fadiga em apenas dois minutos (isto não pode ser associado a operações mágicas que recuperam o corpo da fadiga). Normalmente, esta perícia não é conhecida fora das civilizações orientais; o GM poderá torná-la disponível em um cenário futurista."
    },
    {
        nome: "Gravidade Zero",
        tipo: 'mental',
        dificuldade: 'médio',
        preDefinido: [['DX' , 5],['HT' , 5]],
        preRequisito: null,
        descricao: "Esta é a perícia de lidar com um ambiente de gravidade zero (queda livre). É necessário um teste quando você entra pela primeira vez em queda livre. Uma falha significa que você se sente enjoado, e será necessário um sucesso em um novo teste de HT para evitar uma sufocação. Trate este caso como se fosse afogamento (v. Natação, pág. 91). Um novo teste será exigido toda vez que o personagem tentar alguma manobra complicada em queda livre. As falhas não o deixarão enjoado; significarão apenas que a tentativa fracassou."
    },
    {
        nome: "Salto",
        tipo: 'física',
        dificuldade: 'fácil',
        preDefinido: [['DX' , 4],['IQ' , 6]],
        preRequisito: null,
        descricao: "Esta é a perícia de fazer o melhor uso possível de sua força quando você salta. Quando o personagem tenta um salto difícil, ele poderá substituir seu NH em Salto por sua ST ou DX."
    },
    {
        nome: "Corrida",
        tipo: 'física',
        dificuldade: 'difícil',
        preDefinido: [ ],
        preRequisito: null,
        descricao: "Esta perícia está baseada em HT, não DX. Ela representa o treino em corridas de curta e longa distância. Se você estudou este assunto, divida o seu NH por 8 (não arredonde) e some o resultado a seu parâmetro Velocidade quando for calcular seu Deslocamento. (Isto afeta o movimento em terra somente). Exemplo: Se seu NH for igual a 18, seu parâmetro Velocidade deverá ser acrescido de 2,25 pontos antes de calcular seu parâmetro Deslocamento. Veja pág. 88."
    },
    {
        nome: "Mergulho",
        tipo: 'mental',
        dificuldade: 'média',
        preDefinido: [['IQ' , 5] , ["Natação" , 5]],
        preRequisito: null,
        descricao: "Esta é a habilidade em usar equipamentos para respirar debaixo d’água. Para evitar a ingestão de água (o que acarretaria na perda de 1 ponto de ST e em risco de afogamento), é necessário ter êxito no teste feito logo que você entra na água e nos subsqüentes, feitos a cada 30 minutos. Um sucesso no teste da perícia (e neste caso não é lícito usar os níveis pré-definidos), também lhe permitirá notar problemas com o equipamento, se você checá-lo antes de usar."
    },
    {
        nome: "Esqui",
        tipo: 'física',
        dificuldade: 'difícil',
        preDefinido: [['DX' , 6]],
        preRequisito: null,
        descricao: "Esta é a capacidade de esquiar. Um teste de habilidade é requerido quando você começa uma descida, exceto em uma rampa muito fácil, e outro a cada 30 minutos. Uma falha significa que você cai. No caso de uma falha crítica, você sofrerá 1D-1 pontos de dano em um membro escolhido aleatoriamente, e receberá a lesão incapacitante até que o ferimento sare. Se você tiver sofrido 5 pontos de dano, o membro estará na verdade quebrado."
    },
    {
        nome: "Natação",
        tipo: 'física',
        dificuldade: 'fácil',
        preDefinido: [['ST' , 5],['DX' , 4]],
        preRequisito: null,
        descricao: "Esta perícia é usada tanto para nadar (ou boiar em casos de emergência), como para salvar uma vítima de afogamento. Veja Natação (pág. 91), para as regras completas sobre natação, afogamento e salvamento de vidas."
    },
    {
        nome: "Machado ou Maça",
        tipo: 'física',
        dificuldade: 'média',
        preDefinido: [['DX' , 5]],
        preRequisito: null,
        descricao: "Habilidade no uso de qualquer arma pequena e desbalanceada como um machado, machadinha, maça, picareta etc..."
    },
    {
        nome: "Arremesso de Machado",
        tipo: 'física',
        dificuldade: 'fácil',
        preDefinido: [['DX' , 4]],
        preRequisito: null,
        descricao: "Habilidade no arremesso de qualquer machado de arremesso equilibrado, mas não um machado de guerra desbalanceado"
    },
    {
        nome: "Traje de Combate",
        tipo: 'mental',
        dificuldade: 'media',
        preDefinido: [['IQ' , 5],['DX' , 5],['Traje Pressurizado' , 3]],
        preRequisito: null,
        descricao: "Esta é a habilidade em usar um traje blindado auto-propelido, incluindo o armamento correspondente."
    },
]