'use strict';

angular.module( 'confusionApp' )
    .controller( 'MenuController', [ '$scope', 'menuService', function( $scope, menuService ){
        
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        $scope.dishes = [];
        menuService.getDishes()
            .then( function( response ){
                $scope.dishes = response.data;
                $scope.showMenu = true;
            }, function( response ) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.tab = 1;
        $scope.select = function( setTab ) {
            $scope.tab = setTab;

            if ( setTab === 2 ) {
                $scope.fillText = 'appetizer';
            } else if ( setTab === 3 ) {
                $scope.fillText = 'mains';
            } else if ( setTab === 4 ) {
                $scope.fillText = 'dessert';
            } else {
                $scope.fillText = '';
            }
        };

        $scope.isSelected = function( checkTab ) {
            return $scope.tab === checkTab;
        };
        
        $scope.fillText = '';

        $scope.showDetails = false;
        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])
    .controller( 'ContactController', [ '$scope', function( $scope ){
        $scope._feedback = function() {
            return {
                mychannel : "",
                firstName : "",
                lastName : "",
                agree : false,
                email : ""
            };
        };

        $scope.feedback = $scope._feedback();

        var channels = [
            { value : "tel", label:"Tel." },
            { value : "Email", label:"Email" }
        ];
        $scope.channels = channels;

        $scope.invalidChannelSelection = false;
    }])
    .controller( 'FeedbackController', [ '$scope', function( $scope ){
        $scope.sendFeedback = function() {
            console.log( $scope.feedback );
            if ( $scope.feedback.agree && ( !$scope.feedback.mychannel || $scope.feedback.mychannel === '' ) ) {
                $scope.invalidChannelSelection = true;
                console.log( 'incorrect' );
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = $scope._feedback();
                $scope.feedbackForm.$setPristine();
                console.log( 'correct' );
            }
        };
    }])
    .controller( 'DishDetailController', [ '$scope', '$stateParams', 'menuService', function( $scope, $stateParams, menuService ){
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        menuService.getDish( parseInt( $stateParams.id, 10 ) )
            .then( function( response ){
                $scope.dish = response.data;
                $scope.showDish = true;
            }, function( response ) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.sortby = '';
        
        var _comment = function() {
            return {
                author : '',
                rating : 5,
                comment : '',
                date : new Date()
            };
        };

        $scope.comment = _comment();

        $scope.addComment = function() {
            $scope.dish.comments.push( $scope.comment );
            $scope.comment = _comment();
            $scope.commentsForm.$setPristine();
        };
    }])
    .controller( 'IndexController', [ '$scope', 'menuService', 'corporateFactory', function( $scope, menuService, corporateFactory ){
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        menuService.getDish( 0 )
            .then( function( response ){
                $scope.dish = response.data;
                $scope.showDish = true;
            }, function( response ) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        var promotion = menuService.getPromotion( 0 );
        $scope.promotion = promotion;

        var leader = corporateFactory.getLeader( corporateFactory.getLeaders().length - 1 );
        $scope.leader = leader;
    }])
    .controller( 'AboutController', [ '$scope', 'corporateFactory', function( $scope, corporateFactory ){
        var leaders = corporateFactory.getLeaders();
        $scope.leaders = leaders;
    }]);