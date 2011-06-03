// PLEASE SPECIFY THE ID OF THE DATA SPREADSHEET.
// IF YOU DON'T SPECIFY THIS, THIS PROGRAM WILL RUN MUCH SLOWER.
var DATA_SPREADSHEET_ID = '';



/////////////////////////////
// EGO Cashflow2
var version = '1.0';
/////////////////////////////
var ss = null;
var docId = null;
// try to access the user-specified data spreadsheet
try{
  ss = SpreadsheetApp.openById(DATA_SPREADSHEET_ID);
}catch(e){
  // try to access the default auto-created file
  var docName = 'cashflow_'+ Session.getUser().getUserLoginId();
  var files = DocsList.getFilesByType('spreadsheet');
  for (var i in files)
    if (files[i].getName() == docName)
      ss = SpreadsheetApp.openById(files[i].getId());
  // fail then create a new one
  if(ss == null) ss = SpreadsheetApp.create(docName);
  docId = ss.getId();
};
// access the data sheet
var sheet = ss.getSheetByName('Transactions');
// fail then build an empty one
if (sheet == null){
  sheet = ss.insertSheet('Transactions', 0);
  sheet.getRange(1, 1, 1, 7).setValues([['Change', 'Target', 'Interest', 'Title', 'isCash', 'Description', 'Date']]);
};

function doGet(){
  // include GUI builder components
  var app = UiApp.createApplication();
  app.add(app.loadComponent('MyGui')); // name of the saved Gui

  // access UI components
  var c = new Components(app);
  // add styles
  c.container.setStyleAttribute('position','fixed');
  c.listbox.lbDates.setStyleAttribute('fontSize','12px');
  c.listbox.lbTransactions.setVisibleItemCount(4).setStyleAttribute('fontSize','12px');
  var r = new Records(sheet.getRange('A2:G'+ sheet.getLastRow()).sort(7).getValues());
  // backup the loaded data
  c.persistent.setText(Utilities.jsonStringify(r.data));
  // forward click event to the container
  forwardEvents(['btnAdd', 'btnDelete', 'btnUpdate', 'btnModify', 'btnNew', 'btnApply', 'btnToday'], 'click');
  forwardEvents(['lbDates', 'lbTransactions'], 'change');
  forwardEvents(['rdCash', 'rdNonCash'], 'click_radio');
  // init state
  c.refresh(Utilities.formatDate(new Date, 'GMT', 'MM/dd/yyyy'), r);
  // enable flags, [Modify, Update, Delete, New, Add, Apply, Fields, ListBoxes], -1:Don't Care
  c.setEnabled([true, false, true, true, false, -1, false, true]);
  if(DATA_SPREADSHEET_ID == ''){
    c.status('Please specify DATA_SPREADSHEET_ID as "'+ docId +'" or it will run slower.');
  }else c.status('Welcome to EGO Cashflow2 (v'+ version +')');
  return app;

  /* helper functions */
  function forwardEvents(controls, type){  // recursive
    if (controls.length == 0) return; // exit condition
    var control = controls.pop();
    var handler;
    switch(type){
      case 'click':
        handler = app.createServerClickHandler('stateHandler').addCallbackElement(c.container);
        c.button[control].addClickHandler(handler);
        break;
      case 'click_radio':
        handler = app.createServerClickHandler('stateHandler').addCallbackElement(c.container);
        c.radio[control].addClickHandler(handler);
        break;
      case 'change':
        handler = app.createServerChangeHandler('stateHandler').addCallbackElement(c.container);
        c.listbox[control].addChangeHandler(handler);
        break;
    };
    forwardEvents(controls, type);
  };
};


function stateHandler(e){
  // for debugging
  if(typeof e == 'undefined')
    e = {'parameter':{'source': 'init', 'tbPersistent': ''}};
  // get the basic reference again
  var app = UiApp.getActiveApplication();
  var c = new Components(app);
  // reconstruct the persistent memory
  var persistent = Utilities.jsonParse(e.parameter.tbPersistent);
  for(var i = 0; i < persistent.length; i++) persistent[i][6] = new Date(persistent[i][6]);
  var r = new Records(persistent);
  c.persistent.setText(Utilities.jsonStringify(r.data));

  // handle event by source
  switch (e.parameter.source){
    case 'lbDates':  //onChange
      c.refresh(e.parameter.lbDates, r);
      c.setEnabled([true, false, true, true, false, -1, false, true]);
      c.status('All transactions for the selected date have loaded. ('+ e.parameter.lbDates +')');
      break;
    case 'lbTransactions':  //onChange
      var id = e.parameter.lbTransactions.split('.')[0];
      c.printDetails(id, r);
      c.setEnabled([true, false, true, true, false, -1, false, true]);
      c.status('The detailed dataview has populated for the selected transaction. (ID: '+ id +')');
      break;
    case 'init':
      c.refresh(Utilities.formatDate(new Date, 'GMT', 'MM/dd/yyyy'), r);
      c.setEnabled([true, false, true, true, false, -1, false, true]);
      c.status('Welcome to EGO Cashflow (v'+ version +')');
      break;
    case 'btnModify':
      c.setEnabled([false, true, false, true, false, -1, true, true]);
      c.status('The selected item is now ready for modification. Click Update when you are finished and apply.');
      break;
    case 'btnUpdate':
      r.update(c.getValues(e), e.parameter.lbTransactions.split('.')[0]);
      c.persistent.setText(Utilities.jsonStringify(r.data));
      c.refresh(e.parameter.txtDate, r);
      c.setEnabled([true, false, true, true, false, true, false, true]);
      c.status('The item has updated now.');
      break;
    case 'btnDelete':
      r.del(e.parameter.lbTransactions.split('.')[0]);
      c.persistent.setText(Utilities.jsonStringify(r.data));
      if(r.data.length == 0){  // handle the last item deletion
        c.clear();
      }else c.refresh(e.parameter.lbDates, r);
      c.setEnabled([true, false, true, true, false, true, false, true]);
      c.status('The selected item has deleted.');
      break;
    case 'btnNew':
      for(var i in c.txt) c.txt[i].setText('');
      for(var i in c.radio) c.radio[i].setValue(false);
      c.setEnabled([false, false, false, true, true, -1, true, true]);
      c.status('A new item is ready to be added. Click Add when you are finished and apply.');
      break;
    case 'btnAdd':
      r.add(c.getValues(e));
      c.persistent.setText(Utilities.jsonStringify(r.data));
      c.refresh(e.parameter.txtDate, r);
      c.setEnabled([true, false, true, true, false, true, false, true]);
      c.status('The item has added.');
      break;
    case 'btnApply':
      r.write(sheet);
      var cashier = new Cashier(sheet);
      cashier.run();
      c.setEnabled([-1, -1, -1, -1, -1, false, -1, -1]);
      c.status('The master record has updated. The charts will be automatically updated in less than one minute.');
      break;
    case 'btnToday':
      c.txt.txtDate.setText(Utilities.formatDate(new Date, 'GMT', 'MM/dd/yyyy'));
      c.status('Today\'s date has added to the date field.');
      break;
    case 'rdCash':
      c.radio.rdNonCash.setValue(false);
      break;
    case 'rdNonCash':
      c.radio.rdCash.setValue(false);
      break;
    default:
  };
  return app;
};


/**
 * Components class
 *
 * This class implements a UI component handler
 * @param {UiApp} app
 */
var Components = function(app){var self = this;
  this.txt = getElements(['txtDate', 'txtTitle', 'txtChange', 'txtTarget', 'txtRate', 'tbDesc'], true);
  this.radio = getElements(['rdCash', 'rdNonCash'], true);
  this.button = getElements(['btnModify', 'btnUpdate', 'btnDelete', 'btnNew', 'btnAdd', 'btnApply', 'btnToday'], false);
  this.listbox = getElements(['lbDates', 'lbTransactions'], true);
  this.container = app.getElementById('pnlDetails');
  this.statusbar = app.getElementById('lblInfo');
  this.persistent = app.getElementById('tbPersistent').setName('tbPersistent');

  this.clear = function(){
    for(var i in self.txt) self.txt[i].setText('');
    for(var i in self.radio) self.radio[i].setValue(false);
    self.listbox.lbDates.clear();
    self.listbox.lbTransactions.clear();
  };

  this.setEnabled = function(arr){
    // set buttons
    var j = 0;
    for(var i in self.button){
      if(arr[j] != -1) self.button[i].setEnabled(arr[j]);
      j++;
    };
    // set fields (txt & radio)
    if(arr[6] != -1){  // skip don't care
      for(var i in self.txt) self.txt[i].setEnabled(arr[6]);
      for(var i in self.radio) self.radio[i].setEnabled(arr[6]);
      // today button follows all other button state
      self.button.btnToday.setEnabled(arr[6]);
    };
    // set listboxes
    if(arr[7] != -1){
      for(var i in self.listbox) self.listbox[i].setEnabled(arr[7]);
    };
  };

  this.getValues = function(e){
    //TODO: validate input data
    var record = [];
    record.push(e.parameter.txtChange);
    record.push(e.parameter.txtTarget);
    record.push(e.parameter.txtRate);
    record.push(e.parameter.txtTitle);
    if(e.parameter.rdCash == 'true'){
      record.push(1);
    }else record.push(0);
    record.push(e.parameter.tbDesc);
    record.push(new Date(e.parameter.txtDate));
    return record;
  };

  this.refresh = function(date, r){  // (String)date
    date = r.getNearestDate(date);
    // clear all
    self.clear();
    // fill the date listbox
    var index = 0;
    var selectedIndex = -1;
    for(var i in r.indicies){
      self.listbox.lbDates.addItem(i);
      if(i == date && selectedIndex == -1){
        selectedIndex = index;
      };
      index++;
    };
    self.listbox.lbDates.setSelectedIndex(selectedIndex);
    // fill the transaction listbox
    var dateRecords = r.getByDate(date);
    var firstId = r.indicies[date][0];
    for(var i = 0; i < dateRecords.length; i++){
      self.listbox.lbTransactions.addItem((firstId + i) +'. '+ dateRecords[i][3]);
    };
    // select the first item by default
    self.listbox.lbTransactions.setSelectedIndex(0);
    self.printDetails(firstId, r);
  };

  this.printDetails = function(index, r){
    self.txt.txtRate.setText(r.data[index][2] +'');
    self.txt.txtTitle.setText(r.data[index][3]);
    self.txt.txtChange.setText(addCommas(r.data[index][0]));
    self.txt.txtTarget.setText(addCommas(r.data[index][1]));
    //TODO: radio grouping required
    var isCash = this.radio.rdCash;
    var isNonCash = this.radio.rdNonCash;
    if(r.data[index][4]){
      isCash.setValue(true);
      isNonCash.setValue(false);
    }else{
      isCash.setValue(false);
      isNonCash.setValue(true);
    }
    self.txt.tbDesc.setText(r.data[index][5]);
    self.txt.txtDate.setText(Utilities.formatDate(r.data[index][6], 'GMT', 'MM/dd/yyyy'));
  };

  this.status = function (str){
    self.statusbar.setText(str);
  };

  // local helper functions
  function getElements(arr_id, isSetName){
    var elements = [];
    for(var i in arr_id){
      if(isSetName){
        elements[arr_id[i]] = app.getElementById(arr_id[i]).setName(arr_id[i]);
      }else elements[arr_id[i]] = app.getElementById(arr_id[i]);
    }
    return elements;
  };
  function addCommas(str){
    str += '';
    var x = str.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)){
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    };
    return x1 + x2;
  };
};


/**
 * Records class
 *
 * This class implements an data structure maintains unsubmitted record data.
 * @param {Array} data
 */
var Records = function(data){var self = this;
  // Sort ascending by date
  this.data = data;
  this.indicies = [];
  buildIndexMatrix();

  this.del = function(id){
    self.data.splice(id, 1);
    buildIndexMatrix();
  };
  this.update = function(record, id){
    self.data[id] = record;
    // sort by date (handle when date info has modified)
    self.data.sort(function(a,b){return a[6] - b[6]});
    buildIndexMatrix();
  };
  this.add = function(record){
    // detect the index for insertion
    var index = -1;
    for(var i = 0; i < self.data.length; i++){
      if(self.data[i][6] >= record[6]){
        index = i;
        break;
      };
    };
    self.data.splice(index, 0, record);
    buildIndexMatrix();
  };
  this.getById = function(id){
    return self.data[id];
  };
  // returns the records of the specified date or the nearest future date
  this.getByDate = function(date){  // (String)date
    //Logger.log(date)
    if(self.indicies[date] == null)
      date = self.getNearestDate(date);
    // array copy the record since (Array).splice() will modify the orig. copy
    var t_data = self.data.slice();
    return t_data.splice(self.indicies[date][0], self.indicies[date][1] - self.indicies[date][0] + 1);
  };

  this.getNearestDate = function(date){
    // find the nearest future date
    for(var i in self.indicies){
      if(new Date(i) >= new Date(date)){
        return i;
      };
    };
    return self.indicies[self.indicies.length - 1];
  };

  // write to the spreadsheet
  this.write = function(sheet){
    sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clear();
    sheet.getRange(2, 1, self.data.length, 7).setValues(self.data);
  };

  /* helper functions */
  function buildIndexMatrix(){
    self.indicies = [];  // clear the matrix
    var current, old;  // (String)date
    for(var i = 0; i < self.data.length; i++){
      current = Utilities.formatDate(self.data[i][6], 'GMT', 'MM/dd/yyyy');
      //Logger.log(current)
      if(current != old){
        self.indicies[current] = [i, i];
        old = current;
      }else{
        self.indicies[old][1]++;
      };
    };
  //for(var i in self.indicies) Logger.log(i +': '+ self.indicies[i]);
  };
};


/**
 * Cashier class
 *
 * This class implements a prototype of Cashflow object containers. (cashier)
 * @param {Sheet} sheet
 */
var Cashier = function(sheet){var self = this;
  this.sheet = sheet;
  this.headers = ['Cash', 'Description', 'Non-cash', 'Description', 'Total', 'Accounts', 'Amount', 'Shortfall', 'Interests'];
  // containers
  this.events = [];  // raw row data
  this.data = [];  // formatted events
  this.accounts = [];  // accounts

  // main run
  this.run = function(){
    if(!self.sanity()) return false;
    self.clear();
    self.printHeaders();
    self.compile();
    self.print();
    return true;
  };

  // Check the sanity
  this.sanity = function(){
    self.events = self.sheet.getRange('A2:G'+ sheet.getLastRow()).sort(7).getValues();
    return true;
  };

  // Print header labels
  this.printHeaders = function(){
    self.sheet.getRange(1, 8, 1, self.headers.length).setValues([self.headers]);
  };

  // Clear data range
  this.clear = function(){
    self.sheet.getRange(2,8, self.sheet.getLastRow(), self.headers.length).clearContent();
  };

  // Format the input and fill data[] and accounts[]
  this.compile = function(){
    // Prepare containers
    var data =[];
    var title = '';
    var amount = 0;
    var target = 0;
    var rate = 0;
    var totalCash = 0;
    var totalNonCash = 0;
    var isCash = false;
    var moneyInfo = null;
    // Compile all the row information: optimized the format of the data for the trend chart type
    for(var i = 0; i < self.events.length; i++){
      // Refresh the amount & title
      var value = [];
      amount = new Number(self.events[i][0]);
      target = new Number(self.events[i][1]);
      rate = new Number(self.events[i][2]);
      // Handle each type of money
      fillDataArray(self.events[i][4]);
    };
    // Compile the account array
    fillAccountArray();

    // money handler
    function fillDataArray(isCash){
      var moneyInfo = null;
      // Handle cash or non-cash transaction
      if(isCash){
        totalCash += amount;
        value.push(totalCash);
        // Push the cash description
        value.push(self.events[i][5]);
        // Skip the non-cash columes
        value.push(totalNonCash);
        value.push('');
      }else{
        // Skip the non-cash columes
        value.push(totalCash);
        value.push('');
        totalNonCash += amount;
        value.push(totalNonCash);
        // Push the cash description
        value.push(self.events[i][5]);
      };
      // Push the Sum of cash/non-cash
      value.push(totalCash + totalNonCash);
      // Push all in series
      self.data.push(value);
    };
    // account handler
    function fillAccountArray(){
      var isFound = false;
      for(var i = 0; i < self.data.length; i++){
        // ignore forcasted transactions, date: self.data[i][2]
        //if(Utilities.formatDate(self.events[i][6], 'GMT', 'MM/dd/yyyyy') > Utilities.formatDate(new Date(), 'GMT', 'MM/dd/yyyyy'))
        if(new Date(self.events[i][6]) > new Date())
          break;
        for(var j = 0; j < self.accounts.length; j++){
          //amount: data[..][0] = accounts[..][1], title: data[..][3] = accounts[..][0]
          if(self.events[i][3] == self.accounts[j][0]){
            self.accounts[j][1] += self.events[i][0];
            isFound = true;
            break;
          };
        };
        if(!isFound){
          self.accounts[self.accounts.length] = [self.events[i][3], self.events[i][0]];
        }
        isFound = false;
      };
      // remove all zero balanced accounts & do others
      for(var i = 0; i < self.accounts.length; i++){
        if(self.accounts[i][1] == 0){
          self.accounts.splice(i,1);
          i--;  // adjust the index (left-shift effect)
        }else{
          // calculate the shortfall
          self.accounts[i][2] = -(self.accounts[i][1] - ((self.events[i][1] == 0)?self.accounts[i][1]:self.events[i][1]));
          // calculate the cumulative interest
          self.accounts[i][3] = self.accounts[i][1] * (self.events[i][2] / 100);
        }
      };
    };
  };

  // Print the formatted data
  this.print = function(){
    // Print the data table, 5 = number of account columns + 1
    self.sheet.getRange(2, 8, self.events.length, 5).setValues(self.data);
    // Print the account table
    self.sheet.getRange(2, 13, self.accounts.length, 4).setValues(self.accounts);
  };
};