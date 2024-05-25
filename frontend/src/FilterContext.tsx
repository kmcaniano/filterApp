import { User } from "@backend-types/User";
import { ReactNode, createContext, useState } from "react";

interface FilterContext {
    users: Array<User>;
    setUsers: (value: Array<User>) => void;
    companies: Array<string>;
    setCompanies: (value: Array<string>) => void;
}

export const FilterContext = createContext<FilterContext>({} as FilterContext);

export const Provider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<Array<User>>([]);
    const [companies, setCompanies] = useState<Array<string>>([]);

    return (
        <FilterContext.Provider value={{ users, setUsers, companies, setCompanies }}>
            {children}
        </FilterContext.Provider>
    );
};