import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config.js';
import { AJAX } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmarks => bookmarks.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.query = query;
    state.search.page = 1;
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
        servings: rec.servings,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (error) {
    console.error(`${err} 💥💥💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// export const updateServings = function (newServings) {
//   state.recipe.ingredients.forEach(function (ing) {
//     ing.quantity = ing.quantity * (newServings / state.recipe.servings);
//   });
//   state.recipe.servings = newServings;
// };
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const updateServings = function (newServings) {
  const newIng = state.recipe.ingredients.map(function (ing) {
    return {
      ...ing,
      quantity: ing.quantity * (newServings / state.recipe.servings),
    };
  });
  state.recipe.ingredients = newIng;
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  const index = state.bookmarks.findIndex(b => b.id === recipe.id);
  if (index === -1) {
    state.bookmarks.push(recipe);
  }
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(b => b.id === id);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  if (index > -1) state.bookmarks.splice(index, 1);
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim);
        if (ingArr.length != 3)
          throw new Error(
            'Wrong ingredient format please use the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit: unit ? unit : '',
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

init();
