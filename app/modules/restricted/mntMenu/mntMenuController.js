app.controller('mntMenuController', function ($scope, GeneralService) {
    $scope.titulo = "Mantenimiento de Menus";
    $scope.listarMenus = [];
    $scope.listarGrupo = []
    $scope.estado = [{ id: 1, nombre: 'Activo' }, { id: 2, nombre: 'Inactivo' }];

    $scope.listarMenu = function () {
        var _parametros = {
            Opcion: 4
        }
        GeneralService.TypePost('menu', 'mntMenu', _parametros)
            .success(function (response) {
                $scope.listarMenus = response.DtCollection;
                console.log(response)
            })
            .error(function (error) {

            });
    };
    /*consultar*/
    $scope.consultar = {
        'cboEstado': '',
    }
    $scope.ConsultarMenu = function () {
        var parm = {
            Opcion: 4,
            IdEstMen: $scope.consultar.cboEstado
        }
        console.dir(parm)
        GeneralService.TypePost('menu', 'mntMenu', parm)
           .success(function (response) {
               $scope.listarMenus = response.DtCollection;
               console.log("aca")
               console.log(  $scope.listarMenus)
           })
           .error(function (error) {

           });
    }

    /*Grupo*/    
     $scope.litarGrupo = function () {
         var _parametros = {
             Opcion: 4
         }
         GeneralService.TypePost('menu', 'lstGrupo', _parametros)
             .success(function (response) {
                 $scope.listarGrupo = response.DtCollection;
                 console.log(response)
             })
             .error(function (error) {
 
             });
     };
    function initController() {
        $scope.listarMenu();
        $scope.litarGrupo();
    }
   
    $scope.mntMenu = {
        'txtCodigo': '',
        'txtNombre': '',
        'txtRuta': '',
        'cboGrupo': '',
        'cboEstado':'',
        'Opcion': ''
    }
    /*registrar*/
    $scope.registrar = function () {
        $('#modal-menu').modal('show');
        $scope.mntMenu.txtCodigo = 0,
        $scope.mntMenu.txtNombre = '',
        $scope.mntMenu.txtRuta = '',
        $scope.mntMenu.cboGrupo = '',
        $scope.mntMenu.cboEstado = '',
        $scope.mntMenu.Opcion = 1

    }
    /*actualizar*/
    $scope.actualizar = function (item) {
        $('#modal-menu').modal('show');
        $scope.mntMenu.txtCodigo = item.ID_MEN,
        $scope.mntMenu.txtNombre = item.NOM_MEN,
        $scope.mntMenu.txtRuta = item.RUT_MEN,
        $scope.mntMenu.cboGrupo = item.ID_GRU.toString(),
        $scope.mntMenu.cboEstado = item.ID_EST_MEN.toString(),
        $scope.mntMenu.Opcion = 2
    }
    /*eliminar*/
    $scope.eliminar = function (item) {
        $('#modal-eliminar').modal('show');
        $scope.mntMenu.txtCodigo = item.ID_MEN,
        $scope.mntMenu.txtNombre = item.NOM_MEN,
        $scope.mntMenu.txtRuta = item.RUT_MEN,
        $scope.mntMenu.cboGrupo = item.ID_GRU.toString(),
        $scope.mntMenu.cboEstado = item.ID_EST_MEN.toString(),
        $scope.mntMenu.Opcion = 3
    }



    $scope.confirmar = function () {
        var _parametros = {
            Opcion: $scope.mntMenu.Opcion,
            IdMen: $scope.mntMenu.txtCodigo,
            NomMen: $scope.mntMenu.txtNombre,
            RutMen: $scope.mntMenu.txtRuta,
            IdGru: $scope.mntMenu.cboGrupo,
            IdEstMen:$scope.mntMenu.cboEstado
        }
        console.dir(_parametros)
        GeneralService.TypePost('menu', 'mntMenu', _parametros)
            .success(function (response) {
                $('#modal-menu').modal('hide');
                $('#modal-eliminar').modal('hide');
                $scope.listarMenu();
                console.log(response);
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

    initController();
});
