angular.module("bassmonger.services").factory('bagsService',['Bags',function(Bags){
    var bagService = function(tournamentId){
        this.tournamentId = tournamentId;
        this.localBags = Lawnchair({name:'bags'},function(e){
            console.log('storage for bags opened');
        });

        this.addBag = function(bag){
            var self = this;
            this.localBags.get(this.tournamentId,function(bags){
                if(!bags){
                    bags = [];
                    bags.push(bag);
                    self.localBags.save({key:self.tournamentId, value:bags});
                } else {
                    bags.value.push(bag);
                    self.localBags.save({key:self.tournamentId, value:bags.value});
                }
            });
        };
    };
    return bagService;

}]);