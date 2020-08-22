function init() {
d3.json("samples.json").then(function(data) {
    console.log(data);
    names = data.names;
    initId = names[0];
    console.log(initId);
    barPlot(initId);
    bubbleChart(initID);
    //populate dropdown with those names thru options
    //default 
})
}



// function barPlot(id) {
// d3.json("samples.json").then(function(data) {
//     console.log(data);
//     names = data.names
//     metadata = data.metadata
//     samples = data.samples
// });
// }

// function bubbleChart(id)


// function demographics(id)
init();