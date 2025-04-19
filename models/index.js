const Student = require('./students');
const IdentityCard = require('./identityCard');
const Department = require('./department');

//one to one
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

//one to many
Department.hasMany(Student);
Student.belongsTo(Department);

module.exports = {
    Student,
    IdentityCard,
    Department
}