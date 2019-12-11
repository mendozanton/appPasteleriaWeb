app.controller('inicioController', function ($scope, $location, GeneralService, $localStorage) {
    $scope.usuario = JSON.parse(localStorage.getItem('datos'));
    $scope.ListarGrupos = [];
    $scope.ListarMenus = [];
    $scope.servicio = []; 
    $scope.tipoServicio = [];
    $scope.pregunta = [];
    $scope.showLogin = true;    
    $scope.showRegister = true;
    $scope.showIntranet = false;
    $scope.showLoginLandingPage = true;
    $scope.pregunta01 = true;
    $scope.pregunta02 = true;

    $scope.listarServicio = function () {
        var _parametros = { Opcion: 1 }
        GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
            .success(function (response) { $scope.servicio = response.DtCollection; console.log(response) })
            .error(function (error) { console.log(error) });
    };

    $scope.listarTipoServicio = function () {
        var _parametros = { Opcion: 2 }
        GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
            .success(function (response) { $scope.tipoServicio = response.DtCollection; console.log(response) })
            .error(function (error) { console.log(error) });
    };

    $scope.listarPregunta = function () {
        var _parametros = { Opcion: 1 }
        GeneralService.TypePost('pregunta', 'lstPregunta', _parametros)
            .success(function (response) { $scope.pregunta = response.DtCollection; console.log(response) })
            .error(function (error) { console.log(error) });
    };

    $scope.Filtros = {
        Colaborador: '',
        Progress: 15
    }
    $scope.solicitud = {
        codigoSolicitud: 0,
        fechaSolicitud: 0,
        horaSolicitud: 0,
        presupuestoSolicitud: '',
        codigoServicio: '',
        codigoTipoSolicitud: 0,
        codigoEstadoSolicitud: 1,
    }
    $scope.respuestaPregunta = {
        codigoPregunta01: 0,
        codigoPregunta02: 0,
        codigoPregunta03: 0,
    }
    $scope.VerColab = function () {
        $scope.solicitud.codigoServicio = ''
        for (i = 0; i < $scope.servicio.length; i++) {
            if ($scope.servicio[i].DES_SERV == $scope.Filtros.Colaborador) {
                $scope.solicitud.codigoServicio = $scope.servicio[i].ID_SERV;
            }
        }
    }
    $scope.paso01 = function () {

        //$scope.atras01 = false;
        //$scope.atras02 = true;
        //$scope.pregunta01 = false;
        //$scope.pregunta02 = true;
    }
    $scope.paso02 = function () {
       
        $scope.pregunta01 = false;
        $scope.pregunta02 = true;
        $scope.pregunta03 = true;
        $scope.Filtros.Progress = 30;
    }
    $scope.paso03 = function () {
        $scope.pregunta02 = false;
        $scope.pregunta03 = true;
        $scope.pregunta04 = true;
        $scope.Filtros.Progress = 45;
    }
    $scope.paso04 = function () {
        $scope.pregunta03 = false;
        $scope.pregunta04 = true;
        $scope.pregunta05 = true;
        $scope.Filtros.Progress = 60;
    }
    $scope.paso05 = function () {
        $scope.pregunta04 = false;
        $scope.pregunta05 = true;
        $scope.pregunta06 = true;
        $scope.Filtros.Progress = 75;
    }
    $scope.paso06 = function () {
        $scope.pregunta05 = false;
        $scope.pregunta06 = true;
        $scope.pregunta07 = true;
        $scope.Filtros.Progress = 95;
    }

    $scope.mandarParametros = function (s) {
        localStorage.removeItem('servicio');
        localStorage.setItem('servicio', s.ID_SERV);
        $location.path('/lstEspecialistas')
    };

    function iniciar() {       
        $scope.listarServicio();
        $scope.listarTipoServicio();
        $scope.listarPregunta();
        $('.content-wrapper').css('margin-left', '0px');
     
        if ($localStorage.usuario) {
            $scope.showLogin = false;
            $scope.showRegister = false;
            $scope.showIntranet = true;
            $scope.showLoginLandingPage = false;
        }
    };
    iniciar();
});
