export const MOCK_RECIPES = [
  {
    id: '1',
    name: 'Bolo de Cenoura',
    image: 'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg',
    ingredients: [
      '3 cenouras médias picadas',
      '3 ovos',
      '1 xícara de óleo',
      '2 xícaras de açúcar',
      '2 e 1/2 xícaras de farinha de trigo',
      '1 colher (sopa) de fermento em pó',
    ],
    instructions:
      'Bata no liquidificador as cenouras, os ovos, o óleo e o açúcar até ficar homogêneo. Transfira para uma tigela, misture a farinha e por último o fermento. Asse em forma untada a 180°C por cerca de 40 minutos.',
  },
  {
    id: '2',
    name: 'Brigadeiro Tradicional',
    image: 'https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg',
    ingredients: [
      '1 lata de leite condensado',
      '1 colher (sopa) de manteiga',
      '3 colheres (sopa) de chocolate em pó',
      'Chocolate granulado para enrolar',
    ],
    instructions:
      'Em uma panela, misture o leite condensado, a manteiga e o chocolate em pó. Cozinhe em fogo baixo mexendo sempre até desgrudar do fundo da panela. Deixe esfriar, enrole em bolinhas e passe no granulado.',
  },
  {
    id: '3',
    name: 'Panqueca de Frango',
    image: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
    ingredients: [
      '1 xícara de farinha de trigo',
      '1 xícara de leite',
      '1 ovo',
      '1 pitada de sal',
      '300g de peito de frango cozido e desfiado',
      '1 xícara de molho de tomate',
    ],
    instructions:
      'Bata a farinha, o leite, o ovo e o sal no liquidificador. Doure conchas pequenas da massa em uma frigideira antiaderente. Recheie com o frango temperado, enrole, cubra com molho de tomate e leve ao forno por 15 minutos.',
  },
  {
    id: '4',
    name: 'Macarrão ao Alho e Óleo',
    image: 'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
    ingredients: [
      '250g de macarrão espaguete',
      '4 dentes de alho fatiados',
      '4 colheres (sopa) de azeite ou óleo',
      'Sal a gosto',
      'Cheiro-verde picado a gosto',
    ],
    instructions:
      'Cozinhe o macarrão em água fervente com sal até ficar al dente e escorra. Em uma frigideira, doure levemente o alho no azeite sem deixar queimar. Misture o macarrão escorrido, ajuste o sal e finalize com cheiro-verde.',
  },
  {
    id: '5',
    name: 'Pudim de Leite Condensado',
    image: 'https://www.themealdb.com/images/media/meals/xqqqtu1511637379.jpg',
    ingredients: [
      '1 lata de leite condensado',
      '1 medida da lata de leite',
      '3 ovos',
      '1 xícara de açúcar para a calda',
      '1/2 xícara de água para a calda',
    ],
    instructions:
      'Derreta o açúcar em uma forma de pudim, junte a água e faça uma calda dourada. Bata no liquidificador o leite condensado, o leite e os ovos. Despeje na forma caramelizada e asse em banho-maria a 180°C por 50 minutos.',
  },
];

function normalizeText(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export async function searchRecipes(query) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const normalizedQuery = normalizeText(query);

  if (normalizedQuery === 'erro') {
    throw new Error('Falha ao buscar receitas no servidor.');
  }

  if (!normalizedQuery) {
    return MOCK_RECIPES;
  }

  return MOCK_RECIPES.filter((recipe) => {
    const matchesName = normalizeText(recipe.name).includes(normalizedQuery);
    const matchesIngredient = recipe.ingredients.some((ingredient) =>
      normalizeText(ingredient).includes(normalizedQuery),
    );
    return matchesName || matchesIngredient;
  });
}
