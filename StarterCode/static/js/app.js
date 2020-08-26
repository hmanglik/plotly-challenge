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
        // gauge(initId);
})
}

function optionChanged(id) {
    Plot(id);
    demographics(id);
    // gauge(id);
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

// function gauge (id) {
//     d3.json("samples.json").then(function(data) {
//         // console.log(data);
//         var samples = data.metadata
//         var samples = samples.filter(sampleID => sampleID.id == id)[0];
//         console.log(samples)
//         level = parseFloat(samples.wfreq) * 20 
//         var degrees = 180-(level);
//             radius = .5;
//         var radians = degrees * Math.PI / 180;
//         var x = radius * Math.cos(radians);
//         var y = radius * Math.sin(radians);

//         // Path: may have to change to create a better triangle
//         var mainPath = 'M -.0 -0.05 L .0 0.05 L ';
//             pathX = String(x);
//             space = ' ';
//             pathY = String(y);
//             pathEnd = ' Z';
//         var path = mainPath.concat(pathX,space,pathY,pathEnd);

//     var data = [{
//           domain: { x: [0], y: [0] },
//           title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
//           type: "scatter",
//           marker: {size: 28, color:'850000'},
//           showlegend: false,
//           name: 'freq',
//           text: level,
//           hoverinfo: 'text+name'},
//         { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
//           rotation: 90, text: ["8-9", "7-8","6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0,1", ""], textinfo: 'text',
//           textposition:'inside',      
//           marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                                  'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                                  'rgba(210, 206, 145, .5)', 
//                                  'rgba(255, 255, 255, 0)']},
//           labels: ['4.5-5', '3.5-4.49', '2.5-3.49', '1.5-2.49', '1-1.49'],
//           hoverinfo: 'label',
//           hole: .5,
//           type: 'pie',
//           showlegend: false
//         }];
      
//       var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
//       Plotly.newPlot('gauge', data, layout);
// });
// }

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