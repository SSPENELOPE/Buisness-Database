function addEmployee(data) {
    return `
    ('${data.first}', '${data.last}'),`
}

module.exports = addEmployee;