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

export const pericias2 = [
    {
        nome: "Armas de Feixe",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4]],
        preRequisito: null,
        descricao: "Esta é a habilidade no uso de qualquer tipo de Arma de Feixes Iônicos, laser, atordoadores, etc. Ela inclui tanto armas do tipo pistola, com o fuzil, visto que nenhum deles sofre recuo. Se sua IQ for igual a 10 ou 11, some 1 ponto ao seu NH. Se for maior do que 11, some 2 pontos. Os modificadores são iguais aos descritos para a perícia Armas de Fogo"
    },
    {
        nome: "Armas de Feixe",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4]],
        preRequisito: null,
        descricao: "Esta arma só é útil em combates de perto e, na maioria dos casos, é usada em ataques de supresa. Como ela provoca um dano básico muito pequeno, costuma ser usada para golpear a cabeça. Se não desejar provocar uma lesão muito séria, o atacante poderá “bater de leve” (v. pág. 122), não fazendo uso de sua ST total"
    },
    {
        nome: "Armas de Pólvora",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso de armas de pólvora, incluindo mosquetões, pistolas e fuzis. Adicione 1 a seu NH, se sua IQ for igual a 10 ou 11, e 2 para o caso de IQ maior ou igual a 12. Os modificadores são iguais aos encontrados em Armas de Fogo, pág 51."
    },
    {
        nome: "Zarabatana",
        tipo: 'Physical',
        dificuldade: 'Hard',
        preDefinido: [['DX' , 6]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso da zarabatana, para lançar pequenos dardos (normalmente envenenados). Estes dardos não são capazes de furar as roupas normais, a não ser no caso de um sucesso decisivo, e nunca penetram na roupa ou numa armadura. Se um dardo atinge a pele ou roupa leve, o veneno poderá ter efeito. Modificadores: -2 ou mais no caso de vento"
    },
    {
        nome: "Boleadeiras",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 6]],
        preRequisito: null,
        descricao: "Esta é a perícia no lançamento de boleadeiras (uma tira de couro com dois ou mais pesos atados a suas pontas) para enredar a vítima. São usadas principalmente para parar animais numa tropa, ou na caça de pequenos animais selvagens ou pássaros. Podem também ser usadas em combate. É possível se esquivar ou bloqueá-las, mas uma tentativa de apará-las fará com que elas se enrolem automaticamente na arma usada para tal. Exceção: Uma manobra bem sucedida de aparar com uma arma cortante, cortará as tiras, arruinando as boleadeiras."
    },
    {
        nome: "Arco",
        tipo: 'Physical',
        dificuldade: 'Hard',
        preDefinido: [['DX' , 6]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso de arcos em geral. Ela cobre também os arcos compostos, apesar de que uma pessoa que nunca tenha visto um antes precisará de um sucesso em um teste de IQ para descobrir como usá-lo corretamente"
    },
    {
        nome: "Briga",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: null,
        preRequisito: null,
        descricao: "Esta é a “perícia”, nada científica, de “sair-no-tapa” num combate de perto. Faça um teste de Briga sempre que atacar o adversário com as mãos ou pés para ver se consegue atingi-lo. Some 1/10 de seu NH em Briga (arredondado para baixo) ao dano provocado. É possível aparar duas vezes por turno (um para cada mão) quando você se defende com as mãos limpas, e seu parâmetro Aparar será igual a 2/3 de seu NH em Briga. Com esta perícia só é possível aparar ataques de mãos, pés e armas usadas em combate de perto."
    },
    {
        nome: "Espada de Lâmina Larga",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 5] , ['Espada Curta' , 2]],
        preRequisito: null,
        descricao: "Esta é a “perícia”, nada científica, de “sair-no-tapa” num combate de perto. Faça um teste de Briga sempre que atacar o adversário com as mãos ou pés para ver se consegue atingi-lo. Some 1/10 de seu NH em Briga (arredondado para baixo) ao dano provocado. É possível aparar duas vezes por turno (um para cada mão) quando você se defende com as mãos limpas, e seu parâmetro Aparar será igual a 2/3 de seu NH em Briga. Com esta perícia só é possível aparar ataques de mãos, pés e armas usadas em combate de perto."
    },
    {
        nome: "Broquel",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4] , ['Escudo' , 2]],
        preRequisito: null,
        descricao: "Esta é a “perícia”, nada científica, de “sair-no-tapa” num combate de perto. Faça um teste de Briga sempre que atacar o adversário com as mãos ou pés para ver se consegue atingi-lo. Some 1/10 de seu NH em Briga (arredondado para baixo) ao dano provocado. É possível aparar duas vezes por turno (um para cada mão) quando você se defende com as mãos limpas, e seu parâmetro Aparar será igual a 2/3 de seu NH em Briga. Com esta perícia só é possível aparar ataques de mãos, pés e armas usadas em combate de perto."
    },
    {
        nome: "Besta",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4] , ['Escudo' , 2]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso de bestas, incluindo as bestas de balas ou de pedras. Se você tiver esta perícia, saberá como funcionam as máquinas do tipo da besta usadas para sitiar castelos, mas não terá nenhuma habilidade especial no seu uso."
    },
    {
        nome: "Sacar Rápido",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: null,
        preRequisito: null,
        descricao: "Existe uma perícia independente para cada tipo de arma. Ela está disponível para as seguintes armas: Faca, Cassetete, Espada (uma só mão), Espada de Duas Mãos, Flecha (inclusive os virotes de besta), Pistola, Fuzil (incluindo metralhadoras de mão, etc...), pentes, municiador rápido. O GM pode acrescentar uma nova perícia deste tipo para qualquer arma que possa ser sacada rapidamente, mas seja significativamente diferente de todas as armas acima. Esta perícia é usada quando você deseja preparar uma arma que está em seu coldre, bainha, etc... Um sucesso significa que você preparou a arma instantaneamente (isto não conta como manobra) e pode atacar com ela (ou carregar o arco) no mesmo turno. Uma falha significa que você preparou a arma normalmente, mas não pode fazer mais nada neste turno (se era uma flecha você a deixou cair). Uma falha crítica significa que você deixou a arma cair (ou, no caso de flechas, toda a aljava). A vantagem Reflexos em Combate dá um bônus de +1 em testes de Sacar Rápido."
    },
    {
        nome: "Esgrima",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 5]],
        preRequisito: null,
        descricao: "Esta é a capacidade de usar as armas dos esgrimistas (rapieira, espadim e sabre). A rapieira é uma arma perfurante longa (alcance 2 hexágonos) e leve. O espadim é uma arma leve, perfurante, mais curta (alcance 1 hexágono) relativamente parecida com um florete moderno com uma ponta. O sabre é uma arma leve, cortante e perfurante. Se você tiver uma arma destas, um escudo pequeno e uma Carga não maior do que leve, seu Aparar será 2/3 de seu NH em Esgrima (arredondado para baixo). Além disso, você pode aparar duas vezes por turno. Se você estiver em Defesa Total, poderá aparar qualquer número de ataques em uma rodada. Muitos esgrimistas carregam uma adaga como segunda arma. Ela também pode aparar (apara 3 ataques por rodada), mas apenas com a habilidade normal do esgrimista em aparar com uma Faca. A única desvantagem do aparar do esgrimista é que suas armas são muito leves e podem quebrar quando usadas para aparar"
    },
    {
        nome: "Mangual",
        tipo: 'Physical',
        dificuldade: 'Hard',
        preDefinido: [['DX' , 6]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso de armas desbalanceadas, com a cabeça ligada ao cabo por uma corrente ou corda, tal como o mangual, morningstar ou o nunchaku. O mangual é difícil de se usar, mas difícil de se oferecer defesa também. Qualquer tentativa de bloquear uma destas armas está submetida a um redutor de -2. Qualquer tentativa de aparar tem um redutor de -4. Facas e armas de Esgrima não podem aparar um Mangual. Defesas de artes marciais podem aparar um mangual, mas com um redutor de -4."
    },
    {
        nome: "Armas de Fogo",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso de qualquer tipo de arma de cartucho do séc. XX. Some 1 a seu nível de habilidade, se tiver IQ igual a 10 ou 11, e 2 para IQ 12+. Modificadores: Veja Familiaridade, (pág. 43). -2 para uma arma de um tipo conhecido com a qual não se está familiarizado (ex.: calibre . 22 quando se está acostumado com calibre 38); - 4 ou mais para uma arma em más condições; - 4 ou mais para uma arma de tipo desconhecido (ex.: um fuzil quando se está acostumado a atirar com pistolas). Todos os modificadores descritos para armas de projétil, devem ser aplicados."
    },
    {
        nome: "Judô",
        tipo: 'Physical',
        dificuldade: 'Hard',
        preDefinido: null,
        preRequisito: null,
        descricao: "Esta perícia representa uma habilidade geral em tombos e chaves e não uma escola específica de combate desarmado. Não é possível usar Judô se tiver alguma coisa nas mãos ou se sua Carga for maior do que Leve. Usando Judô, será possível aparar com qualquer uma das mãos como se ela fosse uma arma, usando 2/3 de seu NH em Judô como seu Aparar. A chance de se machucar ao aparar uma arma com as mãos também é menor (v. pág. 101)."
    },
    {
        nome: "Caratê",
        tipo: 'Physical',
        dificuldade: 'Hard',
        preDefinido: null,
        preRequisito: null,
        descricao: "Esta perícia não representa nenhuma escola específica de combate desarmado e sim uma habilidade geral com socos e chutes. Não existe penalidade para o uso da mão esquerda. Qualquer mão que venha a ser usada deverá estar vazia, e sua Carga deve ser Leve ou menos. É possível aparar com qualquer uma das mãos como se ela fosse uma arma, usando 2/3 de seu NH em Caratê como seu Aparar."
    },
    {
        nome: "Faca",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4]],
        preRequisito: null,
        descricao: "A perícia no uso, mas não no arremesso, de qualquer tipo de faca, adaga ou estilete."
    },
    {
        nome: "Arremesso de Faca",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4]],
        preRequisito: null,
        descricao: "A habilidade de arremessar qualquer espécie de faca."
    },
    {
        nome: "Lança de Justa",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 6] , ['Lança' , 3]],
        preRequisito: "Cavalgar",
        descricao: "Esta é a perícia no uso da lança de justa, uma arma parecida com uma lança normal, com um comprimento maior ou igual a 3,5 m, usada a cavalo. Não é comum aparar em um combate com lanças de justa; é preciso Bloquear ou se Esquivar dos ataques do inimigo."
    },
    {
        nome: "Laço (Reata)",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: null,
        preRequisito: null,
        descricao: "Esta é a perícia no arremesso do laço ou reata. Ela é usada principalmente para laçar animais. Pode-se tentar laçar uma parte específica do corpo, ou escolher uma aleatoriamente na Tabela de Partes do Corpo. Faça uma Disputa Rápida de ST, se o laço tiver prendido um braço ou o tronco do adversário. Se o laçador vencer, a vítima estará imobilizada, mas se ele perder, terá perdido a corda. Se a cabeça tiver sido laçada, a vítima estará submetida a um redutor de -5 na Disputa de ST. Se um pé tiver sido laçado, a vítima terá que ser bem sucedida em um teste de DX para permanecer em pé (DX - 4 se a vítima estava correndo quando foi laçada) e não haverá necessidade de disputa de ST. Se o teste de DX resultar em falha, a vítima sofrerá 1D - 4 pontos de dano devido à queda (1D-2 se a vítima estava correndo)."
    },
    {
        nome: "Rede",
        tipo: 'Physical',
        dificuldade: 'Hard',
        preDefinido: null,
        preRequisito: null,
        descricao: "Esta é a perícia no uso da rede como uma arma em uma luta. É possível se esquivar de uma rede, mas não bloquear nem aparar. No caso de um arremesso bem sucedido, a vítima estará envolvida e incapaz de se mover ou atacar até a rede ser removida. Para remover uma rede você precisa de três sucessos, não necessariamente consecutivos, em testes de DX. Modificadores: - 4 quando se tem as duas mãos livres; -6 quando se tem uma só mão livre, ou no caso de animais. Se ocorrerem três falhas consecutivas, a vítima estará tão embaraçada, que será necessário cortar a rede para libertá-la. Uma rede para animais pesa 9 kg e pode ser arremessada a uma distância de (ST/2) metros mais 1/5 do NH com a rede (arredondado para baixo)."
    },
    {
        nome: "Armas de Haste",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 5]],
        preRequisito: null,
        descricao: "Perícia no uso de armas de haste muito longas e desbalanceadas, incluindo a acha d’armas, a alabarda, a bisarma e as centenas de variações do tipo."
    },
    {
        nome: "Escudo",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4] , ['Broquel' , 2]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso de um escudo do tipo medieval ou daqueles usados pelas tropas de choque. Esta perícia é necessária para atacar com o Escudo. No entanto a defesa passiva oferecida pelo escudo (1 a 4 pontos) protege quem o carrega, mesmo que ele não saiba como usá-lo. A defesa ativa de um escudo (no Bloqueio) é 1/2 de seu NH com o Escudo. Logo, você será capaz de bloquear muito melhor se tiver estudado a perícia do que se usar seu nível pré-definido. O atributo DX de uma pessoa média é 10, ou seja o nível prédefinido de sua habilidade com o Escudo é 6 e seu Bloqueio será 3. Veja também"
    },
    {
        nome: "Espadas Curtas",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 5] , ['Espada de Lâmina Larga' , 2]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso de qualquer tipo de arma balanceada com 30 a 60cm de comprimento, incluindo o terçado, o gládio e o bastão."
    },
    {
        nome: "Funda",
        tipo: 'Physical',
        dificuldade: 'Hard',
        preDefinido: [['DX' , 6]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso da funda ou fustíbalo."
    },
    {
        nome: "Lança",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 5] , ['Bastão' , 2]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso (mas não arremesso) de qualquer tipo de lança, dardo, tridente, baioneta, pique ou arma longa, leve e pontuda."
    },
    {
        nome: "Arremessador de Lança",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 4] , ['Arremesso de Lança' , 4]],
        preRequisito: null,
        descricao: "Este aparelho, e a perícia em sua utilização, são diferentes da perícia Arremesso de Lanças, mas o nível pré-definido de uma é igual ao da outra - 4. Um Arremessador de Lança é uma vara longa e chata com um entalhe e uma alça em uma das pontas. Ela aumenta a força com que um dardo, ou outra arma similar, é arremessado, aumentando a ST efetiva de quem usa (para determinação de alcance e dano provocado) em 5 pontos. É necessário um turno para colocar a lança no arremessador depois que ambos estão à mão e prontos. Modificadores: -5 em lugares apertados (precisa de um espaço aéreo vazio pelo menos até 2 m além da altura do atirador para uso eficaz)."
    },
    {
        nome: "Arremesso de Lança",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: [['DX' , 4] , ['Arremessador de Lança' , 4]],
        preRequisito: null,
        descricao: "Habilidade no arremesso de qualquer tipo de lança, dardo, etc."
    },
    {
        nome: "Rapidez de Recarga",
        tipo: 'Physical',
        dificuldade: 'Easy',
        preDefinido: null,
        preRequisito: null,
        descricao: "Esta é a habilidade em carregar rapidamente uma arma de fogo. Não é a mesma coisa que Sacar Rápido, mas você poderia, usando as perícias certas, recarregar muito rapidamente sacando um municiador rápido ou um pente de seu cinto ou bolso e colocando na arma."
    },
    {
        nome: "Bastão",
        tipo: 'Physical',
        dificuldade: 'Hard',
        preDefinido: [['DX' , 5] , ['Lança' , 2]],
        preRequisito: null,
        descricao: "Esta é a perícia no uso do Bastão ou de qualquer haste ou vara improvisada como Bastão. Este é um tipo de arma empunhada com as duas mãos. Seu Aparar será 2/3 de seu nível de habilidade."
    },
    {
        nome: "Machado de Duas Mãos/Maça",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 5]],
        preRequisito: null,
        descricao: "Habilidade na utilização de qualquer arma longa, pesada e não balanceada como, por exemplo, o machado de batalha ou a marreta."
    },
    {
        nome: "Espadas de Duas Mãos",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: [['DX' , 5]],
        preRequisito: null,
        descricao: "Esta é a perícia no manuseio de uma arma de lâmina longa (1m a 1,5m) com as duas mãos. Note que a cimitarra é usada com esta perícia quando empunhada com as duas mãos, mas com o NH em Espadas de Lâmina Larga quando empunhada com apenas uma."
    },
    {
        nome: "Chicote",
        tipo: 'Physical',
        dificuldade: 'Medium',
        preDefinido: null,
        preRequisito: null,
        descricao: "Esta é a habilidade em usar um chicote como uma arma. Existem chicotes de vários comprimentos. Em termos de jogo, um chicote com 1 m de comprimento tem um alcance de 1 m. Na verdade, ele deveria ter 1,20 m de comprimento. O tempo necessário para re-preparar um chicote depende de seu comprimento: 0 turnos para um chicote de 1 m; 1 turno para um chicote de 2 m; 2 turnos para um chicote de 3 m ou mais. Os chicotes podem ter até 6,5 m de comprimento. É impossível atingir um alvo a 1 m de distância, ou menos, com um chicote de 2 m de comprimento."
    }
]