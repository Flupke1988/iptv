/**
 * Serves the login HTML page when a GET request is received.
 * @return {HtmlOutput} The HTML content of the login page.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html');
}

/**
 * Checks the provided login credentials against the data in the spreadsheet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {boolean} True if credentials match, false otherwise.
 */
function checkLogin(email, password) {
  // Open the spreadsheet using its ID
  const ss = SpreadsheetApp.openById('1GSvEIe3CUwCxa-FoyqjwU-52fRMU4IuQHkp2qoK8Tqc');
  // Access the specific sheet where credentials are stored
  const sheet = ss.getSheetByName('Klanten');
  // Retrieve all data from the sheet
  const data = sheet.getDataRange().getValues();
  
  // Loop through the data to find a matching email in column B and password in column I
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] == email && data[i][8] == password) { // Column B (index 1) for email, Column I (index 8) for password
      return true; // Match found
    }
  }
  return false; // No match found
}

/**
 * Retrieves the HTML content for the menu page.
 * @return {HtmlOutput} The HTML content of the menu page.
 */
function getMenuPage() {
  return HtmlService.createHtmlOutputFromFile('menu').getContent();
}

/**
 * Retrieves the HTML content for the registration page.
 * @return {HtmlOutput} The HTML content of the registration page.
 */
function getRegistrationPage() {
  return HtmlService.createHtmlOutputFromFile('registration').getContent();
}

/**
 * Retrieves the HTML content for the login page.
 * @return {HtmlOutput} The HTML content of the login page.
 */
function getLoginPage() {
  return HtmlService.createHtmlOutputFromFile('index').getContent();
}

/**
 * Registers a new user by adding their credentials to the spreadsheet.
 * Throws an error if the user already exists.
 * @param {string} email - The new user's email.
 * @param {string} password - The new user's password.
 */
function registerNewUser(email, password) {
  // Open the spreadsheet using its ID
  const ss = SpreadsheetApp.openById('1GSvEIe3CUwCxa-FoyqjwU-52fRMU4IuQHkp2qoK8Tqc');
  // Access the specific sheet where credentials are stored
  const sheet = ss.getSheetByName('Klanten');
  // Retrieve all data from the sheet
  const data = sheet.getDataRange().getValues();

  // Check if the email already exists in column B
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] == email) { // Column B (index 1)
      throw new Error('User already exists');
    }
  }
  // Append the new user's email (column B) and password (column I) to the spreadsheet
  sheet.appendRow([null, email, null, null, null, null, null, null, password]);
}
