var fieldNames = ["future_store", "s2b", "wumart-scm", "wz", "zt_1", "zt_2"];

month_picker = function(div_id, refresh_fn) {
    "use strict";

    var month_brief = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                    "Aug", "Sep", "Oct", "Nov", "Dec"];

    month_brief = month_brief.slice(0, (new Date()).getMonth() + 1);

    d3.select("#" + div_id)
        .attr("class", "month_picker")
        .append("div")
            .attr("class", "month_header")
            .text("Data for Months:");

    d3.select("#" + div_id)
        .selectAll("input")
        .data(month_brief)
        .enter().append("div")
            .attr("class", "month_input")
            .insert("input")
                .property("type", "checkbox")
                .property("value", function(d,i){return 1 + i;})
                .text("hello")

    d3.selectAll(".month_input")
        .data(month_brief)
        .append("div")
        .attr("class", "month_brief")
        .text(function(d){return d;})
    

    var inputs = d3.selectAll(".month_input input").property("checked", "true")

    function picker(){
    }

    picker.get_selects = function(){
        var selects = [];

        d3.selectAll(".month_picker input").each(function(){
            if(this.checked) selects.push(+this.value);
        })

        return selects;
    }

    inputs.on("change", function(){
         //Make sure at least one month is selected
        if (picker.get_selects() == 0) {   
            d3.select(this).property("checked", "true");
        }

        refresh_fn();
    })

    return picker;
}

function filterDataByMonth(data, months){
    var newData = [];    

    for (var i = 0; i < data.length; i++){
        if (months.indexOf(+data[i].month) >= 0){
            for (var j = 0; j < newData.length; j++) {
                if (data[i]["user"] == newData[j]["user"]) {
                    for (var k in fieldNames) {
                        newData[j][fieldNames[k]] += +data[i][fieldNames[k]];
                    }
                    break;
                }
            }
            if (j == newData.length){
                newData.push({});
                newData[j]["user"] = data[i]["user"]
                for (var k in fieldNames) {
                    newData[j][fieldNames[k]] = +data[i][fieldNames[k]];
                }
            }
        }
    }

    //Calculate total
    for (i in newData){
        newData[i]["total"] = 0;
        for (j in fieldNames){
            newData[i]["total"] += newData[i][fieldNames[j]];
        }
    }

    newData.sort(function(a, b) { return b.total - a.total; });

    //Remove too small changes
    for (i = 0; i < newData.length; i++) {
        if (newData[i].total < 100) break;
    }
    newData = newData.slice(0, i);

    //Add "columns" property
    newData["columns"] = ["user"];
    for (i in fieldNames) newData["columns"].push(fieldNames[i]);

    //Add "users" property
    newData["users"] = []
    for (i = 0; i < newData.length; i++) {
         newData["users"].push(newData[i].user);
    }

    return newData;
}

function getProjectData(data) {
    var projectData = [];

    //data.sort(function(a,b){return a.user > b.user;})
    projectData["users"] = []
    for (i = 0; i < data.length; i++) {
        projectData["users"].push(data[i].user);
    }
    
    for (var i = 0; i < fieldNames.length; i++){
        projectData.push([]);
        k = projectData.length - 1;
        projectData[k].push(fieldNames[i]);

        values = []
        for (var j = 0; j < data.length; j++){
            values.push(data[j][fieldNames[i]])
        }
        projectData[k].push(values);
    }

    return projectData;
}