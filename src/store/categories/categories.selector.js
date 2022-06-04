import { createSelector } from "reselect";

const createCategoriesMap = (categoriesArray) =>
  categoriesArray.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

// level 1: categories reducer
const selectCategoryReducer = (state) => state.categories;

// level 2 : the array
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.categories
);

// level 3: the reduced array
export const selectCategoriesMap = createSelector(
  [selectCategories],
  createCategoriesMap
);

// createSelector([array of state objects], function to specify what to do with these objects)
// the elements of array of state objects are params to the function