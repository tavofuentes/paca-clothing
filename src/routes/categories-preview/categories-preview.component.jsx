import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {Object.keys(categoriesMap).map((categoryTitle) => {
        const products = categoriesMap[categoryTitle];

        return (
          <CategoryPreview
            key={categoryTitle}
            products={products}
            title={categoryTitle}
          />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
