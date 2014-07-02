angular.module('bassmonger.services',[])
    .factory('scoringService',[function(){
        var scoringService = function(){

            };
        scoringService.prototype.determineWinnersByBags = function(results){
            var copyOfResults = results.slice(0);

            var biggestBass = _.max(copyOfResults,function(bag){
                return bag.bigBass.weight;
            });

            biggestBass.isBigBassWinner = true;
            biggestBass.class = 'bigBass';
            copyOfResults = _.without(copyOfResults,biggestBass);
            var first = copyOfResults[0];
            var second = copyOfResults[1];
            var third = copyOfResults[2];
            var fourth = copyOfResults[3];

            if(first && first.totalWeight > 0){
                first.class = 'firstPlace';
                first.isFirstPlace = true;
            }
            if(second && second.totalWeight > 0){
                second.class='secondPlace';
                second.isSecondPlace=true;
            }
            if(third && third.totalWeight > 0){
                third.class = 'thirdPlace';
                third.isThirdPlace=true;
            }
            if(fourth && fourth.totalWeight > 0){
                fourth.class = 'fourthPlace';
                fourth.isFourthPlace=true;
            }
            copyOfResults.push(biggestBass);
            return _.sortBy(copyOfResults,'totalWeight').reverse();
        };

        scoringService.prototype.determineWinnersByResults = function(results){
            var copyOfResults = results.slice(0);

            var biggestBass = _.max(copyOfResults,'bigBass');

            biggestBass.isBigBassWinner = true;
            biggestBass.class = 'bigBass';
            copyOfResults = _.without(copyOfResults,biggestBass);
            var first = copyOfResults[0];
            var second = copyOfResults[1];
            var third = copyOfResults[2];
            var fourth = copyOfResults[3];

            if(first && first.total > 0){
                first.class = 'firstPlace';
                first.isFirstPlace = true;
            }
            if(second && second.total > 0){
                second.class='secondPlace';
                second.isSecondPlace=true;
            }
            if(third && third.total > 0){
                third.class = 'thirdPlace';
                third.isThirdPlace=true;
            }
            if(fourth && fourth.total > 0){
                fourth.class = 'fourthPlace';
                fourth.isFourthPlace=true;
            }
            copyOfResults.push(biggestBass);

            return _.sortBy(copyOfResults,'total').reverse();
        };

        var service = new scoringService();

        return function(){
            return service;
        };
    }])
    ;