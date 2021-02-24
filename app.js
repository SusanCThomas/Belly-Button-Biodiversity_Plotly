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

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.     

    // Initializes the page with a default plot
    function init() {

        // Setting the first test id number as the default for plotting
        defaultTestId = data.samples.filter(sample => sample.id === "940")[0];
        console.log(defaultTestId);

        // * Use `sample_values` as the values for the bar chart.
        defaultSampleValues = defaultTestId.sample_values;

        // * Use `otu_ids` as the labels for the bar chart.
        defaultotuids = defaultTestId.otu_ids;

        // * Use `otu_labels` as the hovertext for the chart.
        defaultotulabels = defaultTestId.otu_labels;

        // The top 10 OTUs
        sampleValues = defaultSampleValues.slice(0, 10).reverse();
        sampleotuids = defaultotuids.slice(0, 10).reverse();
        sampleotulabels = defaultotulabels.slice(0, 10).reverse();

        console.log(sampleValues);
        console.log(sampleotuids);
        console.log(sampleotulabels);

        // Plot 1: Bar Chart
        //  Create the Traces
        var trace1 = {
            x: sampleValues,
            y: sampleotuids.map(outId => `OTU ${outId}`),
            text: sampleotulabels,
            type: "bar",
            orientation: "h",
        };

        // Create the data array for the plot
        var databar = [trace1];

        // Define the plot layout
        var layoutbar = {
            title: "Top 10 UTOs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" },
            autosize: false,
            width: 500,
            height: 600,
        }

        // Plot the "bar" chart 
        Plotly.newPlot("bar", databar, layoutbar);

// 3. Create a bubble chart that displays each sample.
        // Plot 2: Bubble Chart
        //  Create the Traces
        var trace2 = {
            x: defaultotuids,
            y: defaultSampleValues,
            text: defaultotulabels,
            mode: 'markers',
            marker: {
                color: defaultotuids,
                colorscale: "Rainbow",
                size: defaultSampleValues,
            },
        };

        // Create the data array for the plot
        var databubble = [trace2];

        // Define the plot layout
        var layoutbubble = {
            title: 'Sample Display',
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Value" },
            sizemode: "area",
            showlegend: false,
            height: 600,
            width: 1200,
        };

        // Plot the "bubble" chart 
        Plotly.newPlot('bubble', databubble, layoutbubble);

// 4. Display the sample metadata, i.e., an individual's demographic information.

        // Filtering Demographic information 
        defaultDemographic = data.metadata.filter(sample => parseInt(sample.id) === 940)[0];
        console.log(defaultDemographic);

        // Getting a reference to the table using d3
        var panelBody = d3.select("#sample-metadata");
        panelBody.html("");
        // Using d3 to append table row to `p` for each metadata
        var row = panelBody.append("p");
        // Using the `Object.entries` to console.log each metadata
        Object.entries(defaultDemographic).forEach(([key, value]) => {
            console.log(key, value);
            // Append a cell to the row for each value
            var cell = row.append("p");
            cell.text(`${key.toUpperCase()}: ${value}`);
        });

        // Advanced Challenge Assignment (Optional)
        // Please see bonus.js for alternative bonus gauge code matching given screenshot