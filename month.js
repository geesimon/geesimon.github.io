month_picker = function(div_id, refresh_fn) {
    "use strict";

    var month_brief = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                    "Aug", "Sep", "Oct", "Nov", "Dec"];

    month_brief = month_brief.slice(0, (new Date()).getMonth() + 1);

    d3.select("#" + div_id)
        .attr("class", "month_picker")
        .append("div")
            .attr("class", "month_header")
            .text("Data from Months:");

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
        refresh_fn();
    })

    return picker;
}

function sliceDataByMonth(data, months){
    var newData = [];
    for (i = 0; i < data.length; i++){
        record = data[i];
        if (record.month in months){
            for (j = 0; j < newData.length(); j++) {
                if (record[i]["user"] == newData[j]["user"]) {
                    for (var key in record[i]){
                        newData[j][key] += +record[i][key];
                    }
                }
            }
        }
    }

    return data;
}