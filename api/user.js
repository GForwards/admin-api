/**
 * Moudle dependencies
 */
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const User = mongoose.model('User');

/**
 * @description 创建用户
 *cc
 */
exports.create = async(function* (req, res) {
    const { email } = req.body;
    let data = { email };
    try {
        // 查询数据库中是否含有该用户
        const user = yield User.findOne(data);
        if (user) {
            res.json({
                code: 1002,
                message: '用户已存在！',
                data: null,
            });
        } else {
            const createUser = yield User.create(req.body);
            res.json({
                code: 200,
                message: '创建用户成功',
                data: createUser,
            });
        }
    } catch (error) {
        res.json({
            code: 1001,
            message: '创建用户失败！',
            data: null,
        });
    }
});
