function addRole(data) {
    return `
    ('${data.role}', ${data.salary});`
} 

module.exports = addRole;