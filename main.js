const filename = 'Deposit_raw_25Sep_3Oct.txt'
const fs = require('fs')
const d3 = require('d3')
const json2csv = require('json2csv');
const _ = require('lodash')
txt = fs.readFileSync(filename, "utf16le").toString().trim()
txt = txt.replace(/^\/\*.*/gm, ',');  //remove /* xxxx */
//console.log(txt);
tmp = txt.split(',');
output = tmp.map((v) => {
    if (v.trim() === "") { return }
    var re = /\n/;
    var nameList = v.split(re);
    //nameList.map(v => console.log(v))
    strr = ""
    nameList.map((v) => {
        r = v.replace(/\ts*/g, '"')
        r = r.replace(/\r$/g, '",')
        strr += r
        return r
    })
    strr = strr.replace(/""",/g, '')
    strr = strr.replace(/"",/g, '",')
    strr = strr.replace(/",{""_/, '{"_')
    strr = strr.replace(/""/g, '"')
    strr = strr.replace(/",}/g, '"}')
    strr = strr.replace(/{","/, '{"')
    strr = strr.replace(/:"{"/, ':{"')
    strr = strr.replace(/","}"/, '"},"')
    strr = strr.replace(/"}"/, '"}')
    strr = strr.replace(/"ObjectId\("/, '"')
    strr = strr.replace(/"\)"/g, '"')
    strr = strr.replace(/uccess/, 'success')
    strr = strr.replace(/"mobile_number":"/, '"mobile_number":"0')
    strr = strr.replace(/"ISODate\("/g, '"')
    let final = JSON.parse(strr)
    return final
})
output = output.filter((v) => v !== undefined)
const fields = ["_id",
    "request_id",
    "metadata",
    "transaction_status",
    "transaction_posting_id",
    "transaction_reference_id",
    "fee_amount",
    "account_name",
    "mobile_number",
    "deposit_amount",
    "account_number",
    "device_id",
    "user_id",
    "branch_id",
    "transaction_type",
    "update_timestamp",
    "create_timestamp",
    "__v"]
var csv = json2csv({ data: output, fields: fields });
fs.writeFile('file.csv', csv, 'utf16le' , function (err) {
    if (err) throw err;
    console.log('file saved');
}); 