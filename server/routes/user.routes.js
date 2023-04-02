import express from "express";
import { getUser, login, register } from "../controller/user.controller.js";

const user = express.Router();

user.post("/register", register);
user.post("/login", login);
user.get("/getUser", getUser);


export default user;