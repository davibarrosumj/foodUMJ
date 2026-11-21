export const API_URL = 'http://localhost:3000/api';

function formatRecipe(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient) {
      ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
    }
  }

  return {
    id: String(meal.idMeal),
    name: meal.strMeal || '',
    image: meal.strMealThumb || '',
    ingredients,
    instructions: meal.strInstructions || '',
  };
}

async function fetchApi(path) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`);
  } catch {
    throw new Error('Não foi possível conectar ao servidor de receitas.');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao buscar dados no servidor.');
  }

  return data;
}

export async function searchRecipes(query) {
  const data = await fetchApi(`/receitas?nome=${encodeURIComponent(query.trim())}`);
  return Array.isArray(data) ? data.map(formatRecipe) : [];
}

export async function getRecipeById(id) {
  const data = await fetchApi(`/receitas/${encodeURIComponent(id)}`);
  return formatRecipe(data);
}
