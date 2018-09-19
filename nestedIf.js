let arrayOfRegion = [];
const nestedIf = (regionIndex, lineSplit, indexObj) => {
	
	const obj = {};
	if ( regionIndex !== -1) {
      obj.country = lineSplit[indexObj.countryIndex];
      obj.fat =  lineSplit[indexObj.fatIndex];
      obj.protein =  lineSplit[indexObj.proteinIndex];
      obj.carbohydrate = lineSplit[indexObj.carbohydrateIndex];
      arrayOfRegion.push(obj)
    }
    return arrayOfRegion;
}
module.exports = nestedIf;