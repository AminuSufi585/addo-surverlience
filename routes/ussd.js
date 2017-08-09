var express = require('express');
var router = express.Router();
/* GET users listing. */
router.post('/', function(req, res, next) {
  // TODO: work with request(req) sent
  console.log(prepareData(req.body));
  res.json(prepareData(req.body));
});

module.exports = router;

function prepareData(body){
    var date = new Date();
    var month = '' + (date.getMonth() + 1);
    if (month.length < 2) month = '0' + month;
    var returnObject = {
        "dataSet": "t6N3L1IElxb",
        "completeData": getFormatedDate(),
        "period": date.getFullYear()+month,
        "orgUnit": "DiszpKrYNg8",
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