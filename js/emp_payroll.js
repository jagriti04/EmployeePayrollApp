class EmployeePayrollData {
    // getter and setter method
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else throw 'Name is Incorrect!';
    }

    get department() { return this._department; }
    set department(department) {
        this._department = department;
    }

    get salary() { return this._salary; }
    set salary(salary) {
        this._salary = salary;
    }

    get notes() { return this._notes; }
    set notes(notes) {
        this._notes = notes;
    }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
        console.log('in func to set date ' + startDate);
        if (startDate < Date.now()) {
            console.log('date valid  ' + Date.now() + " and ---- " + startDate.getTime());
            this._startDate = startDate;
        } else throw 'Date is invalid!';
    }

    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
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
        let empPayrollData = new EmployeePayrollData();
        empPayrollData.name = name;
        empPayrollData.salary = salary;
        empPayrollData.gender = gender;
        console.log('in save --- ' + startDate);
        empPayrollData.startDate = startDate;
        empPayrollData.department = departmentsSelected;
        empPayrollData.notes = notes;

        console.log(empPayrollData);
    } catch (e) {
        console.error(e);
    }

}

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('#name-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });

    const year = document.querySelector("#year");
    const month = document.querySelector("#month");
    const day = document.querySelector("#day");
    const dateError = document.querySelector('#date-error');
    let dateElements = [day, month, year];
    dateElements.forEach(dateField => {
        dateField.addEventListener('input', function () {
            try {
                const startDate = new Date(year.value, month.value, day.value);
                console.log(startDate);
                (new EmployeePayrollData()).startDate = startDate;
                dateError.textContent = "";
            } catch (e) {
                dateError.textContent = e;
            }
        });

    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
});
