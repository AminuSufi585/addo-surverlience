/**
 * Created by kelvin on 8/10/17.
 */
var express = require('express');
var router = express.Router();
var fs = require("fs");
var exec = require('child_process').exec;

/* GET users listing. */
router.post('/', function(req, res, next) {
    // TODO: work with request(req) sent
    console.log(JSON.stringify(prepareData(req.body)));
    var cmd = 'curl "http://test.hisptz.org:9086/api/25/dataStore/addo/"'+Math.floor(Math.random() * 1234566) + 1  +' -X POST -H "Content-Type: application/json" -d "'+JSON.stringify(prepareData(req.body)).replace(/"/g, '\\"')+'" -u admin:district -v';
    var resp = {}
    var date = new Date();
    var month = req.body['month'];
    if (month.length < 2) month = '0' + month;
    period =  date.getFullYear()+month;
    filename = period+"_"+getOuMapping(req.body['fin'])+"object.json"
    console.log(prepareData(req.body));
    return;
    fs.writeFile("./"+filename, JSON.stringify(prepareData(req.body)), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    var datacmd = 'curl -d @'+filename+' "http://test.hisptz.org:9086/api/25/dataValueSets" -X POST -H "Content-Type: application/json" -d "'+prepareData(req.body)+'" -u admin:district -v';

    exec(datacmd, function(error, stdout, stderr) {
        console.log("Error");
        console.log(stdout);
        console.log(stderr);
        if(error){
            resp = {
                "status": false,
                "sms_reply": true,
                "sms_text": "Kuna tatizo katika utumaji wa ripoti yako ya mwezi."
            };
            res.json(resp);
        }else{
            resp = {
                "status": true,
                "sms_reply": true,
                "sms_text": "Asante, Ripoti yako ya mwezi imepokelewa kikamilifu."
            };
            exec(datacmd, function(error, stdout, stderr) {

            });
            res.json(resp);
        }
    });
    console.log("File has been created");
});
    // exec(datacmd, function(error, stdout, stderr) {
    //     console.log("Error");
    //     console.log(stdout);
    //     console.log(stderr);
    //     if(error){
    //        resp = {
    //             "status": false,
    //             "sms_reply": true,
    //             "sms_text": "Kuna tatizo katika utumaji wa ripoti yako ya mwezi."
    //         };
    //         res.json(resp);
    //     }else{
    //         resp = {
    //             "status": true,
    //             "sms_reply": true,
    //             "sms_text": "Asante, Ripoti yako ya mwezi imepokelewa kikamilifu."
    //         };
    //         exec(datacmd, function(error, stdout, stderr) {
    //
    //         });
    //         res.json(resp);
    //     }
    // });

});

module.exports = router;

function prepareData(body){
    var date = new Date();
    var month = body['month'];
    if (month.length < 2) month = '0' + month;
    var returnObject = {
        "dataSet": "t6N3L1IElxb",
        "completeData": getFormatedDate(),
        "period": date.getFullYear()+month,
        "orgUnit": getOuMapping(body['fin']),
        "dataValues": [ ]
    };
    var elements = getMapping();
    elements.forEach(function (value) {
        returnObject.dataValues.push(
            { "dataElement": value.dataElement, "value": body[value.mapper] }
        )
    });
    return returnObject;
}

function getFormatedDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function getMapping(){
    return [
        {
            dataElement: "v3EuYoSvE0E",
            mapper: "b"
        },{
            dataElement: "Y62Vo1zRDUf",
            mapper: "c"
        },{
            dataElement: "UtC39Jqq4Yt",
            mapper: "d"
        },{
            dataElement: "CBiSeEBDknO",
            mapper: "e"
        },{
            dataElement: "ALDjeIfaQcv",
            mapper: "f"
        },{
            dataElement: "VeFiaJf1B4I",
            mapper: "g"
        },{
            dataElement: "dOFFeCODlWs",
            mapper: "h"
        },{
            dataElement: "lmCCSUML0x9",
            mapper: "i"
        },{
            dataElement: "aEF2G2GhhQc",
            mapper: "j"
        },{
            dataElement: "nRbRZB3msHc",
            mapper: "k"
        },{
            dataElement: "ur7jLigQosE",
            mapper: "l"
        }
    ];
}

function getOuMapping(finNumber) {
    var uid = "zs9X8YYBOnK";
    var mapping =  [
        {
            code: "11040400480",
            name: "CAMS DLDM",
            id: "EGFCzMneUxK"
        },
        {
            code: "564846613",
            name: "Upendo dldm",
            id: "bggQ5g5x43T"
        }
    ]

    mapping.forEach(function (mapper) {
        if(mapper.code === finNumber){
            uid = mapper.id
        }
    });

    return uid;
}