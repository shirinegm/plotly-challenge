// Following Dom's Homework Solution Demo Session 12/11/2021
// Verify the file is loading
console.log("plots.js loaded!");

// Define function to draw Bar Chart
function drawBarChart(sampleId) {
    console.log(`drawBarChart(${sampleId})`);
}

// Define function to draw Bubble Chart
function drawBubbleChart(sampleId) {
    console.log(`drawBubbleChart(${sampleId})`);
}

// Define function to populate Demographic Data
function popDemogData(sampleId) {
    console.log(`popDemogData(${sampleId})`);
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
