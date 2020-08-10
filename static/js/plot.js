
function drawPlots(selected, param, div) {
    var plotData = [];
    for (i = 0; i < selected.length; i++) {
        dates = [];
        deaths = [];
        countryData = data[selected[i]]["data"]
        for (j = 0; j < countryData.length; j++) {
            dates.push(countryData[j]["date"]);
            deaths.push(countryData[j][param]);
        }
        var trace = {
            type: "scatter",
            mode: "lines",
            name: data[selected[i]]["location"],
            x: dates,
            y: deaths,
        };
        plotData.push(trace);
    }

    var layout = {
        xaxis: {
            autorange: true,
            type: "date"
        },
        yaxis: {
            autorange: true,
            type: "linear"
        },
        width: 700,
        height: 350
    };

    Plotly.newPlot(div, plotData, layout);
}

function bubbleChart(selected) {
    gdp = [];
    beds = [];
    texts = [];
    sizes = [];
    colors = [];
    for (i = 0; i < selected.length; i++) {
        gdp.push(data[selected[i]]["gdp_per_capita"]);
        beds.push(data[selected[i]]["hospital_beds_per_thousand"]);
        texts.push(data[selected[i]]["location"]);
        sizes.push(data[selected[i]]["hospital_beds_per_thousand"] * 15);
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        colors.push(`rgb(${red},${green},${blue})`);
    }
    var trace = {
        x: gdp,
        y: beds,
        text: texts,
        mode: 'markers',
        marker: {
            size: sizes,
            color: colors
        },
        type: 'scatter',
        xaxis: {
            title: {'text': 'GDP Per Capita'}
        },
        yaxis: {
            title: {'text': 'Hospital Beds Per Thousand'}
        }
    };
    var plotData = [trace];

    var layout = {
        width: 700,
        height: 350
    };

    Plotly.newPlot('plotCompare', plotData, layout);
}

function bubbleCustom(selected, selected_x, selected_y) {
    x_axis = [];
    y_axis = [];
    texts = [];
    colors = [];
    for (i = 0; i < selected.length; i++) {
        x_axis.push(data[selected[i]][selected_x]);
        y_axis.push(data[selected[i]][selected_y]);
        texts.push(data[selected[i]]["location"]);
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        colors.push(`rgb(${red},${green},${blue})`);
    }
    var trace = {
        x: x_axis,
        y: y_axis,
        text: texts,
        mode: 'markers',
        marker: {
            size: 15,
            color: colors
        },
        type: 'scatter',
        xaxis: {
            title: {'text': `${selected_x}`}
        },
        yaxis: {
            title: {'text': `${selected_y}`}
        }
    };
    var plotData = [trace];

    var layout = {
        width: 700,
        height: 350
    };

    Plotly.newPlot('plotCustom', plotData, layout);
}