import { createContext, useState } from "react";

const Context = createContext();

function Provider({ children }) {
  const [admin, setAdmin] = useState({});

  return (
    <Context.Provider
      value={{
        admin,
        setAdmin,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };
