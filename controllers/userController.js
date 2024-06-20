const userModel = require('../models/userModel')
const fs = require('fs')
const url = require('url');
const path = require('path');
module.exports = {
    createUser: (req, res) => {
        const userData = new userModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            avatar: "uploads/" + req.file.filename
        });
        if (userData.save()) {
            res.json({
                status: 1,
                massage: 'user created',
                data: userData
            });
        } else {
            res.json({
                status: 0,
                massage: 'oops.. something went wrong',
                data: {}
            })
        }
    },

    getUser: async (req, res) => {
        const userData = await userModel.find({})
        res.json({
            status: 1,
            message: 'user data retrived',
            data: userData.map((user) => {
                let fullUrl = req.protocol + '://' + req.get('host');
                return {
                    "_id": user._id,
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                    "email": user.email,
                    "avatar": url.parse(fullUrl + '/' + user.avatar).href,
                    "__v": user.__v
                }
            })
        })
    },

    updateUser: async (req, res) => {
        const user = await userModel.findById(req.params.id)
        if (req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.file) {
            console.log("user.avatar", user.avatar)
            if (user.avatar) {
                fs.unlink(path.join(__dirname, user.avatar), (err) => {
                    if (err) {
                        console.log("err");
                    }
                    console.log("User old avatar unlinked successfully.");
                });
            }
            user.avatar = "uploads/" + req.file.filename;
        }
        if (user.save()) {
            res.json({
                status: 1,
                massage: 'user updated',
                data: user
            });
        } else {
            res.json({
                status: 0,
                massage: 'oops.. something went wrong',
                data: {}
            })
        }
    },

    deleteUser: async (req, res) => {
        const user = await userModel.findByIdAndDelete(req.params.id)
        if (user) {
            if (user.avatar) {
                fs.unlink(user.avatar, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("User avatar deleted successfully.");
                });
            }
            res.json({
                status: 1,
                massage: 'user delete',
                data: user
            });
        } else {
            res.json({
                status: 0,
                massage: 'user not found',
                data: {}
            })
        }
    }
}
