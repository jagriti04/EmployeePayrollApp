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

    // getter and setter method
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect!';
    }

    get startDate() {return this._startDate;}
    set startDate(startDate) {
        if (startDate < Date.now()) {
            console.log("hjhkh");
            this._startDate = startDate;
        } else throw 'Date is invalid!';
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
    try {
        let departmentsSelected = new Array();
        const name = document.getElementById("name").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const departments = document.querySelectorAll('input[name="department"]:checked');
        const salary = document.querySelector('#salary').value;
        const year = document.querySelector("#year").value;
        const month = document.querySelector("#month").value;
        const day = document.querySelector("#day").value;
        const notes = document.querySelector("#notes").value;

        const startDate = new Date(year, month, day);
        for (let department of departments) {
            departmentsSelected.push(department.value);
        }
        let empPayrollData = new EmployeePayrollData(name, salary, gender, startDate, departmentsSelected, notes);
        console.log(empPayrollData);
    } catch (e) {
        console.error(e);
    }

}

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
    save();
});
