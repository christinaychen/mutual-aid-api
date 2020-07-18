const express = require('express');
const { getSpreadSheet, getSpreadSheetValues } = require('../service/googleSheetsService');
const { google } = require('googleapis');
const { json } = require('express');
const sheets = google.sheets('v4');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

var router = express.Router();

router.get('/requests/financial', async function(err, res){
    console.log(require('dotenv').config())
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    const spreadsheet = await getSpreadSheetValues({
        spreadsheetId: "1ytR65k2UFqVecAuTz2o5hINGvONkmEAh2EYEOO9z4zM",
        auth: process.env.API_KEY,
        range: "Financial"
    }).catch(err)
    data = spreadsheet.data.values
    ret = {
        requests: []
    }
    for (var i =1; i<data.length; i++) {
        var jsonData = {}
        jsonData.date = data[i][0]
        jsonData.name = data[i][1]
        jsonData.phone = data[i][2]
        jsonData.email = data[i][3]
        jsonData.amount = data[i][4]
        jsonData.fundTo = data[i][5]
        jsonData.payMethod = data[i][6]
        jsonData.extraInfo = data[i][7]
        jsonData.pronouns = data[i][8]

        ret.requests.push(jsonData)
    }
    return res.json(ret)
})

module.exports = router