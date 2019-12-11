app.controller('mntRolController', function ($scope, GeneralService) {
    $scope.titulo = "Mantenimiento de Roles";
    $scope.rol = [];
    $scope.listaPerfil = [];
    $scope.estado = [{ id: 1, nombre: 'Activo' }, { id: 2, nombre: 'Inactivo' }];
    $scope.mntRol = {
        'txtCodigo': '',
        'txtNombre': '',
        'txtDescripcion': '',
        'cboEstado': '',
        'Opcion': ''
    }
    $scope.listarRol = function () {
        var _parametros = {
            Opcion: 4
        }
        GeneralService.TypePost('rol', 'mntRol', _parametros)
            .success(function (response) {
                $scope.rol = response.DtCollection;
                console.log(response)
            })
            .error(function (error) {

            });
    };
    /*registrar*/
    $scope.registrar = function () {
        $('#modal-rol').modal('show');
        $scope.mntRol.txtCodigo = 0,
        $scope.mntRol.txtNombre = '',
        $scope.mntRol.txtDescripcion = '',
        $scope.mntRol.cboEstado = '',
        $scope.mntRol.Opcion = 1
    }
    /*ACTUALIZAR*/
    $scope.actualizar = function (item) {
        $('#modal-rol').modal('show');
        $scope.mntRol.txtCodigo = item.ID_ROL,
        $scope.mntRol.txtNombre = item.NOM_ROL,
        $scope.mntRol.txtDescripcion = item.DES_ROL,
        $scope.mntRol.cboEstado = item.ID_EST_ROL.toString(),
        $scope.mntRol.Opcion = 2
    }

    /*ELIMINAR*/
    $scope.eliminar = function (item) {
        $('#modal-eliminar').modal('show');
        $scope.mntRol.txtCodigo = item.ID_ROL,
        $scope.mntRol.txtNombre = item.NOM_ROL,
        $scope.mntRol.txtDescripcion = item.DES_ROL,
        $scope.mntRol.cboEstado = item.DES_EST_ROL,
        $scope.mntRol.Opcion = 3
    }


    $scope.confirmar = function () {
        var _parametros = {
            Opcion: $scope.mntRol.Opcion,
            IdRol: $scope.mntRol.txtCodigo,
            NomRol: $scope.mntRol.txtNombre,
            DesRol: $scope.mntRol.txtDescripcion,
            IdEstRol: $scope.mntRol.cboEstado
        }

        console.dir(_parametros)
        GeneralService.TypePost('rol', 'mntRol', _parametros)
            .success(function (response) {
                $('#modal-rol').modal('hide');
                $('#modal-eliminar').modal('hide');
                $scope.listarRol();
                if (response.nMsjCode == 200) {
                    jsAlert('success', '¡Exito!', 'Los cambios fueron ejecutados exitosamente', 4000, 'toast-top-full-width');
                }
                else {
                    jsAlert('info', '¡Aviso!', response.cMsjDetaill, 4000, 'toast-top-full-width');
                }
            })
            .error(function (error) {

            });
    };
    $scope.consultar = {
        'cboEstado': '',
    }
    $scope.ConsultarRol = function () {
        var parm = {
            Opcion: 4,
            IdEstRol: $scope.mntRol.cboEstado
        }
        console.dir(parm);
        GeneralService.TypePost('rol', 'mntRol', parm)
           .success(function (response) {
               $scope.rol = response.DtCollection;

               console.log(response)
           })
           .error(function (error) {

           });
    }

    /*modal asociacion*/
    $scope.mostrarAsoc = function (item) {
        $('#modal-asignar').modal('show');
        $scope.mntRol.ID_ROL = item.ID_ROL;
        $scope.mntRol.NOM_ROL = item.NOM_ROL;
        $scope.listarAsociados($scope.mntRol.ID_ROL);
    }

    $scope.listarPerfil = function () {
        var _parametros = {
            Opcion: 1
        }
        GeneralService.TypePost('rol', 'asignarPerfilRol', _parametros)
            .success(function (response) {
                $scope.listaPerfil = response.DtCollection;               
                console.log(response)
            })
    };

    /*lista asociados*/
    $scope.listarAsociados = function (txt) {
        for (var i = 0; i < $scope.listaPerfil.length; i++) {
            $scope['check' + $scope.listaPerfil[i].ID_PER] = false;
        }
        var _parametros = {
            Opcion: 2,
            IdRol: txt
        }
        GeneralService.TypePost('rol', 'asignarPerfilRol', _parametros)
            .success(function (response) {
                console.log(response);
                for (var i = 0; i < response.DtCollection.length; i++) {
                    $scope['check' + response.DtCollection[i].ID_PER] = true;
                }
            }).error(function (error) { });
    };

    /*confirmar AsociacionPerfil*/
    $scope.RegistrarAsociacion = function () {
        $('.toast').css('display', 'none');
        $scope.typeServices = [];
        var contador = 0
        $.each($("input[name='menu']:checked"), function () {
            $scope.typeServices.push($(this).val());
        });
        if ($scope.typeServices.length == []) {
            var _parametros = { Opcion: 4, IdRol: $scope.mntRol.ID_ROL }
            GeneralService.TypePost('rol', 'asignarPerfilRol', _parametros)
                .success(function (response) {
                    location.reload();
                })
           // jsAlert('warning', '¡Aviso!', 'Debe seleccionar almenos un menu para que podamos configurar.', 5000, 'toast-bottom-right');
        }
        console.log($scope.typeServices);
        for (var i = 0; i < $scope.typeServices.length; i++) {
            var _parametros = {
                Opcion: 3,
                IdRol: $scope.mntRol.ID_ROL,
                IdPer: $scope.typeServices[i]
            }
            GeneralService.TypePost('rol', 'asignarPerfilRol', _parametros)
                .success(function (response) {
                    if (response.cMsj == "OK") {
                        jsAlert('success', '¡Aviso!', 'La asociacion se registro correctamente...', 4000, 'toast-top-full-width');
                        contador = contador + 1
                        console.log("contador" + contador);
                        if ($scope.typeServices.length == contador) {
                            var _parametros = { Opcion: 4, IdRol: $scope.mntRol.ID_ROL }
                            GeneralService.TypePost('rol', 'asignarPerfilRol', _parametros)
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
        $scope.listarRol();
    }
    initController();
});
