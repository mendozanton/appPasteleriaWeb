app.controller('mntPerfilController', function ($scope, GeneralService, $location   ) {
    $scope.titulo = "Mantenimiento de Perfiles";
    $scope.typeServices = [];
    $scope.Checked = function () {
        var favorite = [];
        $.each($("input[name='menu']:checked"), function () {
            favorite.push($(this).val());
        });
        alert(favorite.join(", "));
    }
    $scope.ListarPerfiles = [];
    $scope.estado = [{ id: 1, nombre: 'Activo' }, { id: 2, nombre: 'Inactivo' }];
    $scope.mntPerfil = {
        'txtCodigo': '',
        'txtNombre': '',
        'txtDescripcion': '',
        'cboEstado':'',
        'Opcion': ''
    }
    $scope.consultar = {
        'cboEstado': '',
    }

    /*listar grupo*/
    $scope.listarGrupos = [];
    $scope.grupo = {
        'Rol': '',
        'perfil': '',
    }


    $scope.ConsultarPerfil = function () {
        var parm = {
            Opcion: 4,
            IdEstPer: $scope.mntPerfil.cboEstado
        }
        GeneralService.TypePost('perfil', 'mntPerfil', parm)
           .success(function (response) {
               $scope.ListarPerfiles = response.DtCollection;
               console.log(response)
           })
           .error(function (error) {

           });
    }

    $scope.listarPerfil = function () {
        var _parametros = {
            Opcion: 4
        }
        GeneralService.TypePost('perfil', 'mntPerfil', _parametros)
            .success(function (response) {
                $scope.ListarPerfiles = response.DtCollection;
                console.log(response)
            })
            .error(function (error) {
   
            });
    };
    /*REGISTRAR*/
    $scope.registrar = function () {
        $('#modal-perfil').modal('show');
        $scope.mntPerfil.txtCodigo = 0,
        $scope.mntPerfil.txtNombre = '',
        $scope.mntPerfil.txtDescripcion = '',
        $scope.mntPerfil.cboEstado = '',
        $scope.mntPerfil.Opcion = 1
    }

    /*ACTUALIZAR*/
    $scope.actualizar = function (item) {
        $('#modal-perfil').modal('show');
        $scope.mntPerfil.txtCodigo = item.ID_PER,
        $scope.mntPerfil.txtNombre = item.NOM_PER,
        $scope.mntPerfil.txtDescripcion = item.DES_PER,
        $scope.mntPerfil.cboEstado = item.ID_EST_PER.toString(),
        $scope.mntPerfil.Opcion = 2
    }

    /*ELIMINAR*/
    $scope.eliminar = function (item) {
        $('#modal-eliminar').modal('show');
        $scope.mntPerfil.txtCodigo = item.ID_PER,
        $scope.mntPerfil.txtNombre = item.NOM_PER,
        $scope.mntPerfil.txtDescripcion = item.DES_PER,
        $scope.mntPerfil.cboEstado = item.EST_PER,
        $scope.mntPerfil.Opcion = 3
    }

    /*Confimrar*/
    $scope.confirmar = function () {
        var _parametros = {
            Opcion:$scope.mntPerfil.Opcion ,
            IdPer: $scope.mntPerfil.txtCodigo,
            NomPer: $scope.mntPerfil.txtNombre,
            DesPer: $scope.mntPerfil.txtDescripcion,
            IdEstPer: $scope.mntPerfil.cboEstado
        }
        console.dir(_parametros)
        GeneralService.TypePost('perfil', 'mntPerfil', _parametros)
            .success(function (response) {
                $('#modal-perfil').modal('hide');
                $('#modal-eliminar').modal('hide');
                $scope.listarPerfil();
                if (response.nMsjCode == 200) {
                    jsAlert('success', '¡Exito!', 'Los cambios fueron ejecutados exitosamente', 4000, 'toast-top-full-width');
                }
                else {
                    jsAlert('info', '¡Aviso!', response.cMsjDetaill, 4000, 'toast-top-full-width');
                }
                console.log(response);
            })
            .error(function (error) {

            });
    };


    /*modal asociacion*/
    $scope.mostrarAsoc = function (item) {
        $('#modal-asignar').modal('show');
        $scope.mntPerfil.ID_PER = item.ID_PER;
        $scope.mntPerfil.NOM_PER = item.NOM_PER;
        $scope.listarAsociados($scope.mntPerfil.ID_PER);
    }

    /*lista grupo*/
    $scope.listarGrupo = function () {
        var _parametros = {
            Opcion: 1
        }
        GeneralService.TypePost('perfil', 'asignarMenuAPerfil', _parametros)
            .success(function (response) {
                $scope.listarGrupos = response.DtCollection;
                console.log("x")
                console.log(response)
            })
            .error(function (error) {

            });
    };
    /*menu*/
    $scope.listarMenus = [];
    var c = 0;
    $scope.listarMenu = function (txt) {
        var _parametros = {
            Opcion: 2
        }
        GeneralService.TypePost('perfil', 'asignarMenuAPerfil', _parametros)
            .success(function (response) {
                $scope.listarMenus = response.DtCollection;
                console.log("x2")
                console.log(response)
            })
            .error(function (error) {

            });
    };

   /*lista asociados*/
    $scope.listarAsociados = function (txt) {
        for (var i = 0; i < $scope.listarMenus.length; i++) {
            $scope['check' + $scope.listarMenus[i].ID_MEN] = false;
        }
        var _parametros = {
            Opcion: 3,
            IdPer: txt
        }
        GeneralService.TypePost('perfil', 'asignarMenuAPerfil', _parametros)
            .success(function (response) {

                for (var i = 0; i < response.DtCollection.length; i++) {
                    $scope['check' + response.DtCollection[i].ID_MEN] = true;
                }
            }).error(function (error) { });
    };

    /*confirmar AsociacionPerfil*/
    $scope.RegistrarAsociacion = function () {
        $('.toast').css('display', 'none');
        var contador = 0
        $.each($("input[name='menu']:checked"), function () {
            $scope.typeServices.push($(this).val());
        });
        if ($scope.typeServices.length == []) {
            var _parametros = { Opcion: 5, IdPer: $scope.mntPerfil.ID_PER }
            GeneralService.TypePost('perfil', 'asignarMenuAPerfil', _parametros)
                .success(function (response) {
                    location.reload();
                })
           // jsAlert('warning', '¡Aviso!', 'Debe seleccionar almenos un menu para que podamos configurar.', 5000, 'toast-bottom-right');
        }
        console.log($scope.typeServices);
        for (var i = 0; i < $scope.typeServices.length; i++) {
            var _parametros = {
                Opcion: 4,
                IdPer: $scope.mntPerfil.ID_PER,
                IdMen: $scope.typeServices[i]
            }
            GeneralService.TypePost('perfil', 'asignarMenuAPerfil', _parametros)
                .success(function (response) {
                    if (response.cMsj == "OK") {
                        jsAlert('success', '¡Aviso!', 'La asociacion se registro correctamente...', 4000, 'toast-top-full-width');
                        contador = contador + 1     
                        console.log("contador" + contador);
                        if ($scope.typeServices.length == contador) {
                            var _parametros = { Opcion: 5, IdPer: $scope.mntPerfil.ID_PER}
                            GeneralService.TypePost('perfil', 'asignarMenuAPerfil', _parametros)
                                .success(function (response) {                                  
                                    location.reload();             
                                })
                        }
                    }
                }).error(function (error) { });
        }
    }   


    function initController() {
        $scope.listarPerfil();
        $scope.listarGrupo();
        $scope.listarMenu();
    }
    initController();
});
