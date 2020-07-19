const express = require('express');
const {v4: uuidv4} = require('uuid')
const { getSpreadSheetValues, writeToSpreadsheetDatabaseSavedStatus } = require('../service/googleSheetsService');
const { getDb } = require('../service/firebaseService');

var router = express.Router();

router.get('/financial', async function(err, res){
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    let spreadsheetId = "1ytR65k2UFqVecAuTz2o5hINGvONkmEAh2EYEOO9z4zM"
    const spreadsheet = await getSpreadSheetValues({
        spreadsheetId: spreadsheetId,
        range: "Financial"
    }).catch(err)
    var db = await getDb()
    data = spreadsheet.data.values
    for (var i =1; i<data.length; i++) {
        if (data[i][9]=="TRUE") {
            continue;
        }
        writeToSpreadsheetDatabaseSavedStatus(1256667903, i, 9)
        var uuid = uuidv4()
        var userRef = db.ref("requests/financial").child(uuid)
        userRef.set({
            date: data[i][0],
            name: data[i][1],
            pronouns: data[i][2],
            phone: data[i][3],
            email: data[i][4],
            amount: parseInt(data[i][5]),
            fundTo: data[i][6],
            payMethod: data[i][7],
            extraInfo: data[i][8] ? data[i][8]!=undefined : "",
            fulfilled: false
        })
    }
    ret = db.ref("requests/financial").once('value').then(function(snapshot) {
        return res.json(snapshot.val())
    })
})


router.get('/material', async function(err, res){
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    const spreadsheet = await getSpreadSheetValues({
        spreadsheetId: "1ytR65k2UFqVecAuTz2o5hINGvONkmEAh2EYEOO9z4zM",
        auth: process.env.API_KEY,
        range: "Material"
    }).catch(err)
    var db = await getDb()
    data = spreadsheet.data.values
    for (var i =1; i<data.length; i++) {
        if (data[i][9]=="TRUE") {
            continue;
        }
        writeToSpreadsheetDatabaseSavedStatus(409891992, i, 9)
        var uuid = uuidv4()
        var userRef = db.ref("requests/material").child(uuid)
        userRef.set({
            date: data[i][0],
            name: data[i][1],
            email: data[i][2],
            pronouns: data[i][3],
            affiliation: data[i][4],
            materialRequested: data[i][5],
            description: data[i][6],
            requestOption: data[i][7],
            phone: data[i][8],
            isFulfilled: false
        })
    }
    ret = db.ref("requests/material").once('value').then(function(snapshot) {
        return res.json(snapshot.val())
    })
})

router.get('/housing', async function(err, res){
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    const spreadsheet = await getSpreadSheetValues({
        spreadsheetId: "1ytR65k2UFqVecAuTz2o5hINGvONkmEAh2EYEOO9z4zM",
        auth: process.env.API_KEY,
        range: "Housing"
    }).catch(err)

    var db = await getDb()
    data = spreadsheet.data.values
    for (var i =1; i<data.length; i++) {
        if (data[i][13]=="TRUE") {
            continue;
        }
        writeToSpreadsheetDatabaseSavedStatus(902600689, i, 13)
        var uuid = uuidv4()
        var userRef = db.ref("requests/housing").child(uuid)
        userRef.set({
            date: data[i][0],
            email: data[i][1],
            name: data[i][2],
            housingType: data[i][3],
            genderIdentity: data[i][4],
            race: data[i][5],
            accessibilityNeeds: data[i][6],
            allergies: data[i][7],
            immunocompromisedNeeds: data[i][8],
            coronavirusExposure: data[i][9],
            housingStartDate: data[i][10],
            housingEndDate: data[i][11],
            extraInfo: data[i][12] ? data[i][12]!=undefined : "",
            isFulfilled: false
        })
    }
    ret = db.ref("requests/housing").once('value').then(function(snapshot) {
        return res.json(snapshot.val())
    })
})

module.exports = router

