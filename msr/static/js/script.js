$(document).ready(function () {
    // Populate the Location select options
    var optionItems;
    Object.keys(data).forEach((key) => {
        optionItems += `<option value=${key}>${data[key]["location"]}</option>`;
    });
    $("#selLocation").html(optionItems);
    $("#selectCountry").html(optionItems);

    // Populate the X and Y Axes in custom plot tab
    var features;
    var optionAxes;
    var removeFeatures = ['location', 'data']; // exclude these from selections
    features = Object.keys(data["OWID_WRL"]) // gather all available features
    features.forEach((feature) => { //iterate through and remove unwanted features
        if (removeFeatures.indexOf(feature) < 0) { // if feature is not in removeFeatures list, add it as a select option
            optionAxes += `<option value=${feature}>${feature}</option>`;
        }
    });
    $("#selectX").html(optionAxes);
    $("#selectY").html(optionAxes);

    // Datepicker on predict tab
    $(function () {
        $("#selectDate").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true
        });
    });

    // Fetch and display prediction
    $("#predictSubmit").click(function () {
        var country = $('select#selectCountry').val();
        var u_date = $('#selectDate').val();
        $.ajax({
            url: `/predict/${country}/${u_date}`, success: function (result) {
                var cases = result.cases;
                var deaths = result.deaths;
                var predicted_cases = cases.toLocaleString(undefined, { minimumFractionDigits: 0 });
                var predicted_deaths = deaths.toLocaleString(undefined, { minimumFractionDigits: 0 });
                var output = `Predictions for ${data[country]["location"]} as on ${u_date}: <br/>
                Total Cases:  <strong>${predicted_cases}</strong><br/>
                Total Deaths: <strong>${predicted_deaths}</strong>
                `
        //         var output = `Total Cases (predicted) in <strong>${data[country]["location"]}</strong> 
        //   as on ${u_date}: <strong>${prediction}</strong>`;
                $("#predictions").html(output);
            }
        });
    });

    // Update last updated
    var worldData = data["OWID_WRL"]["data"];
    var lastUpdated = worldData[worldData.length - 1]["date"];
    $("#lastUpdated").html(lastUpdated);

    // Initial plots with World data
    var defaultLoc = 'OWID_WRL';
    $('select#selLocation').val(defaultLoc);
    var locationName = data[defaultLoc]["location"];
    $('#locList').html(`${locationName}`);
    drawPlots([defaultLoc], 'total_deaths_per_million', 'plotDeaths');
    drawPlots([defaultLoc], 'total_cases_per_million', 'plotCases');
    bubbleChart([defaultLoc]);

    // Redraw Deaths plot with selected countries
    $('#selLocation').change(function () {
        var selected = $('select#selLocation').val();
        var countries = selected.map(sel => data[sel]["location"]);
        if (countries.length > 3) {
            $('#locList').html(`Multiple locations selected`);
        }
        else {
            $('#locList').html(`${countries}`);
        }
        drawPlots(selected, 'total_deaths_per_million', 'plotDeaths');
        drawPlots(selected, 'total_cases_per_million', 'plotCases');
        bubbleChart(selected);
    });

    // Update Y-axis options once X is selected
    $('#selectX').change(function () {
        var selected_x = $('select#selectX').val();
        var y_options = [];
        features.forEach((feature) => { //iterate through and remove unwanted features
            if (removeFeatures.indexOf(feature) < 0 && feature != selected_x) { // if feature is not in removeFeatures list, add it as a select option
                y_options.push(feature);
            }
        });
        var y_filtered;
        y_options.forEach((option) => {
                y_filtered += `<option value=${option}>${option}</option>`;
        });
        $("#selectY").html("");
        $("#selectY").html(y_filtered);  
    });

    // Draw Custom Chart
    $('#customSubmit').click(function () {
        var selected = $('select#selLocation').val();
        var selected_x = $('select#selectX').val();
        var selected_y = $('select#selectY').val();
        bubbleCustom(selected, selected_x, selected_y);
    });
});