app.controller('mntSolicitudController', function ($scope, GeneralService) {
    $scope.titulo = "Mis Solicitudes";
    $scope.listaSolicitudes = [];
    $scope.estado = [{ id: 1, nombre: 'Activo' }, { id: 2, nombre: 'Inactivo' }];

    $scope.listarSolicitudes = function () {
        var _parametros = {
            Opcion: 4,
            IdUsuSol: $scope.usuario.ID_USU
        }
        console.dir(_parametros)
        GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
            .success(function (response) {
                $scope.listaSolicitudes = response.DtCollection;
                console.log($scope.listaSolicitudes)
            })
            .error(function (error) {

            });
    };
    

    $scope.listarSolicitudesFinalizadasM = function () {
        var _parametros = {
            Opcion: 8,
            IdUsuSol: $scope.usuario.ID_USU
        }
        console.dir(_parametros)
        GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
            .success(function (response) {
                $scope.listaSolicitudesFinalizadasM = response.DtCollection;
                console.log($scope.listaSolicitudesFinalizadasM);
            })
            .error(function (error) {

            });
    };


    function initController() {
        $scope.listarSolicitudes();
        $scope.listarSolicitudesFinalizadasM();
    }
   
    
    initController();
});
