app.controller('02datosPerfilController', function ($location, $scope, GeneralService) {
    var archivo = new Array();
    $scope.spinner = false;
    $scope.image = '../../../../src/img/avatar.png';
    function getFile(e) { archivo = e.target.files[0]; };

    $scope.mntUsuario = {
        codigoUsuario: 0,
        primerNombreUsuario: '',
        apellidoPaternoUsuario: '',
        apellidoMaternoUsuario: '',
        emailUsuario: '',
        imagenUsuario: '',
        loginUsuario: '',
        opcion: 1,
        origen: 1
    }

    $scope.obtenerImagen = function () {
        var file = document.getElementById('fileUpload');
        file.addEventListener('change', getFile);/*OBTIENE DATOS DEL FILE PARA SUBIR A FIREBASE*/
        previewImage('fileUpload', 'image');/*LLAMA A FUNCION PARA PREVISUALIZAR LA IMAGEN*/
    }

    $scope.mostrarDatos = function () {
        $scope.mntUsuario.opcion = 2
        $scope.mntUsuario.codigoUsuario = $scope.usuario.ID_USU;
        $scope.mntUsuario.primerNombreUsuario = $scope.usuario.PRI_NOM_USU;
        $scope.mntUsuario.apellidoPaternoUsuario = $scope.usuario.APE_PAT_USU;
        $scope.mntUsuario.apellidoMaternoUsuario = $scope.usuario.APE_MAT_USU;
        $scope.mntUsuario.emailUsuario = $scope.usuario.EMA_USU;
        $scope.mntUsuario.loginUsuario = $scope.usuario.LOG_USU;
        $scope.mntUsuario.imagenUsuario = $scope.usuario.IMA_USU;
        $scope.mntUsuario.codigoEstadoUsuario = $scope.usuario.ID_EST_USU;
        $scope.mntUsuario.codigoPerfil = $scope.usuario.ID_PER;
        $scope.mntUsuario.codigoRol = $scope.usuario.ID_ROL;
    }

    $scope.preConfirmar02 = function () {
        $scope.spinner = true;
        var fileName = 'profiles';
        var imageName = $scope.usuario.LOG_USU + convertToMD5($scope.usuario.LOG_USU, $scope.usuario.ID_USU);
        if (archivo.name) {/*Si el array tiene datos llama a funcion uploadToFirebase luego confirma la actualizacion*/
            $scope.spinner = true;
            uploadToFirebase(archivo, fileName, imageName, function (result) {
                if (result == true) {
                    var cadena = localStorage.getItem(archivo.name);
                    $scope.mntUsuario.imagenUsuario = cadena.replace(/['"]+/g, '');
                    localStorage.removeItem(archivo.name);
                    $scope.confirmar02();
                }
            });
        }
        else {
            $scope.confirmar02();/*Confirma la actualizacion*/
        }
    }

    $scope.confirmar02 = function () {      
        var _parametros = {
            Opcion: $scope.mntUsuario.opcion,
            IdUsu: $scope.mntUsuario.codigoUsuario,
            PriNomUsu: $scope.mntUsuario.primerNombreUsuario,
            ApePatUsu: $scope.mntUsuario.apellidoPaternoUsuario,
            ApeMatUsu: $scope.mntUsuario.apellidoMaternoUsuario,
            EmaUsu: $scope.mntUsuario.emailUsuario,
            ImaUsu: $scope.mntUsuario.imagenUsuario,
            LogUsu: $scope.mntUsuario.loginUsuario,
            IdEstUsu: 1,
            IdRol: $scope.mntUsuario.codigoRol,
            IdPer: $scope.mntUsuario.codigoPerfil,
            Origen: 1
        }
        GeneralService.TypePost('usuario', 'mntUsuario', _parametros)
            .success(function (response) {
                var _parametros = {
                    Opcion: 3,
                    IdUsu: $scope.mntUsuario.codigoUsuario
                }
                GeneralService.TypePost('authenticate', 'reloadUserData', _parametros)
                    .success(function (response) {
                        if (response.nMsjCode == 200) {
                            localStorage.setItem('datos', JSON.stringify(response.DtCollection[0]));
                            $scope.usuario = JSON.parse(localStorage.getItem('datos'));                    
                            if ($location.path() == '/home/miPerfil/datosPersonales') {
                                $location.path('/home/miPerfil/datosPersonales')
                                location.reload(); 
                            }
                            if ($location.path() == '/home/registroPerfil/2') {
                                //location.reload(); 
                                $location.path('/home/registroPerfil/3')
                                
                            }
                        }
                    })
                    .error(function (error) {
                        jsAlert('error', 'Error', error, 4000, 'toast-top-full-width');
                    })

            }).error(function (error) { console.log(error) });
    };

    $scope.anterior02 = function () {
        $location.path('/home/registroPerfil/1')
    }

    $scope.mostrarOcultarButones = function () {
        if ($location.path() == '/home/miPerfil/datosPersonales') {
            $scope.groupButton01 = true;
            $scope.groupButton02 = false;
        }
        if ($location.path() == '/home/registroPerfil/2') {
            $scope.groupButton01 = false;
            $scope.groupButton02 = true;
        }
    }

    function iniciar() {
        $scope.mostrarDatos();
        $scope.mostrarOcultarButones();
    }
    iniciar();

});
/*
             $("#myModal3").modal();
            setTimeout(function () {
                $scope.registrarPedido();
                $("#myModal3").modal('hide');
                //$("#myModal3").modal();
                window.location.href = mvcUrl + "index.html#/principal?key=" + $scope.key;

            }, 2000);
 */