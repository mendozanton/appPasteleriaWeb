app.controller('04caracteristicasPerfilController', function ($scope, GeneralService, $location) {
    $scope.listaCaracteristica = [];
    $scope.listaCkeckBoxCaracteristica = [];
    $scope.typeServices = [];

    $scope.listarCaracteristica = function () {
        var _parametros = { Opcion: 1 }
        GeneralService.TypePost('adicional', 'asignarAdicionalUsuario', _parametros)
            .success(function (response) {
                $scope.listaCaracteristica = response.DtCollection;
                console.log($scope.listaCaracteristica);
            })
            .error(function (error) { console.log(error) });
    };

    $scope.listarCkeckBoxCaracteristica = function () {
        var _parametros = { Opcion: 2, IdUsu: $scope.usuario.ID_USU }
        GeneralService.TypePost('adicional', 'asignarAdicionalUsuario', _parametros)
            .success(function (response) {
                for (var i = 0; i < response.DtCollection.length; i++) {
                    $scope['checkAdicional' + response.DtCollection[i].ID_ADI] = true;
                }
            }).error(function (error) { });
    };
    $scope.confirmar04 = function () {
        $('.toast').css('display', 'none');
        $scope.typeServices = [];
        var contador = 0
        $.each($("input[name='adicional']:checked"), function () {
            $scope.typeServices.push($(this).val());
        });
        if ($scope.typeServices.length == []) {
            jsAlert('warning', '¡Aviso!', 'Debe seleccionar almenos una caracteristica', 4000, 'toast-top-full-width');
        }
        console.log($scope.typeServices);
        for (var i = 0; i < $scope.typeServices.length; i++) {
            var _parametros = {
                Opcion: 3,
                IdUsu: $scope.usuario.ID_USU,
                IdAdi: $scope.typeServices[i]
            }
            GeneralService.TypePost('adicional', 'asignarAdicionalUsuario', _parametros)
                .success(function (response) {
                    if (response.cMsj == "OK") {
                        contador = contador + 1
                        console.log("contador" + contador);
                        if ($scope.typeServices.length == contador) {
                            var _parametros = { Opcion: 4, IdUsu: $scope.usuario.ID_USU }
                            GeneralService.TypePost('adicional', 'asignarAdicionalUsuario', _parametros)
                                .success(function (response) {
                                    if ($location.path() == '/home/miPerfil/caracteristicas') {
                                        $location.path('/home/miPerfil/caracteristicas');
                                    }
                                    if ($location.path() == '/home/registroPerfil/4') {
                                        $location.path('/home/registroPerfil/6');
                                    }
                                })
                        }
                    }
                }).error(function (error) { });
        }
    }
    $scope.anterior04 = function () {
        $location.path('/home/registroPerfil/3')
    }

    $scope.mostrarOcultarButones = function () {
        if ($location.path() == '/home/miPerfil/caracteristicas') {
            $scope.groupButton01 = true;
            $scope.groupButton02 = false;
        }
        if ($location.path() == '/home/registroPerfil/4') {
            $scope.groupButton01 = false;
            $scope.groupButton02 = true;
        }
    }
    function iniciar() {
        $scope.listarCaracteristica();
        $scope.listarCkeckBoxCaracteristica();
        $scope.mostrarOcultarButones();
    }
    iniciar();
});
