app.controller('especialistasController', function ($scope, GeneralService, $location) {
    $scope.titulo = "Mi perfil";
    $scope.listaServiciosXUsuario = [];
    $scope.parametroServicio = localStorage.getItem('servicio');

    $scope.listarServiciosXUsuario = function () {
        var _parametros = {
            Opcion: 2,
            IdServ: $scope.parametroServicio
        }
        GeneralService.TypePost('tipoServicio', 'servicioXUsuario', _parametros)
            .success(function (response) {
                $scope.listaServiciosXUsuario = response.DtCollection;
                console.log(response.DtCollection)
            })
            .error(function (error) {

            });
    };

    $scope.mandarParamtros = function (su) {
        localStorage.removeItem('perfilUsuario');
        localStorage.setItem('perfilUsuario', su.ID_USU);
        $location.path('/perfil')
    }

    function iniciar() {
        console.log($scope.message);
        $scope.listarServiciosXUsuario();
    };
    iniciar();
});
