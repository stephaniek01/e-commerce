import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {

    useEffect(() => {

        const getCategoriesMap = async () => {
            const categories = await getCategoriesAndDocuments();
            setCategoriesMap(categories);
        }

        getCategoriesMap();
    }, [])


    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap, setCategoriesMap};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}