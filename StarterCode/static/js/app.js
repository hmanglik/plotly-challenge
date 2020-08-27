// create the initial function that will be default
function init() {
    // select dropdown menu
    var dropdown = d3.select("#selDataset");

    // read the data
    d3.json("samples.json").then(function(data) {
        // console.log(data);
        var names = data.names;
        names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
    });
        var initId = names[0];
        // console.log(initId);
        Plot(initId);
        demographics(initId);
        gauge(initId);
})
}

function optionChanged(id) {
    Plot(id);
    demographics(id);
    gauge(id);
}


function Plot(id) {
    d3.json("samples.json").then(function(data) {
        // console.log(data);
        var samples = data.samples
        var samples = samples.filter(sampleID => sampleID.id === id)[0];
        // console.log(samples);
        var sampleValues = samples.sample_values.slice(0, 10).reverse();
        var otuIds = samples.otu_ids.slice(0, 10).reverse();
        var otuIdslabels = otuIds.map(id_label => "OTU" + id_label);
        var sampleLabels = samples.otu_labels.slice(0, 10);

        var trace = {
            x: sampleValues,
            y: otuIdslabels,
            text: sampleLabels,
            type: "bar",
            orientation: "h"
        };

        var data = [trace]

        var layout = {
            title: "Top 10 OTUs",
            xaxis: {title: "Sample Values"},
            yaxis: {title: "OTU"}
        }

        Plotly.newPlot("bar", data, layout);

        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };
        
        var layout = {
            xaxis:{title: "OTU IDs"},
            yaxis:{title: "Sample Values"}
        };
        
        var data = [trace1];
        Plotly.newPlot("bubble", data, layout); 
        
    });
}
function gauge (id) {
    d3.json("samples.json").then(function(data) {
        var samples = data.metadata
        var samples = samples.filter(sampleID => sampleID.id == id)[0];
        var washing_freq = samples.wfreq;
        var trace = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: washing_freq,
              title: { text: "Belly Button Washing Frequency"},
              annotations: [{
                  text: "Scrubs per Week",
                  font: {size: 13}
              }],
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                steps: [
                  { range: [2, 5], color: "lightgray" },
                  { range: [0, 2], color: "gray" }
                ],
              }
            }
          ];
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', trace, layout);
});
}
function demographics(id) {
    d3.json("samples.json").then(function(data) {
        // console.log(data);
        var metadata = data.metadata;
        // console.log(metadata);
        var result  = metadata.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(result);
    
        var getDemographic = d3.select("#sample-metadata");
        
        getDemographic.html("");

        Object.entries(result).forEach((key) => {   
                console.log(key)
                getDemographic.append("h6").text(key[0] + ": " + key[1] + "\n");    
        });
    });
}

init();