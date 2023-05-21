// Клас співробітника, який має назву посади та розмір зарплатні
class Employee{
    position = "poposition0"
    salary = 100

    constructor(position, salary){
        this.position = position;
        this.salary = salary;
    }
}

// Клас департаменту, який має масив співробітників, метод додавання співробітників та метод відвідувача
class Department{
    listEmployee = [];

    addEmployee(employee){
        this.listEmployee.push(employee);
    }

    accept(visitor){
        visitor.visitToDepartmen(this)
    }
}

// Клас компанії, який має масив департаментів, метод додавання департаменту та метод відвідувача
class Company{
    listDepartment = [];

    addDepartment(department){
        this.listDepartment.push(department);
    }

    accept(visitor){
        visitor.visitToCompany(this);
    }
}

// Клас відвідувача, що збирає та виводить звіт по зарплатні кожного співробітника
class Visitor{
    visitToDepartmen(department){
        for (let i = 0; i < department.listEmployee.length; i++) {
            console.log(department.listEmployee[i].position + " зарплатня "+ department.listEmployee[i].salary + " доларів");
        }
    }

    visitToCompany(company){
        for (let i = 0; i < company.listDepartment.length; i++) {
            for (let j = 0; j < company.listDepartment[i].listEmployee.length; j++) {
                console.log(company.listDepartment[i].listEmployee[j].position + " зарплатня "+ company.listDepartment[i].listEmployee[j].salary + " доларів");
            }
        }
    }
}

// Створення співробітників, департаментів та компанії
let employee1 = new Employee('Програміст1', 500);
let employee2 = new Employee('Програміст2', 500);
let employee3 = new Employee('Дизайнер1', 700);
let employee4 = new Employee('Дизайнер2', 800);
let employee5 = new Employee('Програміст3', 900);
let employee6 = new Employee('Програміст4', 1000);
let employee7 = new Employee('Дизайнер3', 1500);
let front = new Department();
let tel = new Department();
let nix = new Company();
let visitor1 = new Visitor();

// Заповнення департаментів співробітниками, та компанію департаментами
front.addEmployee(employee1);
front.addEmployee(employee2);
front.addEmployee(employee3);
front.addEmployee(employee4);
tel.addEmployee(employee5);
tel.addEmployee(employee6);
tel.addEmployee(employee7);
nix.addDepartment(front);
nix.addDepartment(tel);

// Вивід звітності одного департаменту та компанії
console.log("Звіт департаменту front");
front.accept(visitor1);
console.log("Звіт компанії nix");
nix.accept(visitor1);