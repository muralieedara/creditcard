/**
 * Main AngularJS Web Application
 */
var app = angular.module('testWebApp', [

]);


app.controller('testCtrl', function ( $scope, $location, $http ) {
   
  $scope.cc = '';
  $scope.cc_message = 'Invalid';
});

app.directive('creditCard', function() {

   var directive = {};
   directive.restrict = 'E';
   directive.controller = "testCtrl";
   directive.template = `
                          <div class="input-group">
                            <span class="input-group-addon">Credit Card</span>
                            <input type="text" class="form-control" ng-model="cc">
                          </div>
                        `;
    
   directive.compile = function(element, attributes) {

      
      //linkFunction is linked with each element with scope to get the element specific data.
      var linkFunction = function($scope, element, attributes) {

        $scope.$watch('cc', function(newValue, oldValue) {

            if(newValue != oldValue){
              if(valid_credit_card(newValue)){
                $scope.cc_message = "Valid";
              }else{
                $scope.cc_message = "Invalid";
              }
            }
                
        });
        // takes the form field value and returns true on valid number
        function valid_credit_card(value) {
          // accept only digits, dashes or spaces
          if (/[^0-9-\s]+/.test(value)) return false;

          // The Luhn Algorithm. It's so pretty.
          var nCheck = 0, nDigit = 0, bEven = false;
          value = value.replace(/\D/g, "");

          for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
          }

          return (nCheck % 10) == 0;
        }
      }
      return linkFunction;
   }
   return directive;
});