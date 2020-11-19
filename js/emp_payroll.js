class EmployeePayrollData {
    // constructor
    constructor(...params) {
        this.name = params[0];
        this.salary = params[1];
        this.gender = params[2];
        this.startDate = params[3];
        this.department = params[4];
        this.notes = params[5];
    }
    // method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = this.startDate === undefined ? "undefined" :
            new Date(this.startDate).toLocaleDateString("en-US", options);
        return "name='" + this.name + "' , salary=" + this.salary
            + ", gender=" + this.gender + ", startDate=" + empDate + ", department=" + this.department
            + ", notes " + this.notes;
    }
}

function save() {
    let departmentsSelected = new Array();
    const name = document.getElementById("name").value;
    console.log(name);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    console.log(gender);
    const departments = document.querySelectorAll('input[name="department"]:checked');
    const salary = document.querySelector('#salary').value;
    console.log(salary);
    const year = document.querySelector("#year").value;
    const month = document.querySelector("#month").value;
    const day = document.querySelector("#day").value;
    const notes = document.querySelector("#notes").value;

    const startDate = new Date(year, month, day);
    console.log(startDate);
    for (let department of departments) {
        departmentsSelected.push(department.value);
    }
    console.log(departmentsSelected);
    let empPayrollData = new EmployeePayrollData(name, salary, gender, startDate, departmentsSelected, notes);
    console.log(empPayrollData);
}

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});
