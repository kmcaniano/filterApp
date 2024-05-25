import mongoose from 'mongoose';
import dotenv from "dotenv";
import { getCustomerFilters } from '../src/services/CustomerService';
import userModel from '../src/services/DbService';

dotenv.config();
const dbPort = process.env.MONGO_DB_PORT!;
const db = process.env.MONGO_DB_DATABASE!;

describe('', () => {
    beforeAll(async () => {
        //I had issues getting integration tests running with a dummy database so I used the one that was set up.
        //You should not rely on a real database to test but in the interest of time I decided to.
        //I was trying to use Mongo Memory Server but I was having trouble setting it up correctly. https://github.com/nodkz/mongodb-memory-server
        await mongoose.connect(`mongodb://localhost:${dbPort}/${db}`);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("search first name", async () => {
        const result = await userModel.find(getCustomerFilters('Adam', ''));
        expect(result.length).toBe(1);
    });

    test("search name no results", async () => {
        const result = await userModel.find(getCustomerFilters('Tracy', ''));
        expect(result.length).toBe(0);
    });

    test("search last name multiple results", async () => {
        const result = await userModel.find(getCustomerFilters('Smith', ''));
        expect(result.length).toBe(3);
    });

    test("search last name and company", async () => {
        const result = await userModel.find(getCustomerFilters('Smith', 'BDD'));
        expect(result.length).toBe(1);
        expect(result[0].firstName).toBe('Sara');
        expect(result[0].lastName).toBe('Smith');
        expect(result[0].company).toBe('BDD');
    });


    test("search full name", async () => {
        const result = await userModel.find(getCustomerFilters('Sara Smith', ''));
        expect(result.length).toBe(1);
        expect(result[0].firstName).toBe('Sara');
        expect(result[0].lastName).toBe('Smith');
        expect(result[0].company).toBe('BDD');
    });

    test("search company", async () => {
        const result = await userModel.find(getCustomerFilters('', 'BCA'));
        expect(result.length).toBe(1);
        expect(result[0].firstName).toBe('Cindy');
        expect(result[0].lastName).toBe('Candles');
        expect(result[0].company).toBe('BCA');
    });

    test("search two word names", async () => {
        const result = await userModel.find(getCustomerFilters('Billy Bob', ''));
        expect(result.length).toBe(1);
        expect(result[0].firstName).toBe('Billy Bob');
        expect(result[0].lastName).toBe('Jackson');
        expect(result[0].company).toBe('ABC');
    });


});

