import { FilterQuery } from "mongoose";
import { getUsers } from "./DbService";
import { User } from "../types/User";

export default async function findCustomersByFilter(name: string, company: string): Promise<User[]> {
    return await getUsers(getCustomerFilters(name, company));
}

/**
 * Return a FilterQuery that will be used to filter users. If the user does not provide any filters, 
 * we will return an empty object that will allow for all users to be returned.
 */
export function getCustomerFilters(name: string, company: string): FilterQuery<User> {
    const queryFilters = [];
    if (name && name.trim() !== '') {
        const regex = new RegExp('^' + name, 'i');
        //Create an OR filter because we only need one of the filters to match.
        const nameFilters = {
            $or: [
                { firstName: { $regex: regex } },
                { lastName: { $regex: regex } },
                { $expr: { $regexMatch: { input: { $concat: ["$firstName", " ", "$lastName"] }, regex: regex.source, options: 'i' } } }
            ]
        };
        queryFilters.push(nameFilters);
    }
    //If a company filter was also provided
    if (company && company.trim() !== '') {
        queryFilters.push({ company: { $eq: company } });
    }

    let combinedQuery = {};
    // An AND query for all the filters in the array. The max will be 2, the full OR name condition and the company filter.
    if (queryFilters.length > 0) {
        combinedQuery = { $and: queryFilters };
    }
    return combinedQuery;
}