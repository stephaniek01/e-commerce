import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";

import "./categories-preview.styles.scss";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];

        return (
          <CategoryPreview products={products} title={title} key={title} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
