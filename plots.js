// Following Dom's Homework Solution Demo Session 12/11/2021
// Verify the file is loading
console.log("plots.js loaded!");

// Define function to draw Bar Chart
function drawBarChart(sampleId) {
    console.log(`drawBarChart(${sampleId})`);

    // Read the data
    d3.json("samples.json").then(data => {

        let samples = data.samples;

        // Get only the result matching what was passed to the function
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        // Get handles for all the data necessary to draw the chart
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        // Map out Sample Ids to show as labels on the Y axis
        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        // Define the bar data traces
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        // Add the trace into an array
        let barArray = [barData];

        // Add a layout definition
        let barLayout = {
            title: "Top 10 Bacteria Cultures by Sample",
            margin: { t:100, l: 150}

        }

        // Call Plotly on the trace array
        Plotly.newPlot("bar", barArray, barLayout);
    });
}

// Define function to draw Bubble Chart
function drawBubbleChart(sampleId) {
    console.log(`drawBubbleChart(${sampleId})`);
    // Read the data
    d3.json("samples.json").then(data => {

        let samples = data.samples;

        // Get only the result matching what was passed to the function
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        // Get handles for all the data necessary to draw the chart
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;


        // Define the bubble chart data traces
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            },
            text: otu_labels,

        };

        // Add the trace into an array
        let bubbleArray = [bubbleData];

        // Add a layout definition
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            showlegend: false,
            margin: { t:100, l: 150}

        }

        // Call Plotly on the trace array
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });

}

// Define function to populate Demographic Data
function popDemogData(sampleId) {
    console.log(`popDemogData(${sampleId})`);

    //Read the data
    d3.json("samples.json").then(data => {

        let metadata = data.metadata;


        // Get only the result matching what was passed to the function
        let resultArray = metadata.filter(o => o.id.toString() === sampleId);
        let result = resultArray[0];

        // Grab the element to add data to by id
        let panel = d3.select("#sample-metadata");

        // Empty the panel
        panel.html("");

        // Create a Unordered list with all relevant data
        let list = panel.append("ul");

        // Add a list item for each metadata point
        Object.entries(result).forEach(([key, value]) => {
            let item = list.append("li");
            item.text(`${key}: ${value}`);
        });

    });

    


}

// Set up Event handler
function optionChanged(id) {

    // Log that the function is called and for which id
    console.log(`optionChanged(${id})`);

    // Call function to display Bar Chart
    drawBarChart(id);

    // Call function to display Bubble Chart
    drawBubbleChart(id);

    // Call function to display Demographic Info
    popDemogData(id);
}



// Initialize the Dashboard
function InitDashboard()
{
    console.log("Initializing Dahsboard");

    // Select the drop down item by id
    let selector = d3.select("#selDataset");

    // Read the data from the sample file in the same folder
    d3.json("samples.json").then(data => {
        // Fling data into here and start by logging the data
        console.log(data);

        // Put a handle on sample names
        let sampleNames = data.names;

        // Iterate through all sample names 
        // and add an option element for each to appear in the drop down
        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        // Define sampleId to be the first option in the drop down
        let sampleId = sampleNames[0];

        // Call function to display Bar Chart
        drawBarChart(sampleId);

        // Call function to display Bubble Chart
        drawBubbleChart(sampleId);

        // Call function to display Demographic Info
        popDemogData(sampleId);

    });
}

InitDashboard();
