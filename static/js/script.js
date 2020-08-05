$(document).ready(function () {
    // Populate the Location select options
    var optionItems;
    Object.keys(data).forEach((key) => {
        optionItems += `<option value=${key}>${data[key]["location"]}</option>`;
    });
    $("#selLocation").html(optionItems);
    
    // Update last updated
    var worldData = data["OWID_WRL"]["data"];
    var lastUpdated = worldData[worldData.length - 1]["date"];
    $("#lastUpdated").html(lastUpdated); 

    // Initial plots with World data
    var defaultLoc = 'OWID_WRL';
    $('select#selLocation').val(defaultLoc);
    var locationName = data[defaultLoc]["location"];
    $('#locList').html(`Selected Location(s): ${locationName}`);
    drawPlots([defaultLoc], 'total_deaths_per_million', 'plotDeaths');
    drawPlots([defaultLoc], 'total_cases_per_million', 'plotCases');
    bubbleChart([defaultLoc]);

    // Redraw Deaths plot with selected countries
    $('#selLocation').change(function () {
        var selected = $('select#selLocation').val();
        var countries = selected.map(sel => data[sel]["location"]);
        $('#locList').html(`Selected Location(s): ${countries}`);
        drawPlots(selected, 'total_deaths_per_million', 'plotDeaths');
        drawPlots(selected, 'total_cases_per_million', 'plotCases');
        bubbleChart(selected);
    });
});