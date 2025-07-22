import express from "express";
// import { getEmployees, getEmployeeById, getRandomEmployee, addEmployee } from "#db/employees";
import employees from "#db/employees";

const router = express.Router();
export default router;

// getting the employees array
router.route("/").get((req, res) => {
    res.send(employees);
})
// adding a new employee
.post((req, res) => {
    if(!req.body) return res.status(400).send("Request must have a body.");

    const {name} = req.body
    if(!name) return res.status(400).send("New employee must have a name.");

    const newId = employees[employees.length - 1].id + 1
    const newEmployee = {id: newId, name: name}
    employees.push(newEmployee)
    res.status(201).send(newEmployee);
})
// random employee
router.route("/random").get((req, res) => {
    const randomIndex = Math.floor(Math.random() * employees.length);
    const randomEmployee = employees[randomIndex]
    res.send(randomEmployee);
})
// employee by id
router.route("/:id").get((req, res) => {
    const {id} = req.params
    const employee = employees.find((e) => e.id === +id);

    if(!employee) {
        return res.status(404).send("There is no employee with that ID")
    }

    res.send(employee)
})