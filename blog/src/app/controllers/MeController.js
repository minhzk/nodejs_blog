const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mangoose');

class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({}) // Chỉ những course không có deletedAt hoặc deletedAt= null mới được show
            .then(courses => res.render('me/stored-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }


    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true }) // Chỉ render ra những course có deleted = true
            .then((courses) => { res.render("me/trash-courses", { 
                courses: multipleMongooseToObject( courses ), 
            }); }) 
                .catch(next);
    }
}

module.exports = new MeController();
