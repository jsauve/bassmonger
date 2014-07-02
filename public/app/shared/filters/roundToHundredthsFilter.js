angular.module('bassmonger.filters',[]).filter('roundToHundredths',[function(){
    return function(number){
        if(angular.isString(number)){
            return parseFloat(number).toFixed(2);
        }
        if(number) {
            return number.toFixed(2);
        }
        return undefined;
    };
}]);
