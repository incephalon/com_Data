var BarModel = function (passedData) {
    var ex = {

    },
        // private fields
        CSVData,
        threeMath,
        threeRead,
        fourMath,
        fourRead,
        fourWriting,
        fiveMath,
        fiveRead,
        fiveScience,
        fiveWriting,
        elementarySchools,
        allData,
        districtData,
        chartSeries = [],
        schoolsHere = [],
        chunks,
        allchunks,
        // private methods
        doInitPage = function () {
            //$.extend(ex, settings);
            //allData = settings.staarData;

            //districtData = _.where(passedData, { 'Short District': 'DALLAS ISD');
            doGetNumbers(passedData.data);
            doBindSelector();
        },
        doGetNumbers = function (districts) {
            var howMany = 7;

            chartSeries = [];

            var theseSchools = _.pluck(_.where(districts, { Subject: 'Math', Grade: "3" }), 'Campus');
            var myObjects = [];
            var counter = 0;
            var runningTotal = 0;

            //f==5 now
            var remainder = theseSchools.length % 5;
            chunks = parseInt(theseSchools.length / 5);
            console.log("chunks: " + chunks.toString());
            allchunks = chunks;
            if (remainder > 0) {
                allchunks += 1;
            }

            for (var i = 0; i < allchunks; i++) {
                //add span here
                $('#myContent').append("<div id=\"example" + i + "\" class=\"k-content\"><div class=\"chart-wrapper\"><div id=\"chart" + i + "\"></div></div>");
            }
            schoolsHere = [];

            var chartCounter = 0;
            for (var i = 0; i < chunks * 5; i = i + 5) {
                myObjects = [];
                schoolsHere = [];
                chartSeries = [];

                for (var c = i; c < i + 5; c++) {

                    myObjects.push({
                        Campus: theseSchools[i],
                        threeMath: _.pluck(_.where(districts, { Subject: 'Math', Grade: "3", Campus: theseSchools[c] }), 'Actual vs Expected 2013 Adv'),
                        fourMath: _.pluck(_.where(districts, { Subject: 'Math', Grade: "4", Campus: theseSchools[c] }), 'Actual vs Expected 2013 Adv'),
                        fiveMath: _.pluck(_.where(districts, { Subject: 'Math', Grade: "5", Campus: theseSchools[c] }), 'Actual vs Expected 2013 Adv'),
                        threeReading: _.pluck(_.where(districts, { Subject: 'Reading', Grade: "3", Campus: theseSchools[c] }), 'Actual vs Expected 2013 Adv'),
                        fourReading: _.pluck(_.where(districts, { Subject: 'Reading', Grade: "4", Campus: theseSchools[c] }), 'Actual vs Expected 2013 Adv'),
                        fiveReading: _.pluck(_.where(districts, { Subject: 'Reading', Grade: "5", Campus: theseSchools[c] }), 'Actual vs Expected 2013 Adv'),
                        fourWriting: _.pluck(_.where(districts, { Subject: 'Writing', Grade: "4", Campus: theseSchools[c] }), 'Actual vs Expected 2013 Adv'),
                        fiveScience: _.pluck(_.where(districts, { Subject: 'Science', Grade: "5", Campus: theseSchools[c] }), 'Actual vs Expected 2013 Adv'),
                    });
                    schoolsHere.push(theseSchools[c]);
                    console.log(theseSchools[c]);
                }

                chartSeries.push({ name: "3rd Grade Mathematics", data: _.pluck(myObjects, 'threeMath'), color: 'blue', opacity: .2 });
                chartSeries.push({ name: "4rd Grade Mathematics", data: _.pluck(myObjects, 'fourMath'), color: 'blue', opacity: .6 });
                chartSeries.push({ name: "5th Grade Mathematics", data: _.pluck(myObjects, 'fiveMath'), color: 'blue' });
                chartSeries.push({ name: "3rd Grade Reading", data: _.pluck(myObjects, 'threeReading'), color: 'red', opacity: .2 });
                chartSeries.push({ name: "4th Grade Reading", data: _.pluck(myObjects, 'fourReading'), color: 'red', opacity: .6 });
                chartSeries.push({ name: "5th Grade Reading", data: _.pluck(myObjects, 'fiveReading'), color: 'red' });
                chartSeries.push({ name: "4th Grade Writing", data: _.pluck(myObjects, 'fourWriting'), color: 'orange', opacity: .6 });
                chartSeries.push({ name: "5th Grade Science", data: _.pluck(myObjects, 'fiveScience'), color: 'teal' });

                console.log("chartSeries");
                console.log(chartSeries);
                doCreateChart(chartCounter, chartSeries);
                chartCounter++;
            }

            chartSeries = [];
            schoolsHere = [];
            myObjects = [];

            if (remainder > 0) {
                for (var i = chunks * 5; i < (chunks * 5) + remainder; i++) {

                    myObjects.push({
                        Campus: theseSchools[i],
                        threeMath: _.pluck(_.where(districts, { Subject: 'Math', Grade: "3", Campus: theseSchools[i] }), 'Actual vs Expected 2013 Adv'),
                        fourMath: _.pluck(_.where(districts, { Subject: 'Math', Grade: "4", Campus: theseSchools[i] }), 'Actual vs Expected 2013 Adv'),
                        fiveMath: _.pluck(_.where(districts, { Subject: 'Math', Grade: "5", Campus: theseSchools[i] }), 'Actual vs Expected 2013 Adv'),
                        threeReading: _.pluck(_.where(districts, { Subject: 'Reading', Grade: "3", Campus: theseSchools[i] }), 'Actual vs Expected 2013 Adv'),
                        fourReading: _.pluck(_.where(districts, { Subject: 'Reading', Grade: "4", Campus: theseSchools[i] }), 'Actual vs Expected 2013 Adv'),
                        fiveReading: _.pluck(_.where(districts, { Subject: 'Reading', Grade: "5", Campus: theseSchools[i] }), 'Actual vs Expected 2013 Adv'),
                        fourWriting: _.pluck(_.where(districts, { Subject: 'Writing', Grade: "4", Campus: theseSchools[i] }), 'Actual vs Expected 2013 Adv'),
                        fiveScience: _.pluck(_.where(districts, { Subject: 'Science', Grade: "5", Campus: theseSchools[i] }), 'Actual vs Expected 2013 Adv'),
                    });
                    schoolsHere.push(theseSchools[i]);
                }

                chartSeries.push({ name: "3rd Grade Math", data: _.pluck(myObjects, 'threeMath'), color: 'blue', opacity: .2 });
                chartSeries.push({ name: "4rd Grade Math", data: _.pluck(myObjects, 'fourMath'), color: 'blue', opacity: .6 });
                chartSeries.push({ name: "5th Grade Math", data: _.pluck(myObjects, 'fiveMath'), color: 'blue' });
                chartSeries.push({ name: "3rd Grade Reading", data: _.pluck(myObjects, 'threeReading'), color: 'red', opacity: .2 });
                chartSeries.push({ name: "4th Grade Reading", data: _.pluck(myObjects, 'fourReading'), color: 'red', opacity: .6 });
                chartSeries.push({ name: "5th Grade Reading", data: _.pluck(myObjects, 'fiveReading'), color: 'red' });
                chartSeries.push({ name: "4th Grade Writing", data: _.pluck(myObjects, 'fourWriting'), color: 'orange', opacity: .6 });
                chartSeries.push({ name: "5th Grade Science", data: _.pluck(myObjects, 'fiveScience'), color: 'teal' });

                doCreateChart(allchunks - 1, chartSeries);
            }
        },
        doCreateChart = function (i, thisChartSeries) {

            var myWidth = i === 4 ? $(document).width() / 2 : undefined;

            if (myWidth === undefined) {
                console.log("undefined");
            }
            else {
                console.log("defined");
            }

            $("#chart" + i).kendoChart({
                chartArea: {
                    height: 400,
                    //width:400,
                    width: myWidth
                },
                title: {
                    text: "Dallas ISD Achieved vs. Expected Final Recommended Rates by School"
                },
                legend: {
                    position: "top"
                },
                seriesDefaults: {
                    type: "column",
                    width: 5
                },
                series: thisChartSeries,
                valueAxis: {
                    labels: {
                        format: "{n2}%",
                        template: "#= value *100 #"
                    },
                    //max: 1,
                    //min:-1,
                    line: {
                        visible: false
                    },
                    axisCrossingValue: 0
                },
                categoryAxis: {
                    categories: schoolsHere,
                    line: {
                        visible: false
                    },
                    labels: {
                        padding: { top: 80 },
                        //rotation: -75
                    }
                },
                tooltip: {
                    visible: true,
                    //format: '#=kendo.toString(value, "n0")#',
                    //format: "{p2}%", //kendo.toString("{0}", "p0"), //22 %,
                    //                    template: "#= series.name #: #= value *100 #",
                    //template: '#=kendo.format("{0:0}", value)#',
                    //template:  '#=kendo.toString(value, "p")#',
                    //format:"{0}%",
                    template: '#= series.name #: #= kendo.toString(value*100, "n2")# %',
                    color: 'white'
                }
            });
        },
        doBindSelector = function () {
            $(".selector").change(function () {
                $('#myContent').html("");//clear old stuff
                var theSelected = $("#feeder  option:selected").text();
                districtData = _.where(allData, { 'Feeder Pattern': theSelected });
                doGetNumbers(districtData);
            });
        };
    return {
        initPage: doInitPage,
    };
};