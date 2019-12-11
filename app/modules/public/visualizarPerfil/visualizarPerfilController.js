app.controller('visualizarPerfilController', function ($scope, GeneralService, $localStorage, $location) {
    $scope.titulo = "Mi perfil";
    $scope.listarEstudio = [];
    $scope.listaAdicional = [];
    $scope.listaServicio = [];
    $scope.listaTipoServicioPerfil = [];
    $scope.listaDetalleUsuarioPerfil = [];
    $scope.listaUsuarioPerfil = [];
    $scope.listaCaracteristica = [];
    $scope.tipoServicioShow == false;
    $scope.parametroPerfilUsuario = localStorage.getItem('perfilUsuario');
    var urlFrontEnd = _URLFrontEnd;

    $scope.listarEstudio = function () {
        var _parametros = {
            Opcion: 4,
            IdUsu: $scope.parametroPerfilUsuario
        }
        GeneralService.TypePost('estudio', 'mntEstudio', _parametros)
            .success(function (response) {
                $scope.listaEstudio = response.DtCollection;
            });
    };

    $scope.listarCaracteristica = function () {
        var _parametros = {
            IdUsu: $scope.parametroPerfilUsuario
        }
        GeneralService.TypePost('adicional', 'lstAdicional', _parametros)
            .success(function (response) {
                $scope.listaCaracteristica = response.DtCollection;
                console.log($scope.listaCaracteristica)
            });
    };

    $scope.listarServicio = function () {
        var _parametros = {
            Opcion: 1,
            IdUsu: $scope.parametroPerfilUsuario
        }
        GeneralService.TypePost('tipoServicio', 'perfilServicio', _parametros)
            .success(function (response) {
                $scope.listaServicio = response.DtCollection;
                console.log(response);
            });
    };

    $scope.listarTipoServicioPerfil = function () {
        var _parametros = {
            Opcion: 2,
            IdUsu: $scope.parametroPerfilUsuario
        }
        GeneralService.TypePost('tipoServicio', 'perfilServicio', _parametros)
            .success(function (response) {
                $scope.listaTipoServicioPerfil = response.DtCollection;
                console.log($scope.listaTipoServicioPerfil);
            });
    };

    $scope.listarDetalleUsuarioPerfil = function () {
        var _parametros = {
            Opcion: 4,
            IdUsu: $scope.parametroPerfilUsuario
        }
        GeneralService.TypePost('usuario', 'mntDetalleUsuario', _parametros)
            .success(function (response) { 
                $scope.listaDetalleUsuarioPerfil = response.DtCollection[0];
                $scope.verDetallePerfil = {
                    codigo: response.DtCollection[0].ID_USU,
                    fechaNacimiento: '',//new Date('2019-11-01T05:00:00.000Z'),
                    telefono: '',
                    celular: response.DtCollection[0].CEL_USU,
                    direccion: response.DtCollection[0].DIR_USU,
                    referencia: response.DtCollection[0].REF_USU,
                    descripcion: response.DtCollection[0].DES_USU,
                    seu: response.DtCollection[0].SEU_USU,
                    pais: '',
                    sexo: '',
                    pais: '',
                    departamento: response.DtCollection[0].DES_DEP_UBIGEO,
                    provincia: response.DtCollection[0].DES_PRO_UBIGEO,
                    distrito: response.DtCollection[0].DES_UBIGEO,
                    opcion: 1,
                    dni: ''
                }
            })
    };

    $scope.listarUsuarioPerfil = function () {
        var _parametros = {
            Opcion: 3,
            IdUsu: $scope.parametroPerfilUsuario
        }
        GeneralService.TypePost('authenticate', 'reloadUserData', _parametros)
            .success(function (response) {
                if (response.nMsjCode == 200) {
                    $scope.listaUsuarioPerfil = response.DtCollection[0];
                    $scope.verUsuarioPerfil = {
                        nombre: response.DtCollection[0].PRI_NOM_USU,
                        apellidoPaterno: response.DtCollection[0].APE_PAT_USU,
                        apellidoMaterno: response.DtCollection[0].APE_MAT_USU,
                        email: response.DtCollection[0].EMA_USU,
                        imagen: response.DtCollection[0].IMA_USU,           
                    }
                }
            });
    }

    $scope.listarPregunta = function () {
        var _parametros = { Opcion: 2 }
        GeneralService.TypePost('pregunta', 'lstPregunta', _parametros)
            .success(function (response) { $scope.pregunta = response.DtCollection; console.log(response) })
            .error(function (error) { console.log(error) });
    };

    $scope.Fil = {
        Colaborador: ''
    }

    $scope.solicitudPresu = {
        codigo: '',
        fechaSoli: '',
        idTipoServicio: '',
        idEstadoSolicitud: 1,
        codigoPregunta01: 0,
        codigoPregunta02: 0,
        codigoPregunta03: 0,
        numerContac: '',
        correContac: '',
        idUsuarioSol: '',
        idUsuarioEsp: $scope.parametroPerfilUsuario
    }

    $scope.solicitud = {
        codigoSolicitud: 0,
    }
    $scope.VerPer = function () {
        $scope.solicitud.codigoServicio = ''
        for (i = 0; i < $scope.listaServicio.length; i++) {
            if ($scope.listaServicio[i].DES_SERV == $scope.Fil.Colaborador) {
                $scope.solicitud.codigoServicio = $scope.listaServicio[i].ID_SERV;
            }
        }
    }

    $scope.preSolicitarPresupuesto = function () {
        $('#modal-solicitarServicio').modal('show');
        $scope.solicitudPresu = {
            codigo: '',
            fechaSoli: '',
            idTipoServicio: '',
            idEstadoSolicitud: 1,
            codigoPregunta01: 0,
            codigoPregunta02: 0,
            codigoPregunta03: 0,
            numerContac: '',
            correContac: '',
            idUsuarioSol: '',
            idUsuarioEsp: $scope.parametroPerfilUsuario
        }
        $scope.Fil = {
            Colaborador: ''
        }
    };
    $scope.solicitarPresupuesto = function () {
        if ($localStorage.usuario) {
            if ($scope.solicitudPresu.idTipoServicio == '' ||
                $scope.solicitudPresu.codigoPregunta01 == 0 ||
                $scope.solicitudPresu.codigoPregunta02 == 0 ||
                $scope.solicitudPresu.codigoPregunta03 == 0 ||  
                $scope.solicitudPresu.numerContac == '' ||
                $scope.solicitudPresu.correContac == '') {
                jsAlert('warning', '¡Aviso!', 'Ingrese todos los campos requeridos', 2000, 'toast-top-full-width');
            } else {
                var _parametros = {
                    Opcion: 1,
                    FecSoli: $scope.solicitudPresu.fechaSoli,
                    IdTipServ: $scope.solicitudPresu.idTipoServicio,
                    IdEstSol: $scope.solicitudPresu.idEstadoSolicitud,
                    PregUno: $scope.solicitudPresu.codigoPregunta01,
                    PregDos: $scope.solicitudPresu.codigoPregunta02,
                    PregTres: $scope.solicitudPresu.codigoPregunta03,
                    NumeContac: $scope.solicitudPresu.numerContac,
                    CorrContac: $scope.solicitudPresu.correContac,
                    IdUsuSol: $scope.usuario.ID_USU,
                    IdUsuEsp: $scope.parametroPerfilUsuario
                }
                console.dir(_parametros);
                GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
                    .success(function (response) {
                        console.log(response);
                        $('#modal-solicitarServicio').modal('hide');
                        jsAlert('success', '¡Exito!', 'La solicitud fue enviada exitosamente', 4000, 'toast-top-full-width');
                    });
            } 
        }
        else {
            if ($scope.solicitudPresu.idTipoServicio == '' ||
                $scope.solicitudPresu.codigoPregunta01 == 0 ||
                $scope.solicitudPresu.codigoPregunta02 == 0 ||
                $scope.solicitudPresu.codigoPregunta03 == 0 ||
                $scope.solicitudPresu.numerContac == '' ||
                $scope.solicitudPresu.correContac == '') {
                jsAlert('warning', '¡Aviso!', 'Ingrese todos los campos requeridos', 2000, 'toast-top-full-width');
            } else {
                $('#modal-solicitarServicio').modal('hide');
                localStorage.removeItem('flagGuia');
                localStorage.setItem('flagGuia', 2);
                localStorage.removeItem('solicitudTemporal');
                localStorage.setItem('solicitudTemporal', JSON.stringify($scope.solicitudPresu));
                setTimeout(function () {
                    window.location.href = urlFrontEnd + 'login';
                }, 100);
            }    
        }
    };

    $scope.envioSolicitudDespuesLogueado = function () {
        $scope.SolicitudTemporalParse = localStorage.getItem('solicitudTemporal');
        $scope.SolicitudTemporal = JSON.parse($scope.SolicitudTemporalParse);
        console.log($scope.SolicitudTemporal)
        var _parametros = {
            Opcion: 1,
            FecSoli: $scope.SolicitudTemporal.fechaSoli,
            IdTipServ: $scope.SolicitudTemporal.idTipoServicio,
            IdEstSol: $scope.SolicitudTemporal.idEstadoSolicitud,
            PregUno: $scope.SolicitudTemporal.codigoPregunta01,
            PregDos: $scope.SolicitudTemporal.codigoPregunta02,
            PregTres: $scope.SolicitudTemporal.codigoPregunta03,
            NumeContac: $scope.SolicitudTemporal.numerContac,
            CorrContac: $scope.SolicitudTemporal.correContac,
            IdUsuSol: $scope.usuario.ID_USU,
            IdUsuEsp: $scope.parametroPerfilUsuario
        }
        console.dir(_parametros);
        GeneralService.TypePost('solicitud', 'mntSolicitud', _parametros)
            .success(function (response) {
                console.log(response);
                jsAlert('success', '¡Exito!', 'La solicitud fue enviada exitosamente', 4000, 'toast-top-full-width');
                localStorage.removeItem('flagGuia');
                localStorage.setItem('flagGuia', 1);
            });
    }
    function iniciar() {
        $scope.listarEstudio();
        $scope.listarServicio();
        $scope.listarTipoServicioPerfil();
        $scope.listarDetalleUsuarioPerfil();
        $scope.listarUsuarioPerfil();
        $scope.listarCaracteristica();

        
        $scope.flagGuia = localStorage.getItem('flagGuia');
        if ($scope.flagGuia) {
            if ($scope.flagGuia == 3) {          
                $scope.envioSolicitudDespuesLogueado();
            }
        }
    }
    iniciar();
});
/*
IF OBJECT_ID('USP_MNT_SOLICITUD')IS NOT NULL
	DROP PROC USP_MNT_SOLICITUD
GO
CREATE PROC USP_MNT_SOLICITUD(
@OPCION INT = 0,
@ID_USU_SOL INT = 0,
@ID_USU_ESP INT = 0,
@ID_SOLI INT = 0,
@FEC_SOLI VARCHAR(MAX) = NULL,
@ID_TIP_SERV INT = 0,
@ID_EST_SOL INT = 0,
@PREG_UNO INT = 0,
@PREG_DOS INT = 0,
@PREG_TRES INT = 0,
@NUME_CONTAC VARCHAR(80) = NULL,
@CORR_CONTAC VARCHAR(80) = NULL
)
AS
BEGIN
	IF @OPCION = 1
	BEGIN
		INSERT INTO SOLICITUD VALUES((SELECT CONVERT (date, SYSDATETIME())), @ID_TIP_SERV, 
		@ID_EST_SOL, @PREG_UNO, @PREG_DOS, @PREG_TRES, @ID_USU_ESP, @NUME_CONTAC, @CORR_CONTAC)
		INSERT INTO SOLICITUD_USUARIO VALUES ((SELECT MAX(ID_SOLI) FROM SOLICITUD S), @ID_USU_SOL)		
	END
	ELSE IF @OPCION = 4
	BEGIN
		IF @ID_USU_SOL != 0
		BEGIN
			SELECT S.ID_SOLI, S.FEC_SOLI, S.ID_TIP_SERV, TS.DES_TIP_SERV, S.ID_EST_SOLI , ES.DES_EST_SOLI, 
			S.PREG_UNO, (SELECT P1.DES_PREG FROM PREGUNTA P1 WHERE P1.ID_PREG = S.PREG_UNO),
			S.PREG_DOS, (SELECT P2.DES_PREG FROM PREGUNTA P2 WHERE P2.ID_PREG = S.PREG_DOS),
			S.PREG_TRES, (SELECT P3.DES_PREG FROM PREGUNTA P3 WHERE P3.ID_PREG = S.PREG_TRES),
			S.NUME_CONTAC, S.CORR_CONTAC, SU.ID_USU,
			(SELECT UU.PRI_NOM_USU FROM USUARIO UU WHERE UU.ID_USU = S.ID_USU) AS PRI_NOM_USU_ESPECIALISTA,
			(SELECT UU.APE_PAT_USU FROM USUARIO UU WHERE UU.ID_USU = S.ID_USU) AS APE_PAT_USU_ESPECIALISTA,
			(SELECT UU.APE_MAT_USU FROM USUARIO UU WHERE UU.ID_USU = S.ID_USU) AS APE_MAT_USU_ESPECIALISTA,
			(SELECT UU.IMA_USU FROM USUARIO UU WHERE UU.ID_USU = S.ID_USU) AS IMA_USU_ESPECIALISTA
			FROM SOLICITUD S INNER JOIN ESTADO_SOLICITUD ES ON S.ID_EST_SOLI = ES.ID_EST_SOLI
			INNER JOIN TIPO_SERVICIO TS ON S.ID_TIP_SERV = TS.ID_TIP_SERV INNER JOIN SOLICITUD_USUARIO SU
			ON S.ID_SOLI = SU.ID_SOLI
			WHERE SU.ID_USU = @ID_USU_SOL AND S.ID_EST_SOLI = 1 OR S.ID_EST_SOLI = 2
		END
		ELSE IF @ID_USU_ESP != 0
		BEGIN
			SELECT S.ID_SOLI, S.FEC_SOLI, S.ID_TIP_SERV, TS.DES_TIP_SERV, S.ID_EST_SOLI , ES.DES_EST_SOLI, 
			S.PREG_UNO, (SELECT P1.DES_PREG FROM PREGUNTA P1 WHERE P1.ID_PREG = S.PREG_UNO),
			S.PREG_DOS, (SELECT P2.DES_PREG FROM PREGUNTA P2 WHERE P2.ID_PREG = S.PREG_DOS),
			S.PREG_TRES, (SELECT P3.DES_PREG FROM PREGUNTA P3 WHERE P3.ID_PREG = S.PREG_TRES),
			S.NUME_CONTAC, S.CORR_CONTAC, 
			SU.ID_USU,
			(SELECT UU.PRI_NOM_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS PRI_NOM_USU,
			(SELECT UU.APE_PAT_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS APE_PAT_USU,
			(SELECT UU.APE_MAT_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS APE_MAT_USU,
			(SELECT UU.IMA_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS IMA_USU
			FROM SOLICITUD S INNER JOIN ESTADO_SOLICITUD ES ON S.ID_EST_SOLI = ES.ID_EST_SOLI
			INNER JOIN TIPO_SERVICIO TS ON S.ID_TIP_SERV = TS.ID_TIP_SERV INNER JOIN SOLICITUD_USUARIO SU
			ON S.ID_SOLI = SU.ID_SOLI
			WHERE S.ID_USU = @ID_USU_ESP AND S.ID_EST_SOLI = 1 OR S.ID_EST_SOLI = 2
		END
	END
	ELSE IF @OPCION = 5
	BEGIN
		UPDATE SOLICITUD SET ID_EST_SOLI = 2 WHERE ID_SOLI = @ID_SOLI
	END
	ELSE IF @OPCION = 6
	BEGIN
		UPDATE SOLICITUD SET ID_EST_SOLI = 3 WHERE ID_SOLI = @ID_SOLI
	END
	ELSE IF @OPCION = 7
	BEGIN
	    IF @ID_USU_ESP != 0
		BEGIN
			SELECT S.ID_SOLI, S.FEC_SOLI, S.ID_TIP_SERV, TS.DES_TIP_SERV, S.ID_EST_SOLI , ES.DES_EST_SOLI, 
			S.PREG_UNO, (SELECT P1.DES_PREG FROM PREGUNTA P1 WHERE P1.ID_PREG = S.PREG_UNO),
			S.PREG_DOS, (SELECT P2.DES_PREG FROM PREGUNTA P2 WHERE P2.ID_PREG = S.PREG_DOS),
			S.PREG_TRES, (SELECT P3.DES_PREG FROM PREGUNTA P3 WHERE P3.ID_PREG = S.PREG_TRES),
			S.NUME_CONTAC, S.CORR_CONTAC, 
			SU.ID_USU,
			(SELECT UU.PRI_NOM_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS PRI_NOM_USU,
			(SELECT UU.APE_PAT_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS APE_PAT_USU,
			(SELECT UU.APE_MAT_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS APE_MAT_USU,
			(SELECT UU.IMA_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS IMA_USU
			FROM SOLICITUD S INNER JOIN ESTADO_SOLICITUD ES ON S.ID_EST_SOLI = ES.ID_EST_SOLI
			INNER JOIN TIPO_SERVICIO TS ON S.ID_TIP_SERV = TS.ID_TIP_SERV INNER JOIN SOLICITUD_USUARIO SU
			ON S.ID_SOLI = SU.ID_SOLI
			WHERE S.ID_USU = @ID_USU_ESP AND S.ID_EST_SOLI = 3 
		END
	END
	ELSE IF @OPCION = 8
	BEGIN
	    IF @ID_USU_ESP != 0
		BEGIN
			SELECT S.ID_SOLI, S.FEC_SOLI, S.ID_TIP_SERV, TS.DES_TIP_SERV, S.ID_EST_SOLI , ES.DES_EST_SOLI, 
			S.PREG_UNO, (SELECT P1.DES_PREG FROM PREGUNTA P1 WHERE P1.ID_PREG = S.PREG_UNO),
			S.PREG_DOS, (SELECT P2.DES_PREG FROM PREGUNTA P2 WHERE P2.ID_PREG = S.PREG_DOS),
			S.PREG_TRES, (SELECT P3.DES_PREG FROM PREGUNTA P3 WHERE P3.ID_PREG = S.PREG_TRES),
			S.NUME_CONTAC, S.CORR_CONTAC, 
			SU.ID_USU,
			(SELECT UU.PRI_NOM_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS PRI_NOM_USU,
			(SELECT UU.APE_PAT_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS APE_PAT_USU,
			(SELECT UU.APE_MAT_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS APE_MAT_USU,
			(SELECT UU.IMA_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS IMA_USU
			FROM SOLICITUD S INNER JOIN ESTADO_SOLICITUD ES ON S.ID_EST_SOLI = ES.ID_EST_SOLI
			INNER JOIN TIPO_SERVICIO TS ON S.ID_TIP_SERV = TS.ID_TIP_SERV INNER JOIN SOLICITUD_USUARIO SU
			ON S.ID_SOLI = SU.ID_SOLI
			WHERE S.ID_USU = @ID_USU_ESP AND S.ID_EST_SOLI = 4
		END
		ELSE IF @ID_USU_SOL != 0
		BEGIN
			SELECT S.ID_SOLI, S.FEC_SOLI, S.ID_TIP_SERV, TS.DES_TIP_SERV, S.ID_EST_SOLI , ES.DES_EST_SOLI, 
			S.PREG_UNO, (SELECT P1.DES_PREG FROM PREGUNTA P1 WHERE P1.ID_PREG = S.PREG_UNO),
			S.PREG_DOS, (SELECT P2.DES_PREG FROM PREGUNTA P2 WHERE P2.ID_PREG = S.PREG_DOS),
			S.PREG_TRES, (SELECT P3.DES_PREG FROM PREGUNTA P3 WHERE P3.ID_PREG = S.PREG_TRES),
			S.NUME_CONTAC, S.CORR_CONTAC, 
			SU.ID_USU,
			(SELECT UU.PRI_NOM_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS PRI_NOM_USU,
			(SELECT UU.APE_PAT_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS APE_PAT_USU,
			(SELECT UU.APE_MAT_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS APE_MAT_USU,
			(SELECT UU.IMA_USU FROM USUARIO UU WHERE UU.ID_USU = SU.ID_USU) AS IMA_USU,
			(SELECT UU.PRI_NOM_USU FROM USUARIO UU WHERE UU.ID_USU = S.ID_USU) AS PRI_NOM_USU_ESPECIALISTA,
			(SELECT UU.APE_PAT_USU FROM USUARIO UU WHERE UU.ID_USU = S.ID_USU) AS APE_PAT_USU_ESPECIALISTA,
			(SELECT UU.APE_MAT_USU FROM USUARIO UU WHERE UU.ID_USU = S.ID_USU) AS APE_MAT_USU_ESPECIALISTA,
			(SELECT UU.IMA_USU FROM USUARIO UU WHERE UU.ID_USU = S.ID_USU) AS IMA_USU_ESPECIALISTA
			FROM SOLICITUD S INNER JOIN ESTADO_SOLICITUD ES ON S.ID_EST_SOLI = ES.ID_EST_SOLI
			INNER JOIN TIPO_SERVICIO TS ON S.ID_TIP_SERV = TS.ID_TIP_SERV INNER JOIN SOLICITUD_USUARIO SU
			ON S.ID_SOLI = SU.ID_SOLI
			WHERE SU.ID_USU = @ID_USU_SOL AND S.ID_EST_SOLI = 4
		END
	END
	ELSE IF @OPCION = 9
	BEGIN
		UPDATE SOLICITUD SET ID_EST_SOLI = 4 WHERE ID_SOLI = @ID_SOLI
	END
END
GO
*/