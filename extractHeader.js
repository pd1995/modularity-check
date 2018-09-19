const extractHeader = (headerLine) => {
	let indexGetterData = {
		countryIndex : headerLine.indexOf("countries"),
		sugarIndex : headerLine.indexOf("sugars_100g"),
		saltIndex : headerLine.indexOf("salt_100g"),
		fatIndex : headerLine.indexOf("fat_100g"),
		proteinIndex :headerLine.indexOf("proteins_100g"),
		carbohydrateIndex : headerLine.indexOf("carbohydrates_100g")
	}
 return indexGetterData;

}

module.exports = extractHeader;
