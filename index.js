const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const PORT = process.env.PORT || 4001;

const data = require('./data');


const schema = buildSchema(`
    type Query {
        employee(id: Int!): Employee
        employees(department: String): [Employee]
    },
    type Employee {
        id: Int,
        name: String,
        designation: String,
        department: String
    },
    type Mutation {
        addEmployee (name: String!, designation: String!, department: String!): [Employee]
    }
`);

const getEmployee = (args) => {
    var employeeId = args.id;
    return data.employees.filter(employee => {
        return employee.id === employeeId
    })[0];
}

const getEmployees = (args) => {
    if (args.department) {
        var department = args.department;
        return data.employees.filter(employee => employee.department === department);
    } else {
        return data.employees;
    }
}

const addEmployee = ({name, designation, department}) => {
    console.log(name, designation, department);
    let id = data.employees.length + 1;
    data.employees.push({id: id, name: name, designation: designation, department: department});
    return data.employees
}


const root = {
    employee: getEmployee,
    employees: getEmployees,
    addEmployee: addEmployee
};

const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On PORT ${PORT}`));