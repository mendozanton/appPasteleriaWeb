app.controller('03detalleDatosPerfilController', function ($location, $scope, GeneralService) {
    $scope.listaDepartamentoTodo = [];
    $scope.listaProvinciaTodo = [];
    $scope.listaDistritoTodo = [];   
    $scope.listaPais = [];
    $scope.listaDepartamento = [];
    $scope.listaProvincia = [];
    $scope.listaDistrito = [];

    $scope.listarSexo = [{ ID_SEX: 1, NOM_SEX: 'Masculino' },
        { ID_SEX: 2, NOM_SEX: 'Femenino' }];

    $scope.listarPais = function () {
        var _parametros = { Opcion: 1 }
        GeneralService.TypePost('ubigeo', 'lstUbigeo', _parametros)
            .success(function (response) {
                $scope.listaPais = response.DtCollection;
            }).error(function (error) {});
    }

    $scope.listarDepartamentoTodo = function () {
        var _parametros = { Opcion: 2 }
        GeneralService.TypePost('ubigeo', 'lstUbigeo', _parametros)
            .success(function (response) {
                $scope.listaDepartamentoTodo = response.DtCollection;
                console.log(response);
            }).error(function (error) {});
    }
    $scope.listarProvinciaTodo = function () {
        var _parametros = { Opcion: 3 }
        GeneralService.TypePost('ubigeo', 'lstUbigeo', _parametros)
            .success(function (response) {
                $scope.listaProvinciaTodo = response.DtCollection;
                console.log(response);
            }).error(function (error) {});
    }

    $scope.listarDistritoTodo = function () {
        var _parametros = { Opcion: 4 }
        GeneralService.TypePost('ubigeo', 'lstUbigeo', _parametros)
            .success(function (response) {
                $scope.listaDistritoTodo = response.DtCollection;
                console.log(response);
            }).error(function (error) {});
    }

    $scope.listarDepartamento = function () {
        $scope.listaDepartamento = [];
        $scope.mntDetalle.departamento = '';
        $scope.mntDetalle.provincia = '';
        $scope.mntDetalle.distrito = '';
        for (var i = 0; i < $scope.listaDepartamentoTodo.length; i++) {
            if ($scope.listaDepartamentoTodo[i].ID_PADRE_UBIGEO == $scope.mntDetalle.pais) {
                $scope.listaDepartamento.push($scope.listaDepartamentoTodo[i])
            }          
        }
    }

    $scope.listarProvinvia = function () {
        $scope.listaProvincia = [];
        $scope.mntDetalle.provincia = '';
        $scope.mntDetalle.distrito = '';
        for (var i = 0; i < $scope.listaProvinciaTodo.length; i++) {
            if ($scope.listaProvinciaTodo[i].ID_PADRE_UBIGEO == $scope.mntDetalle.departamento) {
                $scope.listaProvincia.push($scope.listaProvinciaTodo[i])
            }
        }
    }

    $scope.listarDistrito = function () {
        $scope.listaDistrito = [];
        $scope.mntDetalle.distrito = '';
        for (var i = 0; i < $scope.listaDistritoTodo.length; i++) {
            if ($scope.listaDistritoTodo[i].ID_PADRE_UBIGEO == $scope.mntDetalle.provincia) {
                $scope.listaDistrito.push($scope.listaDistritoTodo[i])
            }
        }
    }

    $scope.Filtros = {
        Fecha: '',
        Colaborador: ''
    }

    $scope.VerColab = function () {
        $scope.mntDetalle.pais = ''
        for (i = 0; i < $scope.listaPais.length; i++) {
            if ($scope.listaPais[i].NOMBRE_UBIGEO == $scope.Filtros.Colaborador) {
                $scope.mntDetalle.pais = $scope.listaPais[i].ID_UBIGEO;
            }
        }
        $scope.listarDepartamento();
    }

    $scope.listarDetalle = [];

    $scope.listarDetalleUsuario = function () {
        var _parametros = {
            Opcion: 4,
            IdUsu: $scope.usuario.ID_USU
        }
        GeneralService.TypePost('usuario', 'mntDetalleUsuario', _parametros)
            .success(function (response) {
                if (response.DtCollection.length == 0) { }
                else {
                    $scope.mntDetalle.codigo = response.DtCollection[0].ID_USU;
                    $scope.mntDetalle.descripcion = response.DtCollection[0].DES_USU;
                    $scope.mntDetalle.fechaNacimiento = new Date(response.DtCollection[0].FEC_NAC_USU);
                    $scope.mntDetalle.telefono = response.DtCollection[0].TEL_USU;
                    $scope.mntDetalle.celular = response.DtCollection[0].CEL_USU;
                    $scope.mntDetalle.dni = response.DtCollection[0].DOC_IDE_USU;
                    $scope.mntDetalle.sexo = response.DtCollection[0].ID_SEX.toString();
                    $scope.mntDetalle.seu = response.DtCollection[0].SEU_USU;
                    $scope.mntDetalle.direccion = response.DtCollection[0].DIR_USU;
                    $scope.mntDetalle.referencia = response.DtCollection[0].REF_USU;
                    $scope.mntDetalle.pais = response.DtCollection[0].ID_PAI_UBIGEO.toString();
                    $scope.mntDetalle.departamento = response.DtCollection[0].ID_DEP_UBIGEO.toString();
                    var _parametros1 = { Opcion: 2, IdUbigeo: $scope.mntDetalle.pais }
                    GeneralService.TypePost('ubigeo', 'lstUbigeo', _parametros1)
                        .success(function (response1) {
                            $scope.listaDepartamento = response1.DtCollection;
                            var _parametros2 = { Opcion: 3, IdUbigeo: $scope.mntDetalle.departamento }
                            GeneralService.TypePost('ubigeo', 'lstUbigeo', _parametros2)
                                .success(function (response2) {
                                    $scope.listaProvincia = response2.DtCollection;
                                    $scope.mntDetalle.provincia = response.DtCollection[0].ID_PRO_UBIGEO.toString();
                                    var _parametros = { Opcion: 4, IdUbigeo: $scope.mntDetalle.provincia }
                                    GeneralService.TypePost('ubigeo', 'lstUbigeo', _parametros)
                                        .success(function (response3) {
                                            $scope.listaDistrito = response3.DtCollection;
                                            $scope.mntDetalle.distrito = response.DtCollection[0].ID_UBIGEO.toString();
                                        });
                                });
                        });


                }
                
                
            })
    };

    $scope.mntDetalle = {
        codigo: 0,
        fechaNacimiento: '',//new Date('2019-11-01T05:00:00.000Z'),
        telefono: '',
        celular: '',
        direccion: '',
        referencia: '',
        descripcion: '',
        seu: '',       
        pais: '',
        sexo: '',
        pais: '',
        departamento: '',
        provincia:'',
        distrito: '',        
        opcion: 1,
        dni: ''
    }

    $scope.registrarDetalle = function () {
        var _parametros = {
            Opcion: 1,
            IdUsu: $scope.usuario.ID_USU,
            FecNacUsu: $scope.mntDetalle.fechaNacimiento,
            TelUsu: $scope.mntDetalle.telefono,
            CelUsu: $scope.mntDetalle.celular,
            DirUsu: $scope.mntDetalle.direccion,
            RefUsu: $scope.mntDetalle.referencia,
            DesUsu: $scope.mntDetalle.descripcion,
            SeuUsu: $scope.mntDetalle.seu,
            IdSex: $scope.mntDetalle.sexo,
            IdUbigeo: $scope.mntDetalle.distrito,
            IdProUbigeo: $scope.mntDetalle.provincia,
            IdDepUbigeo: $scope.mntDetalle.departamento,
            IdPaiUbigeo: $scope.mntDetalle.pais,
            DocIdeUsu: $scope.mntDetalle.dni,
        }
        console.dir(_parametros)
        GeneralService.TypePost('usuario', 'mntDetalleUsuario', _parametros)
            .success(function (response) {
                
                if ($location.path() == '/home/miPerfil/datosAdicionales') {
                    //jsAlert('success', '¡Exito!', 'Los cambios fueron ejecutados exitosamente', 4000, 'toast-top-full-width');
                    $location.path('/home/miPerfil/datosAdicionales')
                    location.reload();
                }
                if ($location.path() == '/home/registroPerfil/3') {
                    //location.reload(); 
                    $location.path('/home/registroPerfil/4')

                }
            }).error(function (error) {

           });
    }

    $scope.anterior03 = function () {
        $location.path('/home/registroPerfil/2')
    }

    $scope.mostrarOcultarButones = function () {
        if ($location.path() == '/home/miPerfil/datosAdicionales') {
            $scope.groupButton01 = true;
            $scope.groupButton02 = false;
        }
        if ($location.path() == '/home/registroPerfil/3') {
            $scope.groupButton01 = false;
            $scope.groupButton02 = true;
        }
    }

    function iniciar() {
        $scope.listarDetalleUsuario();
        $scope.listarPais();
        $scope.listarDepartamentoTodo();
        $scope.listarProvinciaTodo();
        $scope.listarDistritoTodo();
        $scope.mostrarOcultarButones();

    }
    iniciar();

});
