const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Faz a requisição à TheMealDB e verifica erros HTTP/rede.
 * A API retorna meals: null quando a pesquisa não encontra resultados.
 */
async function request(endpoint) {
  let response;

  try {
    response = await fetch(`${BASE_URL}/${endpoint}`);
  } catch {
    throw new Error('Não foi possível conectar. Verifique sua internet e tente novamente.');
  }

  if (!response.ok) {
    throw new Error(`A API retornou um erro (HTTP ${response.status}). Tente novamente.`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error('A resposta da API não pôde ser interpretada.');
  }
}

export async function searchRecipes(term) {
  const value = term.trim();
  if (!value) return [];
  const data = await request(`search.php?s=${encodeURIComponent(value)}`);
  return data.meals ?? [];
}

export async function getRecipeById(id) {
  if (!id) throw new Error('Identificador da receita não informado.');
  const data = await request(`lookup.php?i=${encodeURIComponent(id)}`);
  if (!data.meals?.length) throw new Error('Receita não encontrada.');
  return data.meals[0];
}

export async function getRandomRecipe() {
  const data = await request('random.php');
  if (!data.meals?.length) throw new Error('Não foi possível obter uma sugestão.');
  return data.meals[0];
}

/** Converte os campos strIngredient1..20 e strMeasure1..20 em uma lista. */
export function extractIngredients(recipe) {
  if (!recipe) return [];
  const items = [];

  for (let index = 1; index <= 20; index += 1) {
    const name = recipe[`strIngredient${index}`]?.trim();
    const measure = recipe[`strMeasure${index}`]?.trim();

    if (name) {
      items.push({
        id: `${recipe.idMeal}-${index}`,
        name,
        measure: measure || '',
      });
    }
  }

  return items;
}
