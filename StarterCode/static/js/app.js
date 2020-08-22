function init() {
    var dropdown = d3.select("#selDataset");
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
})
}

function optionChanged(id) {
    Plot(id);
    demographics(id);
}


function Plot(id) {
    d3.json("samples.json").then(function(data) {
        // console.log(data);
        var samples = data.samples
        var samples = samples.filter(sampleID => sampleID.id ===id)[0];
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
            yaxis:{title: "Sample Values"},
            height: 600,
            width: 1300
        };
        
        var data = [trace1];
        Plotly.newPlot("bubble", data, layout); 
        
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


