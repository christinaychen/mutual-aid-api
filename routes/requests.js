const express = require('express');
const { getSpreadSheet, getSpreadSheetValues } = require('../service/googleSheetsService');
const { google } = require('googleapis')
const sheets = google.sheets('v4');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

var router = express.Router();

router.get('/requests/financial', async function(err, res){
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    const spreadsheet = await getSpreadSheet({
        spreadsheetId: "1ytR65k2UFqVecAuTz2o5hINGvONkmEAh2EYEOO9z4zM",
        auth: "AIzaSyADHUrPHLj8swIzLmzwKupm8T5thxRqRpE",
        range: "Financial!A1:G1"
    }).catch(err)
    return res.json(spreadsheet)
})

module.exports = router