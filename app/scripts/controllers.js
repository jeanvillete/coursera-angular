'use strict';

angular.module( 'confusionApp' )
    .controller( 'MenuController', [ '$scope', 'menuService', function( $scope, menuService ){
        $scope.dishes = menuService.getDishes();
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
        var dish = menuService.getDish( parseInt( $stateParams.id, 10 ) );

        $scope.dish = dish;
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
            dish.comments.push( $scope.comment );
            $scope.comment = _comment();
            $scope.commentsForm.$setPristine();
        };
    }])
    .controller( 'IndexController', [ '$scope', 'menuService', 'corporateFactory', function( $scope, menuService, corporateFactory ){
        var dish = menuService.getDish( 0 );
        $scope.dish = dish;

        var promotion = menuService.getPromotion( 0 );
        $scope.promotion = promotion;

        var leader = corporateFactory.getLeader( corporateFactory.getLeaders().length - 1 );
        $scope.leader = leader;
    }])
    .controller( 'AboutController', [ '$scope', 'corporateFactory', function( $scope, corporateFactory ){
        var leaders = corporateFactory.getLeaders();
        $scope.leaders = leaders;
    }]);