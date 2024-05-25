import { Box, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { FilterContext } from "../FilterContext";
import { User } from "@backend-types/User";

export default function Filters() {

    const { setUsers, companies, setCompanies } = useContext(FilterContext);
    const [nameSearch, setNameSearch] = useState("");
    const [companySearch, setCompanySearch] = useState("");

    useEffect(() => {
        axios.get("/searchUsers", {
            params: {
                name: nameSearch,
                company: companySearch
            }
        })
            .then(res => {
                let returnedUsers: User[] = res.data;
                setUsers(returnedUsers);

                if (!companies.length) {
                    let filterCompanies = returnedUsers ? returnedUsers.map((user) => user.company) : [];
                    setCompanies(Array.from(new Set(filterCompanies)).sort());
                }
            })
    }, [nameSearch, companySearch, setUsers, companies, setCompanies]);

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        setNameSearch((event.target as HTMLInputElement).value.trim());
    };

    const onDropDownChange = (event: SelectChangeEvent) => {
        setCompanySearch(event.target.value);
    }

    return (
        <Box>
            <TextField label="Search Customers"
                sx={{ marginRight: '32px' }}
                inputProps={{ 'data-testid': 'searchCustomers' }}
                onKeyUp={handleKeyUp}></TextField>
            <Select
                inputProps={{ 'data-testid': 'company-select' }}
                onChange={onDropDownChange}
                displayEmpty={true}
                value={companySearch}
            >
                <MenuItem key={""} value="">All Companies</MenuItem>
                {companies.length && companies.map((company) => (
                    <MenuItem key={company} value={company}>{company}</MenuItem>
                ))};
            </Select>
        </Box>)
}