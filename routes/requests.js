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
        jsonData.pronouns = data[i][2]
        jsonData.phone = data[i][3]
        jsonData.email = data[i][4]
        jsonData.amount = parseInt(data[i][5])
        jsonData.fundTo = data[i][6]
        jsonData.payMethod = data[i][7]
        jsonData.extraInfo = data[i][8]

        ret.requests.push(jsonData)
    }
    return res.json(ret)
})


router.get('/requests/material', async function(err, res){
    console.log(require('dotenv').config())
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    const spreadsheet = await getSpreadSheetValues({
        spreadsheetId: "1ytR65k2UFqVecAuTz2o5hINGvONkmEAh2EYEOO9z4zM",
        auth: process.env.API_KEY,
        range: "Material"
    }).catch(err)
    data = spreadsheet.data.values
    ret = {
        requests: []
    }
    for (var i =1; i<data.length; i++) {
        var jsonData = {}
        jsonData.date = data[i][0]
        jsonData.name = data[i][1]
        jsonData.email = data[i][2]
        jsonData.pronouns = data[i][3]
        jsonData.affiliation = data[i][4]
        jsonData.materialRequested = data[i][5]
        jsonData.description = data[i][6]
        jsonData.requestOption = data[i][7]
        jsonData.phone = data[i][8]

        ret.requests.push(jsonData)
    }
    return res.json(ret)
})

router.get('/requests/housing', async function(err, res){
    console.log(require('dotenv').config())
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    const spreadsheet = await getSpreadSheetValues({
        spreadsheetId: "1ytR65k2UFqVecAuTz2o5hINGvONkmEAh2EYEOO9z4zM",
        auth: process.env.API_KEY,
        range: "Housing"
    }).catch(err)
    data = spreadsheet.data.values
    ret = {
        requests: []
    }
    for (var i =1; i<data.length; i++) {
        var jsonData = {}
        jsonData.date = data[i][0]
        jsonData.name = data[i][1]
        jsonData.housingType = data[i][2]
        jsonData.genderIdentity = data[i][3]
        jsonData.race = data[i][4]
        jsonData.accessibilityNeeds = data[i][5]
        jsonData.allergies = data[i][6]
        jsonData.immunocompromisedNeeds = data[i][7]
        jsonData.coronavirusExposure = data[i][8]
        jsonData.housingStartDate = data[i][8]
        jsonData.housingEndDate = data[i][8]

        ret.requests.push(jsonData)
    }
    return res.json(ret)
})

module.exports = router

