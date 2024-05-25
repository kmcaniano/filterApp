import mongoose, { FilterQuery, Schema } from "mongoose";
import dotenv from "dotenv";
import { User } from "../types/User";

dotenv.config();
const dbPort = process.env.MONGO_DB_PORT!;
const db = process.env.MONGO_DB_DATABASE!;


export const setupDb = async () => {
    await mongoose.connect(`mongodb://localhost:${dbPort}/${db}`);
}


export async function getUsers(query: FilterQuery<User>): Promise<Array<User>> {
    return await userModel.find(query).sort({ lastName: 'asc', firstName: 'asc', company: 'asc' });
}

export async function populateUsers() {
    if (await userModel.countDocuments() == 0) {
        const usersToAdd = [{
            firstName: "Adam",
            lastName: "Smith",
            company: "ABC"
        },
        {
            firstName: "Aaron",
            lastName: "Smith",
            company: "ABC"
        },
        {
            firstName: "Cindy",
            lastName: "Candles",
            company: "BCA"
        }, {
            firstName: "Sally",
            lastName: "Mae",
            company: "BCC"
        }, {
            firstName: "Sara",
            lastName: "Smith",
            company: "BDD"
        },
        {
            firstName: "Kevin",
            lastName: "Jones",
            company: "BDD"
        }, {
            firstName: "George",
            lastName: "Lopez",
            company: "BDD"
        }, {
            firstName: "Rachael",
            lastName: "Burns",
            company: "BDD"
        }, {
            firstName: "Steve",
            lastName: "Lewis",
            company: "BDD"
        },
        {
            firstName: "Billy Bob",
            lastName: "Jackson",
            company: "ABC"
        }];

        userModel.insertMany(usersToAdd);
    }
}

export function getSchema() {
    return new Schema<User>({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        company: { type: String, required: true },
    });
}

const userModel = mongoose.model("User", getSchema());
export default userModel;

