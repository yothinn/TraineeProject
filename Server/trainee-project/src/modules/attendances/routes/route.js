'use strict';
var controller = require('../controllers/controller'),
    mq = require('../../core/controllers/rabbitmq'),
    policy = require('../policy/policy');
    const multer = require('multer');
    const config = require('../../../config/config');

    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './' + config.folderName);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
console.log(storage);

const upload = multer({ storage: storage });

module.exports = (app) => {
    var url = '/api/attendances';
    var urlWithParam = '/api/attendances/:attendancesId';

    app.route('/api/attendances/uploads')
        .post(upload.single('files'), controller.uploads);

    app.route(url)//.all(policy.isAllowed)
        .get(controller.getList)
        .post(controller.create);

    app.route(urlWithParam)//.all(policy.isAllowed)
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.param('attendancesId', controller.getByID);

    /**
     * Message Queue
     * exchange : ชื่อเครือข่ายไปรษณีย์  เช่น casan
     * qname : ชื่อสถานีย่อย สาขา
     * keymsg : ชื่อผู้รับ
     */
    // mq.consume('exchange', 'qname', 'keymsg', (msg)=>{
    //     console.log(JSON.parse(msg.content));

    // });
}