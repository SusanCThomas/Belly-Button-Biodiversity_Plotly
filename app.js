// // Step 1: Plotly
// // 1. Use the D3 library to read in `samples.json`.
// // Using d3.json() to fetch data from JSON samples file:
var data;
d3.json("data/samples.json").then((incomingData) => {
    console.log(incomingData);

    // From samples.json
    data = incomingData;
    console.log(data);

    // Adding test subject id number to the drop down menus
    var names = data.names;
    // Selecting dropdown tag
    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    });