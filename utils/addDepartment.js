function addDepartment(data) {
    return `
    VALUES ('${data.department}'),`
};

module.exports = addDepartment;