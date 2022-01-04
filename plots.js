// Following Dom's Homework Solution Demo Session 12/11/2021
// Verify the file is loading
console.log("plots.js loaded!");

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


    });
}

InitDashboard();
