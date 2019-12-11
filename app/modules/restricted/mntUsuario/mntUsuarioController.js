app.controller('mntUsuarioController', function ($scope, GeneralService, $location) {
    $scope.titulo = 'Mantenimiento de Usuarios';
    $scope.listaRol = [];
    $scope.listaPerfil = [];
    $scope.listaUsuario = [];
    $scope.estado = [{ id: 1, nombre: 'Activo' }, { id: 2, nombre: 'Inactivo' }];
    $scope.codigo = {
        cadena: ''
    };
    $scope.mntUsuario = {
        'txtCodigo': '',
        'txtNombres': '',
        'txtApellidoPaterno': '',
        'txtApellidoMaterno': '',
        'txtCorreo': '',
        'txtNombreUsuario': '',
        'txtRol': '',
        'txtEstado': '',
        'txtCodigoRol': '',
        'txtCodigoPerfil': '',
        'txtFoto':''
    };
    
    $scope.listarSexo = [{ ID_SEX: 1, NOM_SEX: 'Masculino' },
    { ID_SEX: 2, NOM_SEX: 'Femenino' }];

    $scope.listarDistrito = [{ ID_DIS: 1, NOM_DIS: 'Puente Piedra' },
    { ID_DIS: 2, NOM_DIS: 'Rimac' },
    { ID_DIS: 3, NOM_DIS: 'Los Olivos' },
    { ID_DIS: 4, NOM_DIS: 'San Martin' }];

    $scope.listarProvincia = [{ ID_PRO: 1, NOM_PRO: 'Apurímac' },
    { ID_PRO: 2, NOM_PRO: 'Lima' },
    { ID_PRO: 3, NOM_PRO: 'Cuzco' },
    { ID_PRO: 4, NOM_PRO: 'Puno' }];

    $scope.listarDepartamento = [{ ID_DEP: 1, NOM_DEP: 'Amazonas' },
    { ID_DEP: 2, NOM_DEP: 'Ancash' },
    { ID_DEP: 3, NOM_DEP: 'Apurimac' },
    { ID_DEP: 4, NOM_DEP: 'Arequipa' }];

    $scope.listarNacionalidad = [{ ID_NAC: 1, NOM_NAC: 'Peruano' }];


    /*modal asociacion*/
    $scope.mostrarAsoc = function (item) {
        $('#modal-asignar').modal('show');
        $scope.mntRol.ID_ROL = item.ID_ROL;
        $scope.mntRol.NOM_ROL = item.NOM_ROL;
        $scope.listarAsociados($scope.mntRol.ID_ROL);
    }

    $scope.listarUsuario = function () {
        var _parametros = { Opcion: 4 }
        GeneralService.TypePost('usuario', 'mntUsuario', _parametros)
            .success(function (response) {
                $scope.listaUsuario = response.DtCollection;
            })
    };

    $scope.listarRol = function () {
        var _parametros = {Opcion: 1}
        GeneralService.TypePost('rol', 'asignarRolAUsuario', _parametros)
            .success(function (response) {
                $scope.listaRol = response.DtCollection;
            })
    };

    $scope.listarPerfil = function () {
        var _parametros = {Opcion: 2}
        GeneralService.TypePost('rol', 'asignarRolAUsuario', _parametros)
            .success(function (response) {
                $scope.listaPerfil = response.DtCollection;
            })
    };

    $scope.mostrarAsoc = function (item) {
        $('#modal-asignar').modal('show');
        for (var i = 0; i < $scope.listaPerfil.length; i++) {
            $scope['check' + $scope.listaPerfil[i].ID_ROL + $scope.listaPerfil[i].ID_PER] = false;            
        }
        $scope.mntUsuario.txtCodigo = item.ID_USU;
        $scope.mntUsuario.txtNombres = item.PRI_NOM_USU;
        $scope.mntUsuario.txtApellidoPaterno = item.APE_PAT_USU;
        $scope.mntUsuario.txtApellidoMaterno = item.APE_MAT_USU;
        $scope.mntUsuario.txtRol = item.NOM_ROL;
        $scope.codigo.cadena = 'r' + item.ID_ROL + 'p' + item.ID_PER;
        $scope.listarAsociados(item.ID_ROL, item.ID_PER);
    }

    $scope.ConsultarUsuario= function () {
        var parm = {
            Opcion: 4,
            IdEstUsu: $scope.mntUsuario.txtEstado
        }
        console.dir(parm);
        GeneralService.TypePost('usuario', 'mntUsuario', parm)
            .success(function (response) {
                $scope.listaUsuario = response.DtCollection;
            })
            .error(function (error) {

            });
    }

    /*lista asociados*/
    $scope.listarAsociados = function (item1, item2) {
            $scope['check' + item1 + item2] = true;
    };

    /*confirmar AsociacionPerfil*/
    $scope.registrarAsociacion = function () {
        $('.toast').css('display', 'none');
        var cadena = $scope.codigo.cadena;
        var rolcadena = cadena.lastIndexOf("r") + 1;
        var perfilcadena = cadena.lastIndexOf("p") + 1;
        var rol = cadena.substr(rolcadena, perfilcadena - 2).toLowerCase();
        var perfil = cadena.substr(perfilcadena, cadena.length).toLowerCase();
        var _parametros = {
            Opcion: 3,
            IdUsu: $scope.mntUsuario.txtCodigo,
            IdRol: rol,
            IdPer: perfil
        }
        console.dir(_parametros)
        GeneralService.TypePost('rol', 'asignarRolAUsuario', _parametros)
            .success(function (response) {
                location.reload();
                jsAlert('success', '¡Aviso!', 'La asociacion se registro correctamente...', 4000, 'toast-top-full-width');              
            }).error(function (error) { });
    }   

    /*Actualizar*/
    $scope.Actualizar = function (item) {
        $("#modal-usuarioModificar").modal("show");
        $scope.mntUsuario.txtCodigo = item.ID_USU;
        $scope.mntUsuario.txtNombres = item.PRI_NOM_USU;
        $scope.mntUsuario.txtApellidoPaterno = item.APE_PAT_USU;
        $scope.mntUsuario.txtApellidoMaterno = item.APE_MAT_USU;
        $scope.mntUsuario.txtCorreo = item.EMA_USU;
        $scope.mntUsuario.txtNombreUsuario = item.LOG_USU;
        /**/
        if (item.IMA_USU != null) {
            $scope.mntUsuario.txtFoto = item.IMA_USU;
        } else {
            $scope.mntUsuario.txtFoto = "../../../../src/img/avatar.png";
        }
    }

    $scope.listarDetalle = [];
    /*listarDetalle*/
    $scope.listarDetalleUsuario = function (txt) {
        var _parametros = { Opcion: 4, 
            IdUsu:txt
        }
        GeneralService.TypePost('usuario','mntDetalleUsuario', _parametros)
            .success(function (response) {
                $scope.listarDetalle = response.DtCollection
                if (response.DtCollection.length == 0) {            
                    jsAlert('info', '¡Aviso!', 'El usuario no tiene informacion registrada', 4000, 'toast-top-full-width');
                }
                else {
                    $scope.mntDetalleUsuario.txtCodigo = response.DtCollection[0].ID_USU;
                    $scope.mntDetalleUsuario.txtDescripcion = response.DtCollection[0].DES_USU;
                    $scope.mntDetalleUsuario.txtFecha = response.DtCollection[0].FEC_NAC_USU;
                    $scope.mntDetalleUsuario.txtTelefono = response.DtCollection[0].TEL_USU;
                    $scope.mntDetalleUsuario.txtCelular = response.DtCollection[0].CEL_USU;
                    $scope.mntDetalleUsuario.txtDni = response.DtCollection[0].DOC_IDE_USU;
                    $scope.mntDetalleUsuario.txtSexo = response.DtCollection[0].ID_SEX.toString();
                    $scope.mntDetalleUsuario.txtSeudonimo = response.DtCollection[0].SEU_USU;
                    $scope.mntDetalleUsuario.txtDireccion = response.DtCollection[0].DIR_USU;
                    $scope.mntDetalleUsuario.txtReferencia = response.DtCollection[0].REF_USU;              
                    $scope.mntDetalleUsuario.txtDepartamento = response.DtCollection[0].DES_DEP_UBIGEO;
                    $scope.mntDetalleUsuario.txtProvincia = response.DtCollection[0].DES_PRO_UBIGEO;
                    $scope.mntDetalleUsuario.txtDistrito = response.DtCollection[0].DES_UBIGEO;
                    $scope.mntDetalleUsuario.txtPais = response.DtCollection[0].DES_PAI_UBIGEO;
                }
            })
    };

    $scope.mntDetalleUsuario = {
        'txtCodigo': '',
        'txtDescripcion': '',
        'txtFecha': '',
        'txtTelefono': '',
        'txtCelular': '',
        'txtDni': '',
        'txtSexo': '',
        'txtSeudonimo': '',
        'txtDireccion': '',
        'txtReferencia': '',
        'txtDepartamento': '',
        'txtProvincia': '',
        'txtDistrito': '',
        'txtPais': ''
    };
    $scope.MotrarDetalle = function (item) {
        $scope.mntDetalleUsuario = {
            'txtCodigo': '',
            'txtDescripcion': '',
            'txtFecha': '',
            'txtTelefono': '',
            'txtCelular': '',
            'txtDni': '',
            'txtSexo': '',
            'txtSeudonimo': '',
            'txtDireccion': '',
            'txtReferencia': '',
            'txtDepartamento': '',
            'txtProvincia': '',
            'txtDistrito': '',
            'txtPais': ''
        };
        $('#modal-usuarioDetalle').modal('show');
        $scope.listarDetalleUsuario(item.ID_USU);
    }

    $scope.mandarParametros = function (item) {
        localStorage.removeItem('perfilUsuario');
        localStorage.setItem('perfilUsuario', item.ID_USU);
        $location.path('/perfil')
    }

    function iniciar() {
        $scope.listarPerfil();
        $scope.listarRol();
        $scope.listarUsuario();
    }
    iniciar();
});
