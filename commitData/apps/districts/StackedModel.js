var StackedModel = function (passedData) {
    var ex = {

    },
        allData,
        districtData,
        theMax,
        myNumbers = [],
        stackedData,
        sortedData,
        chartSeries = [],
        passed,
        advanced,
        failed,
        total,
        subjectTitle,
        // private fields

        // private methods
        doInitPage = function () {
            $.extend(ex, passedData);
            console.log("got here");
            allData = passedData;
            subjectTitle = "3 - Reading";
            doStarter('3-Reading', "SKYLINE HIGH SCHOOL");
            //doBindChangeSelector();
            //doBindClickSort();
        },
        doStarter = function (selectedSubject, selectedFeeder) {
            myNumbers = []; //reset
            chartSeries = [];
            var sub = selectedSubject.split("-");
            districtData = _.where(allData, {  'Subject': sub[1], 'Grade': sub[0] });
            //
            console.log(sub[0]);
            console.log(sub[1]);
            console.log("allData");
            console.log(allData);
            console.log("districtData");
            console.log(districtData);

            total = _.pluck(districtData, 'Sum of # of Students Tested 2013');
            var intTotal = _.map(total, function (num) {
                return parseInt(num);
            });
            theMax = _.max(intTotal);
            var TwoAll = _.pluck(districtData, 'Sum of Level II # of Students 2013');

            advanced = _.pluck(districtData, 'Sum of Level III # of Students 2013');
            failed = _.map(districtData, function (num) {
                // return num;
                return (parseInt(num['Sum of # of Students Tested 2013']) - parseInt(num['Sum of Level II # of Students 2013']));
                //return num['Sum of # of Students Tested 2013'];
            });
            passed = _.map(districtData, function (num) {
                // return num;

                var thisFail = parseInt(num['Sum of # of Students Tested 2013']) - parseInt(num['Sum of Level II # of Students 2013']);
                return (parseInt(num['Sum of # of Students Tested 2013']) - thisFail - parseInt(num['Sum of Level III # of Students 2013']));
                //return num['Sum of # of Students Tested 2013'];
            });
            var counter = 0;
            _.each(_.pluck(districtData, 'Campus'), function (i) {
                myNumbers.push({ 'failed': failed[counter], 'passed': passed[counter], 'final recommended': advanced[counter], 'total': intTotal[counter], 'Campus': i });
                counter++;
            });

            //console.log(passed);
            //console.log(districtData);


            //sortedData = _.pluck(districtData, 'Campus');
            //sortedData = _.sortBy(myNumbers, function (avatar) { return parseInt(avatar.failed); });
            chartSeries.push({ name: "Failed", data: _.pluck(myNumbers, 'failed'), color: 'DarkRed', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
            chartSeries.push({ name: "passed", data: _.pluck(myNumbers, 'passed'), color: 'Navy', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
            chartSeries.push({ name: "final recommended", data: _.pluck(myNumbers, 'final recommended'), color: 'Green', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });

            doCreateChart(chartSeries, districtData);
        },
        doCreateChart = function (chartSeries, theSortedData) {
            //console.log(chartSeries);
            //console.log(sortedData);
            //var ds = new kendo.data.DataSource({
            //    data: myObject
            //});
            var theHeight;

            if (theSortedData.length < 5) {

                theHeight = 300;
            } else {
                theHeight = theSortedData.length * 50;
            }

            $("#chart").kendoChart({
                //renderAs: "svg",
                //dataSource:ds,
                chartArea: {
                    //width: 200,
                    height: theHeight,
                    background: "transparent",
                    //height:800
                },
                title: {
                    text: "Failed, Passing, Final Recommended - " + subjectTitle,
                    font: "24px Times New Roman"
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "bar",
                    stack: true,
                    height: 40
                },
                series: chartSeries,
                valueAxis: {
                    max: theMax,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    },
                    title: {
                        text: 'Student Count'
                    },

                    labels: {
                        font: "12px Times New Roman"
                    }
                },
                categoryAxis: {
                    categories: _.pluck(theSortedData, 'Campus'),
                    majorGridLines: {
                        visible: false
                    },
                    title: {

                        //text: 'School',
                        //font: "18px Times New Roman"
                    },
                    labels: {
                        font: "12px Times New Roman"
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #",
                    color: 'white'
                }
            });
        },
        doBindChangeSelector = function () {
            $(".selector").change(function () {




                var selectedSubject = $("#subject option:selected").text();
                var selectedFeeder = $("#feeder option:selected").text();
                subjectTitle = selectedSubject;
                //if (id === 'feeder') {
                //    selectedFeeder = $("#" + this.id + " option:selected").text();
                //}
                //else if (id === 'subject')
                //{
                //    selectedSubject = $("#subject option:selected").text();
                //}
                doStarter(selectedSubject, selectedFeeder);
            });
        },
        doBindClickSort = function () {
            $('.sort').click(function () {
                var which = this.id;
                chartSeries = [];

                if (which == 'failed') {
                    sortedData = _.sortBy(myNumbers, function (avatar) { return parseInt(avatar.failed); });

                    chartSeries.push({ name: "Failed", data: _.pluck(sortedData, 'failed'), color: 'DarkRed', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    chartSeries.push({ name: "Passed", data: _.pluck(sortedData, 'passed'), color: 'Navy', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    chartSeries.push({ name: "final recommended", data: _.pluck(sortedData, 'final recommended'), color: 'Green', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                } else if (which == 'passed') {
                    sortedData = _.sortBy(myNumbers, function (avatar) { return parseInt(avatar.passed); });

                    chartSeries.push({ name: "Passed", data: _.pluck(sortedData, 'passed'), color: 'Navy', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    chartSeries.push({ name: "Failed", data: _.pluck(sortedData, 'failed'), color: 'DarkRed', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    chartSeries.push({ name: "final recommended", data: _.pluck(sortedData, 'final recommended'), color: 'Green', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });


                } else if (which == 'advanced') {
                    sortedData = _.sortBy(myNumbers, function (avatar) { return parseInt(avatar.advanced); });

                    chartSeries.push({ name: "final recommended", data: _.pluck(sortedData, 'final recommended'), color: 'Green', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    chartSeries.push({ name: "Passed", data: _.pluck(sortedData, 'passed'), color: 'Navy', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    chartSeries.push({ name: "Failed", data: _.pluck(sortedData, 'failed'), color: 'DarkRed', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                } else if (which == 'total') {
                    sortedData = _.sortBy(myNumbers, function (avatar) { return parseInt(avatar.total); });
                    //var total = _.pluck(sortedData, 'failed')
                    var totals = _.pluck(sortedData, 'total');
                    var intTotals = _.map(sortedData, function (num) {
                        return parseInt(num['total']);

                    });
                    //passed = _.map(districtData, function (num) {
                    //    // return num;

                    //    var thisFail = parseInt(num['Sum of # of Students Tested 2013']) - parseInt(num['Sum of Level II # of Students 2013']);
                    //    return (parseInt(num['Sum of # of Students Tested 2013']) - thisFail - parseInt(num['Sum of Level III # of Students 2013']));
                    //    //return num['Sum of # of Students Tested 2013'];
                    //});


                    var sum = _.reduce(_.pluck(sortedData, 'failed'), function (memo, num) { return memo + num; }, 0);
                    var sum2 = _.reduce(_.pluck(sortedData, 'passed'), function (memo, num) { return memo + num; }, 0);
                    var sum3 = _.reduce(_.pluck(sortedData, 'final recommended'), function (memo, num) { return memo + num; }, 0);
                    var sum4 = sum + sum2 + sum3;

                    var myObject = {};
                    $.extend(myObject, { theTotals: intTotals });
                    $.extend(myObject, { failed: _.pluck(sortedData, 'failed') });
                    $.extend(myObject, { passed: _.pluck(sortedData, 'passed') });
                    $.extend(myObject, { advanced: _.pluck(sortedData, 'final recommended') });


                    var myArray = [];
                    // _.each(

                    //chartSeries.push({ name: "Failed", data: _.pluck(sortedData, 'failed'), color: 'DarkRed', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    //chartSeries.push({ name: "Passed", data: _.pluck(sortedData, 'passed'), color: 'Navy', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#= parseInt(value/" + sum + " )# %", position: 'bottom' } });
                    //chartSeries.push({ name: "Advanced", data: _.pluck(sortedData, 'advanced'), color: 'Green', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#= parseInt(value/" + sum + " )# %", position: 'bottom' } });


                    ////chartSeries.push({ name: "Failed", field: "failed", color: 'DarkRed', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent',template: "#=dataItem#", color: 'white', position: 'bottom' } });
                    //chartSeries.push({ name: "Failed", field: "failed", color: 'DarkRed', opacity: .8});
                    //chartSeries.push({ name: "passsed", field: "passed", color: 'Navy', opacity: .8 });
                    //chartSeries.push({ name: "advanced", field: "advanced", color: 'Green', opacity: .8 });

                    chartSeries.push({ name: "Failed", data: _.pluck(sortedData, 'failed'), color: 'DarkRed', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    chartSeries.push({ name: "Passed", data: _.pluck(sortedData, 'passed'), color: 'Navy', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                    chartSeries.push({ name: "final recommended", data: _.pluck(sortedData, 'final recommended'), color: 'Green', opacity: .8, labels: { visible: true, opacity: .8, background: 'transparent', color: 'white', template: "#=value#", position: 'bottom' } });
                }
                doCreateChart(chartSeries, sortedData);
            });
        };
    return {
        initPage: doInitPage,
    };
};