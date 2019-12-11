app.controller('homeController', function ($scope, GeneralService, $localStorage, $location) {
    $scope.ListarGrupos = [];
    $scope.ListarMenus = [];
    $scope.usuario = JSON.parse(localStorage.getItem('datos'));  


    $scope.listarGrupo = function () {
        var _parametros = {
            Opcion: 1,
            IdRol: $scope.usuario.ID_ROL,
            IdPer: $scope.usuario.ID_PER
        }
        console.dir(_parametros);
        GeneralService.TypePost('menu', 'lstMenu', _parametros)
            .success(function (response) {
                if (response.nMsjCode == 200) {
                    $scope.ListarGrupos = response.DtCollection;
                    console.log($scope.ListarGrupos);
                }
            })
            .error(function (error) {
                jsAlert('error', 'Error', error, 4000,'toast-top-full-width');
            });
    };

    $scope.listarMenu = function () {
        var _parametros = {
            Opcion: 2,
            IdRol: $scope.usuario.ID_ROL,
            IdPer: $scope.usuario.ID_PER
        }
        GeneralService.TypePost('menu', 'lstMenu', _parametros)
            .success(function (response) {
                if (response.nMsjCode == 200) {
                    $scope.ListarMenus = response.DtCollection;
                    console.log($scope.ListarMenus);
                }
                else {
                    jsAlert('error', 'Error', response.cMsjDetaill, 0, 'toast-top-full-width', true);
                    if (response.cMsjDetaill == 'Su perfil no tiene menus asignados... Comuniquese con su administrador.') {
                        $scope.logaut();
                    }
                }
            })
            .error(function (error) {
                jsAlert('error', 'Error', error, 5000);
            });
    };
    
    function iniciar() {
        $scope.listarGrupo();
        $scope.listarMenu();
        if ($scope.usuario.ID_EST_USU == 4) {
            $location.path('/home/registroPerfil/1');
        }
    };
    iniciar();

});

