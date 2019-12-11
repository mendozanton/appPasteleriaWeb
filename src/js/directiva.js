/* ------------------------------------------------------------------------*/
/* SISTEMA     : Ficha Postulante
/* SUBSISTEMA  : Ficha Postulante
/* NOMBRE      : RegistrarDirective.js
/* DESCRIPCION : Repositorio de directivas 
/* AUTOR       : Michael Trujillo Sulca
/* FECHA CREACIÓN : 08/08/2017
/* ------------------------------------------------------------------------*/
/* FECHA MODIFICACION  EMPLEADO    

/* ------------------------------------------------------------------------*/
angular.module("validadorNumerico", []);
/* Validar inputs para aceptar solo números enteros. */
angular.module("validadorNumerico")
    .directive('soloEnteros', function () {
        var regexSoloEnteros = /^\d+$/;
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                element.on('keypress', function (event) {
                    if (event.which != 13) {
                        var esEntero = /^\d+$/.test(String.fromCharCode(event.which));

                        if (!esEntero)
                            event.preventDefault();
                    }
                });

                element.on('paste', function (event) {
                    var textoCopiado = '';
                    var tipoData = 'Text';
                    var clipboardData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;

                    if (!window.clipboardData)
                        tipoData = 'text/plain';

                    textoCopiado = clipboardData.getData(tipoData);

                    var esEntero = regexSoloEnteros.test(textoCopiado);
                    if (!esEntero)
                        event.preventDefault();
                });

                function eliminarCaracteres() {
                    var inputValue = element.val();
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');

                    if (transformedInput !== inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                }
            }
        };
    });

/* Validar inputs para aceptar solo números. */
angular.module("validadorNumerico")
    .directive('soloDigitos', ["$filter", function ($filter) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                element.on('keypress', function (event) {
                    if (event.which != 13) {
                        var caracter = String.fromCharCode(event.which);
                        var esDigitoValido = /^[\d.]+$/.test(caracter);

                        if (!esDigitoValido)
                            event.preventDefault();
                    }
                });

                element.on('paste', function (event) {
                    var textoCopiado = '';

                    if (window.clipboardData && window.clipboardData.getData) { // IE
                        textoCopiado = window.clipboardData.getData('Text');
                    } else if (event.clipboardData && event.clipboardData.getData) {
                        textoCopiado = event.clipboardData.getData('text/plain');
                    }

                    if (isNaN(textoCopiado))
                        event.preventDefault();
                });
            }
        };
    }]);

app.directive('uppercaseOnly', [
    function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                element.on('keypress', function (e) {
                    var char = e.char || String.fromCharCode(e.charCode);
                    if (!/^[A-Z0-9 ]$/i.test(char)) {
                        e.preventDefault();
                        return false;
                    }
                });

                function parser(value) {
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }
                    var formatedValue = value.toUpperCase();
                    if (ctrl.$viewValue !== formatedValue) {
                        ctrl.$setViewValue(formatedValue);
                        ctrl.$render();
                    }
                    return formatedValue;
                }

                function formatter(value) {
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }
                    return value.toUpperCase();
                }

                ctrl.$formatters.push(formatter);
                ctrl.$parsers.push(parser);
            }
        };
    }
]);
//var esDigitoValido = /^[\d.]+$/.test(caracter);
app.directive('soloCaracteres', function () {
    return {
        require: 'ngModel',

        link: function (scope, element, attrs, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, '');

                if (transformedInput !== text) {

                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);

        }
    };
})

app.directive('soloCaracteresDigitos', function () {
    return {
        require: 'ngModel',

        link: function (scope, element, attrs, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s\d]/g, '');

                if (transformedInput !== text) {

                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);

        }
    };
})

app.directive('uploadFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var file_uploaded = $parse(attrs.uploadFile);

            element.bind('change', function () {
                scope.$apply(function () {
                    file_uploaded.assign(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.directive('uppercaseOnly', [
  function () {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, element, attrs, ctrl) {
              element.on('keypress', function (e) {
                  var char = e.char || String.fromCharCode(e.charCode);
                  if (!/^[A-Z0-9 ]$/i.test(char)) {
                      e.preventDefault();
                      return false;
                  }
              });

              function parser(value) {
                  if (ctrl.$isEmpty(value)) {
                      return value;
                  }
                  var formatedValue = value.toUpperCase();
                  if (ctrl.$viewValue !== formatedValue) {
                      ctrl.$setViewValue(formatedValue);
                      ctrl.$render();
                  }
                  return formatedValue;
              }

              function formatter(value) {
                  if (ctrl.$isEmpty(value)) {
                      return value;
                  }
                  return value.toUpperCase();
              }

              ctrl.$formatters.push(formatter);
              ctrl.$parsers.push(parser);
          }
      };
  }
]);

angular.module('utils.autofocus', [])

.directive('autofocus', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element) {
            $timeout(function () {
                $element[0].focus();
            });
        }
    }
}]);

var loadingMsgDirective = angular.module('loadingMsgDirective', []);

loadingMsgDirective.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope) {
        return {
            'request': function (config) {
                $rootScope.$broadcast('REQUEST_START');
                return config;
            },
            'response': function (response) {
                $rootScope.$broadcast('REQUEST_END');

                return response;
            },
            'responseError': function (rejection) {
                $rootScope.$broadcast('REQUEST_END');

                return $q.reject(rejection);
            }
        };
    });
}]);

loadingMsgDirective.directive('loadingMsg', [function () {
    var vtemplate = '<div id="bloquea" class="cargando"  ng-show="pending" style="display:block">';
    vtemplate += '<div style="text-align=center;margin-top: 20%">';
    vtemplate += '<img  alt="Espere..." src="src/css/images/_Loading_.gif" height="30" width="30" />';
    vtemplate += ' <label style="color:white;    text-shadow: 0 0 2px black;">Cargando...</label>';
    vtemplate += '</div>';
    vtemplate += '</div>';

    return {
        template: vtemplate,

        scope: {},
        link: function (scope, element, attrs) {
            scope.pending = 0;

            scope.$on('REQUEST_START', function () {
                scope.pending += 1;
            });

            scope.$on('REQUEST_END', function () {
                scope.pending -= 1;
            });
        }
    };
}]);


app.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);

        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        })
    }

    return {
        link: fn_link
    }

}]);

app.directive('uploadFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var file_uploaded = $parse(attrs.uploadFile);

            element.bind('change', function () {
                scope.$apply(function () {
                    file_uploaded.assign(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                var file = files[0];
                scope.file = file ? file.name : undefined;
                scope.$apply();
            });
        }
    };
});

app.directive('allowDecimalNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9\.]/g, '')
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }
                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    // numbers  
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows  
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    //numbers  
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number  
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot  
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});

app.directive('expand', function () {
    function link(scope, element, attrs) {
        scope.$on('onExpandAll', function (event, args) {
            scope.expanded = args.expanded;
        });
    }
    return {
        link: link
    };
});
