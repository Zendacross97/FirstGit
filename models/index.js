const Student = require('./students');
const IdentityCard = require('./identityCard');
const Department = require('./department');
const Courses = require('./courses');
const studentCourses = require('./studentCourses');

//one to one
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

//one to many
Department.hasMany(Student);
Student.belongsTo(Department);

//many to many
Student.belongsToMany(Courses, { through:studentCourses });
Courses.belongsToMany(Student, { through:studentCourses });

module.exports = {
    Student,
    IdentityCard,
    Department,
    Courses,
    studentCourses
}