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
        if (startDate < Date.now()) {
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

const save = () => {
    try {
        let empPayrollData = createEmployeePayroll();
        console.log(empPayrollData);
        createAndUpdateStorage(empPayrollData);
    } catch (e) {
        console.error(e);
        return;
    }
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    console.log(employeePayrollList);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () => {
    let empPayrollData = new EmployeePayrollData();
    try {
        empPayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    empPayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    empPayrollData.gender = getSelectedValues('[name=gender]').pop();
    empPayrollData.department = getSelectedValues('[name=department]');
    empPayrollData.salary = getInputValueById('#salary');
    empPayrollData.notes = getInputValueById('#notes');
    let month = parseInt(getInputValueById('#month')) + 1;
    let date = month + " " + getInputValueById('#day') + " " + getInputValueById('#year');
    empPayrollData.startDate = Date.parse(date);
    alert(empPayrollData);
    return empPayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
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
