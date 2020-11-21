window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

// Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th>";

    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
                <tr>
                    <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
                    <td>${empPayrollData._name}</td>
                    <td>${empPayrollData._gender}</td>
                    <td>${getDeptHtml(empPayrollData._department)}</td>
                    <td>${empPayrollData._salary}</td>
                    <td>${empPayrollData._startDate}</td>
                    <td>
                    <img name="${empPayrollData._id}" onclick = "remove(this)" alt = "delete"
                            src="../assets/icons/delete-black-18dp.svg">
                    <img name="${empPayrollData._id}" onclick = "update(this)" alt = "edit"
                            src="../assets/icons/create-black-18dp.svg">        
                    </td>
                </tr>
    `;
        document.querySelector('#display').innerHTML = innerHtml;
    }
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Narayan Mahadevan',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '400000',
            _startDate: '07 Oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'

        },
        {
            _name: 'Bella Gates',
            _gender: 'female',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '21 Nov 2020',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'

        }
    ];
    return empPayrollListLocal;
}