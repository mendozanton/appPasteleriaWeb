app.controller('principalController', function (
    DTOptionsBuilder,
    $location,
    $localStorage,
    $scope,
    AuthenticationService,
    GeneralService) {
    /*************CORE ANGULAR DATATABLES*************/
    $scope.dtOptions = DTOptionsBuilder.fromSource()
        .withPaginationType('full_numbers')
        .withOption('responsive', true)
        .withOption('paging', true)
        .withOption('lengthChange', false)
        .withOption('searching', false)
        .withOption('ordering', true)
        .withOption('info', true)
        .withOption('autoWidth', false);
    /*jquery.dataTables.js*/
    /************************************************/
    var urlApiFacebook = _URLApiFacebook;
    var idRol = _IdRol;
    var idPerfilCliente = _IdPerfilCliente;
    var idPerfilEspecialista = _IdPerfilEspecialista;
    $scope.idPerfil = _IdPerfilCliente;
    $scope.showLogin = true;
    $scope.showRegister = true;
    $scope.showIntranet = false;
    $scope.showLoginLandingPage = true;
    $scope.usuario = JSON.parse(localStorage.getItem('datos'));

    $scope.principal = {
        nombreRegister: '',
        apellidoRegister: '',
        correoRegister: '',
        imagenRegister: '../../../src/img/avatar.png',
        nombreUsuarioRegister: '',
        contrasenaRegister: '',
        nombreUsuarioLogin: '',
        contrasenaLogin: '',
    };
  
    $scope.clickSolicitante = function () {
        document.getElementById("idSolicitante").style.backgroundColor = "#4CAF50";
        document.getElementById("idSolicitante").style.color = "#FFFFFF";
        document.getElementById("idEspecialista").style.backgroundColor = "#f8f9fa";
        document.getElementById("idEspecialista").style.color = "#484848";
        $scope.idPerfil = _IdPerfilCliente;
    }

    $scope.clickEspecialista = function () {
        document.getElementById("idSolicitante").style.backgroundColor = "#f8f9fa";
        document.getElementById("idSolicitante").style.color = "#484848";
        document.getElementById("idEspecialista").style.backgroundColor = "#4CAF50";
        document.getElementById("idEspecialista").style.color = "#FFFFFF";
        $scope.idPerfil = _IdPerfilEspecialista;
    }

    $scope.confirmar = function () {
        $scope.loading = true;
        var _parametros = {
            Opcion: 1,
            PriNomUsu: $scope.principal.nombreRegister,
            ApePatUsu: $scope.principal.apellidoRegister,
            ImaUsu: $scope.principal.imagenRegister,
            EmaUsu: $scope.principal.correoRegister,
            LogUsu: $scope.principal.nombreUsuarioRegister,
            PwdUsu: $scope.principal.contrasenaRegister,
            IdEstUsu: ($scope.idPerfil == 6 ? 1 : 4 ),
            IdRol: idRol,
            IdPer: $scope.idPerfil,
            Origen: 1
        }
        console.dir(_parametros);
        GeneralService.TypePost('usario', 'mtUsuario', _parametros)
            .success(function (response) {
                console.log(response);
                if (response.nMsjCode == 200) {
                    $scope.login();
                }
                else {
                    $scope.loading = false;
                }
            })
            .error(function (error) {
                jsAlert('error', 'Error', error.cMsjDetaill, 5000,'toast-top-full-width');
            });
    };

    $scope.login = function () {
        $('.toast').css('display', 'none');
        $scope.loading = true;
        var usuario = ($scope.principal.nombreUsuarioLogin == "" ? $scope.principal.nombreUsuarioRegister : $scope.principal.nombreUsuarioLogin);
        var contrasena = ($scope.principal.contrasenaLogin == "" ? $scope.principal.contrasenaRegister : $scope.principal.contrasenaLogin)
        AuthenticationService.Login(1, usuario, contrasena, '', '', '', '', '', function (result) {
            if (result === true) { 
                $scope.flagGuia = localStorage.getItem('flagGuia');
                if ($scope.flagGuia) {
                    if ($scope.flagGuia == 1) {
                        $location.path('/home');
                        localStorage.removeItem('flagGuia');
                        localStorage.setItem('flagGuia', 1);
                    }
                    if ($scope.flagGuia == 2) {
                        $location.path('/perfil');
                        localStorage.removeItem('flagGuia');
                        localStorage.setItem('flagGuia', 3);
                    }
                }
                else {
                    $location.path('/home');
                    localStorage.removeItem('flagGuia');
                    localStorage.setItem('flagGuia', 1);
                }
               
                
            } else {
                $scope.loading = false;
            }
        });
    };

   
    /*INICIO LOGIN FACEBOOK*/
    /*(function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/es_LA/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
        FB.init({
            appId: urlApiFacebook,
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v4.0'
        });
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response, function () { });
        });
    };
    function statusChangeCallback(response, callback) {
        if (response.status === 'connected') {
            getFacebookData();

        } else {
            callback(false);
        }
    }
    function checkLoginState(callback) {
        FB.getLoginStatus(function (response) {
            callback(response);
        });
    }
    function getFacebookData() {
        FB.api('/me?fields=name,email,picture.type(large)', function (response) {
            $scope.data = {
                id: response.id,
                nombre: response.name,
                email: response.email,
                imagen: response.picture.data.url,
                token: ''
            };
            localStorage.setItem('Facebook', JSON.stringify($scope.data));
            $scope.loginFacebookGoogle();       
        });
    }
    function facebookLogin() {
        checkLoginState(function (data) {
            if (data.status !== 'connected') {
                FB.login(function (response) {
                    if (response.status === 'connected')
                        getFacebookData();
                }, { scope: 'email' });
            }
        })
    }
    function facebookLogout() {
        checkLoginState(function (data) {
            if (data.status === 'connected') {
                FB.logout(function (response) {
                })
            }
        })
    }
    $scope.loginF = function () {
        facebookLogin();
    }*/
    /*FIN LOGIN FACEBOOK*/

    /*INICIO GOOGLE API*/
    /*gapi.load('auth2', () => {
        auth2 = gapi.auth2.init({
            client_id: '993520066805-5pisomc284no3gdpjr1t1gp5ljg8aurv.apps.googleusercontent.com',
            scope: 'profile'
        });
        auth2.attachClickHandler(document.getElementById('loginG'), {},
            (googleUser) => {
                $scope.data = {
                    id: googleUser.El,
                    nombre: googleUser.getBasicProfile().getName(),
                    email: googleUser.getBasicProfile().getEmail(),
                    imagen: googleUser.getBasicProfile().getImageUrl(),
                    token: googleUser.getAuthResponse().id_token
                }
                localStorage.setItem('Google', JSON.stringify($scope.data));
                $scope.loginFacebookGoogle();         
            });
    });

    $scope.signOut = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('saliste')
            //jsAlert('info', 'Aviso', 'Haz salido de google', 4000);   
        });
        auth2.disconnect();
    }*/
    /*FIN GOOGLE API*/

    $scope.loginFacebookGoogle = function () {
        AuthenticationService.Login(2, '', '', $scope.data.id, $scope.data.email, $scope.data.nombre,
            $scope.data.nombre, $scope.data.imagen, function (result) {
                if (result === true) {
                    $location.path('/home');
                } else {
                    facebookLogout();
                    $scope.signOut();
                    AuthenticationService.Logout();
                    location.reload();
                    $('.toast').css('display', 'none');
                }
            });
    };

    $scope.logaut = function () {       
        //facebookLogout();
        //$scope.signOut();
        AuthenticationService.Logout();
        $('.toast').css('display', 'none');
    }

    $scope.recargaData = function () {
        var _parametros = {
            Opcion: 3,
            IdUsu: $scope.usuario.ID_USU
        }
        GeneralService.TypePost('authenticate', 'reloadUserData', _parametros)
            .success(function (response) {
                if (response.nMsjCode == 200) {
                    localStorage.setItem('datos', JSON.stringify(response.DtCollection[0]));
                    $scope.usuario = JSON.parse(localStorage.getItem('datos'));
                    //if ($location.path() == '/home/registroPerfil/6') {
                    //    $location.path('/home');
                    //}
                }
            })
            .error(function (error) {
                jsAlert('error', 'Error', error, 3000, 'toast-top-full-width');
            })
    };

    function iniciar() {

        if ($localStorage.usuario) {
            $scope.showLogin = false;
            $scope.showRegister = false;
            $scope.showIntranet = true;
            $scope.showLoginLandingPage = false;
            $scope.recargaData();
        }
    }
    iniciar();
});
