app.controller('01serviciosPerfilController', function ($location, $scope, GeneralService) {
    $scope.estudio = [];
    $scope.servicio = [];
    $scope.tipoServicio = [];
    $scope.typeServices = [];
    $scope.CheckBoxTipoServicio = [];

    $scope.listarServicio = function () {
        var _parametros = { Opcion: 1 }
        GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
            .success(function (response) { $scope.servicio = response.DtCollection; })
            .error(function (error) { console.log(error) });
    };
    $scope.listarTipoServicio = function () {
        var _parametros = { Opcion: 2 }
        GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
            .success(function (response) { $scope.tipoServicio = response.DtCollection; })
            .error(function (error) { console.log(error) });
    };

    $scope.listarCkeckBoxTipoServicio = function () {
        var _parametros = { Opcion: 3, IdUsu: $scope.usuario.ID_USU }
        GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
            .success(function (response) {
                for (var i = 0; i < response.DtCollection.length; i++) {
                    $scope['check' + response.DtCollection[i].ID_TIP_SERV] = true;
                }
            }).error(function (error) { });
    };

    $scope.confirmar01 = function () {
        $('.toast').css('display', 'none');
        $scope.typeServices = [];
        var contador = 0
        $.each($("input[name='servicios']:checked"), function () {
            $scope.typeServices.push($(this).val());
        });
        if ($scope.typeServices.length == []) {
            jsAlert('warning', '¡Aviso!', 'Debe seleccionar almenos un servicio', 4000, 'toast-top-full-width');
        }
        console.log($scope.typeServices);
        for (var i = 0; i < $scope.typeServices.length; i++) {
            var _parametros = {
                Opcion: 4,
                IdUsu: $scope.usuario.ID_USU,
                IdTipServ: $scope.typeServices[i]
            }
            GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
                .success(function (response) {
                    if (response.cMsj == "OK") {
                        contador = contador + 1
                        console.log("contador" + contador);
                        if ($scope.typeServices.length == contador) {
                            var _parametros = { Opcion: 5, IdUsu: $scope.usuario.ID_USU }
                            GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
                                .success(function (response) {
                                    if ($location.path() == '/home/miPerfil/servicios') {
                                        $location.path('/home/miPerfil/servicios');
                                    }
                                    if ($location.path() == '/home/registroPerfil/1') {
                                        $location.path('/home/registroPerfil/2');
                                    }
                                })
                        }
                    }
                }).error(function (error) { });
        }
    };
    $scope.mostrarOcultarButones = function () {
        if ($location.path() == '/home/miPerfil/servicios') {
            $scope.groupButton01 = true;
            $scope.groupButton02 = false;
        }
        if ($location.path() == '/home/registroPerfil/1') {
            $scope.groupButton01 = false;
            $scope.groupButton02 = true;
        }
    }
    function iniciar() {   
        $scope.listarServicio();
        $scope.listarTipoServicio();
        $scope.listarCkeckBoxTipoServicio();
        $scope.mostrarOcultarButones();
    }
    iniciar();
});
