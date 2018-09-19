const csvFile = 'input/FoodFacts.csv';
const readline = require('readline');
const fs = require('fs');
// extractHeaderIndex
const extractIndex = require("./extractHeader.js");
const variableObj = require("./config.js");
// const nestedIf = require("./nestedIf.js");
let aggregator = require("./aggregator.js");

// let sugar;
// let salt;
// let fat;
// let protein;
// let carbohydrate;
const dataOfSaltSugar = {};
let header = [];
let arrayOfNorthEurope = [];
let arrayOfCentralEurope = [];
let arrayOfSouthEurope = [];
let dataOfFatProteinCarbohydrate = [];
const rl = readline.createInterface({
  input: fs.createReadStream(csvFile),
});

let counter = 0;
rl.on('line', (line) => {
  counter++;
  if (counter === 1) {
    header = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
    indexObj = extractIndex(header);
  }  
  const lineSplit = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
  const isCountryImportant = variableObj.countries.indexOf(lineSplit[indexObj.countryIndex]);
  if (isCountryImportant > -1 && (lineSplit[indexObj.saltIndex] !== '' && lineSplit[indexObj.sugarIndex] !== '')) {
    const obj = {};
    if (dataOfSaltSugar[lineSplit[indexObj.countryIndex]]) {
      dataOfSaltSugar[lineSplit[indexObj.countryIndex]].salt += parseInt(lineSplit[indexObj.saltIndex], 10);
      dataOfSaltSugar[lineSplit[indexObj.countryIndex]].sugar += parseInt(lineSplit[indexObj.sugarIndex], 10);
    } else {
      obj.sugar = parseInt(lineSplit[indexObj.sugarIndex], 10);
      obj.salt = parseInt(lineSplit[indexObj.saltIndex], 10);
      obj.country = lineSplit[indexObj.countryIndex];
      dataOfSaltSugar[lineSplit[indexObj.countryIndex]] = obj;
    }
  }
  const allRegionIndex = variableObj.allRegionsArray.indexOf(lineSplit[indexObj.countryIndex]);
  const northRegionIndex = variableObj.northRegion.indexOf(lineSplit[indexObj.countryIndex]);
  const centralRegionIndex = variableObj.centralRegion.indexOf(lineSplit[indexObj.countryIndex]);
  const southRegionIndex = variableObj.southRegion.indexOf(lineSplit[indexObj.countryIndex]);
  if (allRegionIndex > -1 && (lineSplit[indexObj.fatIndex] !== '' && lineSplit[indexObj.proteinIndex] !== ''  && lineSplit[indexObj.carbohydrateIndex] !== '')){
        
     const obj = {};
    if ( northRegionIndex !== -1) {
      
      obj.country = lineSplit[indexObj.countryIndex],
      obj.fat =  lineSplit[indexObj.fatIndex],
      obj.protein =  lineSplit[indexObj.proteinIndex],
      obj.carbohydrate = lineSplit[indexObj.carbohydrateIndex]
      arrayOfNorthEurope.push(obj)
    }else 
    if ( centralRegionIndex !== -1) {
      
      obj.country = lineSplit[indexObj.countryIndex],
      obj.fat =  lineSplit[indexObj.fatIndex],
      obj.protein =  lineSplit[indexObj.proteinIndex],
      obj.carbohydrate = lineSplit[indexObj.carbohydrateIndex]
      arrayOfCentralEurope.push(obj) 
    }else 
    if ( southRegionIndex !== -1) {
      
      obj.country = lineSplit[indexObj.countryIndex],
      obj.fat =  lineSplit[indexObj.fatIndex],
      obj.protein =  lineSplit[indexObj.proteinIndex],
      obj.carbohydrate = lineSplit[indexObj.carbohydrateIndex]
      arrayOfSouthEurope.push(obj)
    }
  }
});
rl.on('close', () => {
  let dataOfNorthEurope = {
  }
  let dataOfCentralEurope = {
      fat : 0,
      protein : 0,
      carbohydrate : 0
  }
  let dataOfSouthEurope = {
      fat : 0,
      protein : 0,
      carbohydrate : 0
  }
  dataOfNorthEurope=aggregator(arrayOfNorthEurope,"NE");
  dataOfCentralEurope=aggregator(arrayOfCentralEurope,"CE");
  dataOfSouthEurope=aggregator(arrayOfSouthEurope,"SE");

  dataOfFatProteinCarbohydrate.push(dataOfNorthEurope);
  dataOfFatProteinCarbohydrate.push(dataOfCentralEurope);
  dataOfFatProteinCarbohydrate.push(dataOfSouthEurope);

  console.log("^^^^^^^^^^^^^^^^^^^^^^", dataOfFatProteinCarbohydrate);

  console.log("************", Object.values(dataOfSaltSugar));
  const saltSugar = JSON.stringify(Object.values(dataOfSaltSugar));
  
  fs.writeFile('output/output.json', saltSugar, 'utf8', (err) => {
    if(err) throw err;
  });
  console.log("************", Object.values(dataOfFatProteinCarbohydrate));
  const fatProteinCarbohydrate = JSON.stringify(Object.values(dataOfFatProteinCarbohydrate));
  fs.writeFile('output/output1.json', fatProteinCarbohydrate, 'utf8', (err) => {
    if(err) throw err;
  });
});
    
      

  
  







