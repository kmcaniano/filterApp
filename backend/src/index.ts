import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { populateUsers, setupDb } from "./services/DbService";
import findCustomersByFilter from "./services/CustomerService";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get("/searchUsers", (req: Request, res: Response) => {
    let nameSearch: string = req.query.name as string;
    let companySearch: string = req.query.company as string;
    findCustomersByFilter(nameSearch, companySearch).then(users => {
        res.json(users);
    });
});

app.listen(port, async function () {
    await setupDb();
    await populateUsers();
});
