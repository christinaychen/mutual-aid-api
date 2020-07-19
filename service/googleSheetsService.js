const { google } = require('googleapis')
const sheets = google.sheets('v4');
const { GoogleSpreadsheet } = require('google-spreadsheet')
const doc = new GoogleSpreadsheet('1ytR65k2UFqVecAuTz2o5hINGvONkmEAh2EYEOO9z4zM')

async function getSpreadSheet() {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
    await doc.loadInfo()
}

async function getSheet(id) {
    await getSpreadSheet()
    const sheet = doc.sheetsById[id]
    return sheet;
}

  async function getSpreadSheetValues({spreadsheetId, range}) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth: process.env.API_KEY,
      range,

    });
    return res;
  }


  async function writeToSpreadsheetDatabaseSavedStatus(sheetId, rowIndex, columnIndex) {
      var sheet = await getSheet(sheetId)
      await sheet.loadCells()
      const sheetCell = await sheet.getCell(rowIndex, columnIndex);
      sheetCell.value = true
      await sheet.saveUpdatedCells();
  }
  
  module.exports = {
    getSpreadSheetValues,
    writeToSpreadsheetDatabaseSavedStatus
  }