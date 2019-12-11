var app = angular
    .module('app',
    ['ui.router'
        , 'ngMessages'
        , 'ngStorage'
        , 'datatables'
        , 'commonServiceGeneral'
        , 'loadingMsgDirective'
        , 'validadorNumerico'
        ,'chieffancypants.loadingBar'
        , 'ngAnimate'
        /*'ngMockE2E',*/
    ])
    .config(config)
    .run(run);
function config($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {    
    cfpLoadingBarProvider.includeSpinner = true;
    $urlRouterProvider.otherwise("/");
    var _catP = "app/modules/public/";
    var _catR = "app/modules/restricted/";
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/modules/principal/login.html',
            controller: 'principalController',
            controllerAs: 'vm'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/modules/principal/register.html',
            controller: 'principalController',
            controllerAs: 'vm'
        })
        //Inicio Catelyn Restringido
        .state('home', {
            url: '/home',
            templateUrl: _catR + 'home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })
        .state('home.mntMenu', {
            url: '/mntMenu',
            templateUrl: _catR + 'mntMenu/mntMenu.html',
            controller: 'mntMenuController',
            controllerAs: 'vm'
        })
        .state('home.mntRol', {
            url: '/mntRol',
            templateUrl: _catR + 'mntRol/mntRol.html',
            controller: 'mntRolController',
            controllerAs: 'vm'
        })
        .state('home.mntPerfil', {
            url: '/mntPerfil',
            templateUrl: _catR + 'mntPerfil/mntPerfil.html',
            controller: 'mntPerfilController',
            controllerAs: 'vm',
        })
        .state('home.mntUsuario', {
            url: '/mntUsuario',
            templateUrl: _catR + 'mntUsuario/mntUsuario.html',
            controller: 'mntUsuarioController',
            controllerAs: 'vm',
        })
        .state('home.mntSolicitud', {
            url: '/mntSolicitud',
            templateUrl: _catR + 'mntSolicitud/mntSolicitud.html',
            controller: 'mntSolicitudController',
            controllerAs: 'vm',
        })
        .state('home.mntAtencionSolicitud', {
            url: '/mntAtencionSolicitud',
            templateUrl: _catR + 'mntAtencionSolicitud/mntAtencionSolicitud.html',
            controller: 'mntAtencionSolicitudController',
            controllerAs: 'vm',
        })
        /*----------------------*/
        .state('home.miPerfil', {
            url: '/miPerfil',
            templateUrl: _catR + 'mtnPerfilUsuario/miPerfil.html',
            controller: 'miPerfilController',
            controllerAs: 'vm'
        })
        .state('landingPage.miPerfil', {
            url: '/miPerfil',
            templateUrl: _catR + 'mtnPerfilUsuario/miPerfil.html',
            controller: 'miPerfilController',
            controllerAs: 'vm'
        })
        .state('home.miPerfil.1', {
            url: '/servicios',
            templateUrl: _catR + 'mtnPerfilUsuario/01serviciosPerfil.html',
            controller: '01serviciosPerfilController',
            controllerAs: 'vm'
        })
        .state('home.miPerfil.2', {
            url: '/datosPersonales',
            templateUrl: _catR + 'mtnPerfilUsuario/02datosPerfil.html',
            controller: '02datosPerfilController',
            controllerAs: 'vm'
        })
        .state('home.miPerfil.3', {
            url: '/datosAdicionales',
            templateUrl: _catR + 'mtnPerfilUsuario/03detalleDatosPerfil.html',
            controller: '03detalleDatosPerfilController',
            controllerAs: 'vm'
        })
        .state('home.miPerfil.4', {
            url: '/caracteristicas',
            templateUrl: _catR + 'mtnPerfilUsuario/04caracteristicasPerfil.html',
            controller: '04caracteristicasPerfilController',
            controllerAs: 'vm'
        })
        //.state('home.miPerfil.5', {
        //    url: '/portafolio',
        //    templateUrl: _catR + 'mtnPerfilUsuario/05portafolioPerfil.html',
        //    controller: '05portafolioPerfilController',
        //    controllerAs: 'vm'
        //})
        .state('home.miPerfil.6', {
            url: '/estudios',
            templateUrl: _catR + 'mtnPerfilUsuario/06estudiosPerfil.html',
            controller: '06estudiosPerfilController',
            controllerAs: 'vm'
        })
        /*----------------------*/
        //.state('home.registroPerfil', {
        //    url: '/registroPerfil',
        //    templateUrl: _catR + 'mtnPerfilUsuario/00registroPerfil.html',
        //    controller: 'miPerfilController',
        //    controllerAs: 'vm'
        //})
        .state('home.perfil1', {
            url: '/registroPerfil/1',
            templateUrl: _catR + 'mtnPerfilUsuario/01serviciosPerfil.html',
            controller: '01serviciosPerfilController',
            controllerAs: 'vm'
        })
        .state('home.perfil2', {
            url: '/registroPerfil/2',
            templateUrl: _catR + 'mtnPerfilUsuario/02datosPerfil.html',
            controller: '02datosPerfilController',
            controllerAs: 'vm'
        })
        .state('home.perfil3', {
            url: '/registroPerfil/3',
            templateUrl: _catR + 'mtnPerfilUsuario/03detalleDatosPerfil.html',
            controller: '03detalleDatosPerfilController',
            controllerAs: 'vm'
        })
        .state('home.perfil4', {
            url: '/registroPerfil/4',
            templateUrl: _catR + 'mtnPerfilUsuario/04caracteristicasPerfil.html',
            controller: '04caracteristicasPerfilController',
            controllerAs: 'vm'
        })
        .state('home.perfil5', {
            url: '/registroPerfil/5',
            templateUrl: _catR + 'mtnPerfilUsuario/05portafolioPerfil.html',
            controller: '05portafolioPerfilController',
            controllerAs: 'vm'
        })        
        .state('home.perfil6', {
            url: '/registroPerfil/6',
            templateUrl: _catR + 'mtnPerfilUsuario/06estudiosPerfil.html',
            controller: '06estudiosPerfilController',
            controllerAs: 'vm'
        })
        //Fin Catelyn Restringido

        //Inicio Catelyn Publico
        .state('inicio', {
            url: '/',
            templateUrl: _catP + 'inicio/inicio.html',
            controller: 'inicioController',
            controllerAs: 'vm'
        })
        .state('inicio.landingPage', {
            url: 'landingPage',
            templateUrl: _catP + 'landingPage/landingPage.html',
            controller: 'landingPageController',
            controllerAs: 'vm'
        })
        .state('inicio.perfilPublico', {
            url: 'perfil',
            templateUrl: _catP + 'visualizarPerfil/visualizarPerfil.html',
            controller: 'visualizarPerfilController',
            controllerAs: 'vm'
        })
        .state('inicio.lstEspecialistas', {
            url: 'lstEspecialistas',
            templateUrl: _catP + 'especialistas/especialistas.html',
            controller: 'especialistasController',
            controllerAs: 'vm'
        })
        //Fin Catelyn Publico

    $locationProvider.html5Mode(true);
};
function run($rootScope, $http, $location, $localStorage) {
    // mantener al usuario conectado después de actualizar la página
    if ($localStorage.usuario) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.usuario;    
    }
    // redirigir a la página de inicio de sesión si no ha iniciado sesión e intenta acceder a una página restringida
    $rootScope.$on('$locationChangeStart', function (event, next, current) {     
        var publicPages = ['/landingPage', '/lstEspecialistas', '/perfil', '/register', '/', ''];//aqui paginas publicas
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.usuario) {
            $location.path('/login');//si quiere entrar a una pagina restringida         
        }
        if ($localStorage.usuario) { //aqui paginas a las que no debe entrar si ya esta logueado          
            if ($location.path() == '/login' || $location.path() == '/register') {
                $location.path('/')
            }
            if ($location.path() == '/' || $location.path() == '') {
                $location.path('landingPage')
            }
        }
        if (!$localStorage.usuario) {
            if ($location.path() == '/' || $location.path() == '') {
                $location.path('landingPage')
            }
        }
    });
};
