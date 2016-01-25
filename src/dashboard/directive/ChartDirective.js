angular.module('Angello.Dashboard')
    .directive('chart', function () {
        var parseDataForCharts = function (sourceArray, sourcePropery, referenceArray, referenceProperty) {
            var data = [];

            referenceArray.each(function (r) {
                var count = sourceArray.count(function (s) {
                    return s[sourcePropery] == r[referenceProperty];
                });

                data.push([r[referenceProperty], count]);
            });

            return data;
        };

        var link = function (scope, element, attrs) {
            scope.$watch('sourceArray', function () {
                scope.data = parseDataForCharts(
                    scope.sourceArray,
                    attrs['sourceProperty'],
                    scope.referenceArray,
                    attrs['referenceProperty']
                );

                if (element.is(':visible')) {
                    $.plot(element, [scope.data], {
                        series: {bars: {show: true, barWidth: 0.6, align: "center"}},
                        xaxis: {mode: "categories", tickLength: 0}
                    });
                }
            });
        };

        return {
            restrict: 'A',
            link: link,
            scope: {
                sourceArray: '=',
                referenceArray: '='
            }
        }
    });
