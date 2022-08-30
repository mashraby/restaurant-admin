import { gql, useQuery } from "@apollo/client";
import { createContext } from "react";
const QueryContext = createContext();

const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      img_url
    }
  }
`;

const GET_RESTAURANTS = gql`
  query {
    restaurantsAll {
      id
      name
      img_url
    }
  }
`;

const GET_FOODS = gql`
  query {
    foodsAll {
      id
      name
      price
    }
  }
`;

function Provider({ children }) {
  const { data: categories } = useQuery(GET_CATEGORIES);
  const { data: restaurants } = useQuery(GET_RESTAURANTS);
  const { data: foods } = useQuery(GET_FOODS);

  return (
    <QueryContext.Provider
      value={{
        categories,
        restaurants,
        foods,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export { QueryContext, Provider };
