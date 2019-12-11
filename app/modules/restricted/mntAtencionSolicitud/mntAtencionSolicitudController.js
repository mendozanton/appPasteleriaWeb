app.controller('mntAtencionSolicitudController', function ($scope, GeneralService) {
    $scope.titulo = "Mis Solicitudes";
    $scope.listaSolicitudes = [];
    $scope.listaSolicitudesEnAtencion = [];
    $scope.estado = [{ id: 1, nombre: 'Activo' }, { id: 2, nombre: 'Inactivo' }];

    $scope.listarSolicitudes = function () {
        var _parametros = {
            Opcion: 4,
            IdUsuEsp: $scope.usuario.ID_USU
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
    $scope.listarSolicitudesEnAtencion = function () {
        var _parametros = {
            Opcion: 7,
            IdUsuEsp: $scope.usuario.ID_USU
        }
        console.dir(_parametros)
        GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
            .success(function (response) {
                $scope.listaSolicitudesEnAtencion = response.DtCollection;
                console.log($scope.listaSolicitudesEnAtencion);
            })
            .error(function (error) {

            });
    };

    $scope.listarSolicitudesFinalizadas = function () {
        var _parametros = {
            Opcion: 8,
            IdUsuEsp: $scope.usuario.ID_USU
        }
        console.dir(_parametros)
        GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
            .success(function (response) {
                $scope.listaSolicitudesFinalizadas = response.DtCollection;
                console.log($scope.listaSolicitudesFinalizadas);
            })
            .error(function (error) {

            });
    };

    $scope.previewSolicitud = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correoContacto: '',
        numeroContacto: '',
        preguntaUno: '',
        preguntaDos: '',
        preguntaTres: '',
        tipoServicio: '',
        fecha: '',
        imagenUsuario: ''
    }

    $scope.preEvaluar = function (soli) {
        $('#modal-atencion').modal('show');
        $scope.previewSolicitud = {
            nombreCompleto: soli.PRI_NOM_USU + ' ' + soli.APE_PAT_USU + ' ' + soli.APE_MAT_USU,
            nombre: soli.PRI_NOM_USU,
            apellidoPaterno: soli.APE_PAT_USU,
            apellidoMaterno: soli.APE_MAT_USU,
            correoContacto: soli.CORR_CONTAC,
            numeroContacto: soli.NUME_CONTAC,
            preguntaUno: soli.Column1,
            preguntaDos: soli.Column2,
            preguntaTres: soli.Column3,
            tipoServicio: soli.DES_TIP_SERV,
            fecha: soli.FEC_SOLI,
            imagenUsuario: soli.IMA_USU
        }
        var _parametros = {
            Opcion: 5,
            IdSoli: soli.ID_SOLI
        }
        console.dir(_parametros);
        GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
            .success(function (response) {
                console.log(response)
            })
            .error(function (error) {

            });
    };

    $scope.preEvaluar2 = function (soli) {
        $('#modal-atencion').modal('show');
        $scope.previewSolicitud = {
            nombreCompleto: soli.PRI_NOM_USU + ' ' + soli.APE_PAT_USU + ' ' + soli.APE_MAT_USU,
            nombre: soli.PRI_NOM_USU,
            apellidoPaterno: soli.APE_PAT_USU,
            apellidoMaterno: soli.APE_MAT_USU,
            correoContacto: soli.CORR_CONTAC,
            numeroContacto: soli.NUME_CONTAC,
            preguntaUno: soli.Column1,
            preguntaDos: soli.Column2,
            preguntaTres: soli.Column3,
            tipoServicio: soli.DES_TIP_SERV,
            fecha: soli.FEC_SOLI,
            imagenUsuario: soli.IMA_USU
        }
      
    };

    $scope.preAtender = function(soli) {
        $('#modal-iniciarAtencion').modal('show');
        localStorage.removeItem('codigoSolicitud');
        localStorage.setItem('codigoSolicitud', soli.ID_SOLI);
    };

    $scope.confirmar = function () {
        $scope.codigoSolicitudE = localStorage.getItem('codigoSolicitud');
        var _parametros = {
            Opcion: 5,
            IdSoli: $scope.codigoSolicitudE
        }
        console.dir(_parametros);
        GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
            .success(function (response) {
                console.log(response);
                var _parametros = {
                    Opcion: 6,
                    IdSoli: $scope.codigoSolicitudE 
                }
                console.dir(_parametros);
                GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
                    .success(function (response) {
                        //jsAlert('info', '¡Aviso!', 'Se comenzo a aterder la solicitud seleccionada', 2000, 'toast-top-full-width');
                        $('#modal-iniciarAtencion').modal('hide');
                        location.reload();
                        console.log(response)
                    })
                    .error(function (error) {
                    });
            })
            .error(function (error) {
            });
    };

    $scope.preFinalizar = function (soli) {
        $('#modal-finalizar').modal('show');
        localStorage.removeItem('codigoSolicitud');
        localStorage.setItem('codigoSolicitud', soli.ID_SOLI);
    }

    $scope.confirmar2 = function () {
        $scope.codigoSolicitudEs = localStorage.getItem('codigoSolicitud');
        var _parametros = {
            Opcion: 9,
            IdSoli: $scope.codigoSolicitudEs
        }
        console.dir(_parametros);
        GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
            .success(function (response) {
                console.log(response);
                $('#modal-finalizar').modal('hide');
                location.reload();
                console.log(response)
            })
            .error(function (error) {
            });
    }
    function initController() {
        $scope.listarSolicitudes();
        $scope.listarSolicitudesEnAtencion();
        $scope.listarSolicitudesFinalizadas();
    };
    initController();
});
