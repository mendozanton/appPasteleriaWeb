app.controller('miPerfilController', function ($scope, GeneralService, $location, $localStorage) {
    $scope.servicio = 0;
    $scope.caracteristica = 0;
    $scope.estudio = 0;
    var contadorServicio = 0; 
    var contadorEstudio = 0;
    var contadorCaracteristica = 0;
    var idRol = _IdRol;
    var idPerfilCliente = _IdPerfilCliente;
    var idPerfilEspecialista = _IdPerfilEspecialista;
    $scope.perfilOcultar = false;
    $scope.listarCkeckBoxTipoServicioContador = function () {
        var _parametros = { Opcion: 3, IdUsu: $scope.usuario.ID_USU }
        GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
            .success(function (response) {
                for (var i = 0; i < response.DtCollection.length; i++) {
                    contadorServicio = contadorServicio + 1;
                }
                $scope.servicio = contadorServicio;
            }).error(function (error) { });
    };

    $scope.listarCkeckBoxCaracteristicaContador = function () {
        var _parametros = { Opcion: 2, IdUsu: $scope.usuario.ID_USU }
        GeneralService.TypePost('adicional', 'asignarAdicionalUsuario', _parametros)
            .success(function (response) {
                for (var i = 0; i < response.DtCollection.length; i++) {
                    contadorCaracteristica = contadorCaracteristica + 1;
                }
                $scope.caracteristica = contadorCaracteristica;
            }).error(function (error) { });
    };

    $scope.listarEstudioContador = function () {
        var _parametros = {
            Opcion: 4,
            IdUsu: $scope.usuario.ID_USU
        }
        GeneralService.TypePost('estudio', 'mntEstudio', _parametros)
            .success(function (response) {
                for (var i = 0; i < response.DtCollection.length; i++) {
                    contadorEstudio = contadorEstudio + 1;
                }
                $scope.estudio = contadorEstudio;
            })
            .error(function (error) { });
    };

    $scope.ocultarPerfil = function () {
        if ($scope.usuario.ID_ROL == idRol && $scope.usuario.ID_PER == idPerfilEspecialista) {
            $scope.perfilOcultar = true;
        }
    }

    function iniciar() {
        $scope.listarCkeckBoxTipoServicioContador();
        $scope.listarEstudioContador();
        $scope.listarCkeckBoxCaracteristicaContador();
        $scope.ocultarPerfil();
    }
    iniciar();
});
