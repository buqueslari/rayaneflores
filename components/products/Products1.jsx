"use client";

import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import Listview from "./Listview";
import GridView from "./GridView";
import { useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "@/reducer/filterReducer";
import { productMain } from "@/data/products";
import FilterMeta from "./FilterMeta";

export default function Products1({ parentClass = "flat-spacing", collection = "" }) {
  const [activeLayout, setActiveLayout] = useState(4);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sortingOption, sorted, currentPage, itemPerPage } = state;

  const allProps = {
    ...state,
    setSortingOption: (value) => dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
    setCurrentPage: (value) => dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }), dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => {
      dispatch({ type: "CLEAR_FILTER" });
    },
  };

  useEffect(() => {
    let filteredProducts = productMain;

    if (collection) {
      const searchText = collection.toLowerCase();
      filteredProducts = productMain.filter((product) => product.title.toLowerCase().includes(searchText) || product.description.toLowerCase().includes(searchText) || product.tabFilterOptions.some((option) => option.toLowerCase().includes(searchText)) || product.tabFilterOptions2.some((option) => option.toLowerCase().includes(searchText)));
    }

    if (sortingOption === "Preço Crescente") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filteredProducts].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Preço Decrescente") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filteredProducts].sort((a, b) => b.price - a.price),
      });
    } else if (sortingOption === "Título Crescente") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title)),
      });
    } else if (sortingOption === "Título Decrescente") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title)),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filteredProducts });
    }

    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [sortingOption, collection]);

  return (
    <>
      <section className={parentClass}>
        <div className="container">
          <div className="tf-shop-control" style={{ justifyContent: "space-between", display: "flex" }}>
            <ul className="tf-control-layout" style={{ width: "fit-content" }}>
              <LayoutHandler setActiveLayout={setActiveLayout} activeLayout={activeLayout} />
            </ul>
            <div className="tf-control-sorting">
              <p className="d-none d-lg-block text-caption-1">Ordenar por:</p>
              <Sorting allProps={allProps} />
            </div>
          </div>
          <div className="wrapper-control-shop">
            <FilterMeta productLength={sorted.length} allProps={allProps} />

            {activeLayout == 1 ? (
              <div className="tf-list-layout wrapper-shop" id="listLayout">
                <Listview products={sorted} />
              </div>
            ) : (
              <div className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`} id="gridLayout">
                <GridView products={sorted} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
