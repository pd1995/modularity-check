let aggregator = (array, region) => {
    let aggregation = {  
    fat : 0,
    protein : 0,
    carbohydrate : 0
    }
    // console.log("array", array);
    // console.log("region", region);
  array.forEach((e) => {
    aggregation.country = region;
    aggregation.fat += parseInt(e.fat) || 0;
    aggregation.protein += parseInt(e.protein) || 0;
    aggregation.carbohydrate += parseInt(e.carbohydrate) || 0;
  });
  console.log('!!!!!!!!!!!!', aggregation);
return aggregation;
};
module.exports = aggregator;