app.controller('06estudiosPerfilController', function ($location, $scope, GeneralService) {

    console.log("mostrar usuario");
    console.log($scope.usuario);
    $scope.mntEstudio = {
        'txtCodigoEstudio': '',
        'txtGradoEstudio': '',
        'txtCargoEstudio': '',
        'txtEstudio': '',
        'txtCodigoUsuario': '',
        'Opcion': ''
    }
    $scope.listarEstudio = function () {
        var _parametros = {
            Opcion: 4,
            IdUsu: $scope.usuario.ID_USU
        }
        GeneralService.TypePost('estudio', 'mntEstudio', _parametros)
            .success(function (response) {
                $scope.estudio = response.DtCollection;
            })
            .error(function (error) { });
    };

    $scope.registrar = function () {
        $('#modal-estudio').modal('show');
        $scope.mntEstudio.txtCodigoEstudio = 0,
            $scope.mntEstudio.txtGradoEstudio = '',
            $scope.mntEstudio.txtCargoEstudio = '',
            $scope.mntEstudio.txtEstudio = '',
            $scope.mntEstudio.txtCodigoUsuario = $scope.usuario.ID_USU,
            $scope.mntEstudio.Opcion = 1
    }


    $scope.actualizar = function (item) {
        $('#modal-estudio').modal('show');
        $scope.mntEstudio.txtCodigoEstudio = item.ID_EST,
            $scope.mntEstudio.txtGradoEstudio = item.DES_GRA_EST,
            $scope.mntEstudio.txtCargoEstudio = item.DES_CAR_EST,
            $scope.mntEstudio.txtEstudio = item.DES_EST,
            $scope.mntEstudio.txtCodigoUsuario = $scope.usuario.ID_USU,
            $scope.mntEstudio.Opcion = 2
        console.log("mostrar")
    }



    $scope.eliminar = function (item) {
        $('#modal-eliminar').modal('show');
        $scope.mntEstudio.txtCodigoEstudio = item.ID_EST,
            $scope.mntEstudio.txtGradoEstudio = item.DES_GRA_EST,
            $scope.mntEstudio.txtCargoEstudio = item.DES_CAR_EST,
            $scope.mntEstudio.txtEstudio = item.DES_EST,
            $scope.mntEstudio.txtCodigoUsuario = $scope.usuario.ID_USU,
            $scope.mntEstudio.Opcion = 3
        console.log("mostrar")
    }

    $scope.confirmar = function () {
        var _parametros = {
            Opcion: $scope.mntEstudio.Opcion,
            IdEst: $scope.mntEstudio.txtCodigoEstudio,
            DesGraEst: $scope.mntEstudio.txtGradoEstudio,
            DesCarEst: $scope.mntEstudio.txtCargoEstudio,
            DesEst: $scope.mntEstudio.txtEstudio,
            IdUsu: $scope.mntEstudio.txtCodigoUsuario
        }

        console.dir(_parametros)
        GeneralService.TypePost('estudio', 'mntEstudio', _parametros)
            .success(function (response) {
                $('#modal-estudio').modal('hide');
                $('#modal-eliminar').modal('hide');
                $scope.listarEstudio();
            })
            .error(function (error) {

            });
    };

    $scope.anterior06 = function () {
        $location.path('/home/registroPerfil/4');
    }
    $scope.mostrarOcultarButones = function () {
        if ($location.path() == '/home/miPerfil/estudios') {
            $scope.groupButton01 = true;
            $scope.groupButton02 = false;
        }
        if ($location.path() == '/home/registroPerfil/6') {
            $scope.groupButton01 = false;
            $scope.groupButton02 = true;
        }
    }

    $scope.finalizar = function () {
        jsAlert('success', '¡Aviso!', 'Su perfil a sido creado exitosamente', 2000, 'toast-top-full-width');
        setTimeout(function () {
            var _parametros = {
                Opcion: 2,
                IdUsu: $scope.usuario.ID_USU,
                PriNomUsu: $scope.usuario.PRI_NOM_USU,
                ApePatUsu: $scope.usuario.APE_PAT_USU,
                ApeMatUsu: $scope.usuario.APE_MAT_USU,
                EmaUsu: $scope.usuario.EMA_USU,
                ImaUsu: $scope.usuario.IMA_USU,
                IdEstUsu: 1,
                IdRol: $scope.usuario.ID_ROL,
                IdPer: $scope.usuario.ID_PER,
                Origen: 1
            }
            GeneralService.TypePost('usuario', 'mntUsuario', _parametros)
                .success(function (response) {
                    console.log(response);
                    var _parametros = {
                        Opcion: 3,
                        IdUsu: $scope.usuario.ID_USU
                    }
                    GeneralService.TypePost('authenticate', 'reloadUserData', _parametros)
                        .success(function (response) {
                            if (response.nMsjCode == 200) {
                                localStorage.setItem('datos', JSON.stringify(response.DtCollection[0]));
                                $scope.usuario = JSON.parse(localStorage.getItem('datos'));
                                if ($location.path() == '/home/registroPerfil/6') {
                                    $location.path('/home');
                                }
                            }
                        })
                        .error(function (error) {
                            jsAlert('error', 'Error', error, 2000, 'toast-top-full-width');
                        })

                }).error(function (error) { console.log(error) });
            jsAlert('info', '¡Aviso!', 'Redirigiendo a pagina principal', 2000, 'toast-top-full-width');
        }, 2500);
    }
    function iniciar() {
        $scope.listarEstudio();
        $scope.mostrarOcultarButones();
    }
    iniciar();
});
