function addRole(data) {
    return `
    ('${data.role}', ${data.salary}, ${data.department});`
} 

module.exports = addRole;