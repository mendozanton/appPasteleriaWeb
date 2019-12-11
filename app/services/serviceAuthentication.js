angular.module('app').factory('AuthenticationService', Service);
function Service($http, $localStorage) {
    var urlBackEnd = _URLBackEnd;
    var urlFrontEnd = _URLFrontEnd;
    var service = {};
    service.Login = Login;
    service.Logout = Logout;
    return service;
    function Login(opcion, username, password, idFacebookGoogle, email, priNomUsu, apePatUsu, imaUsu, callback) {
        $http({
            url: urlBackEnd + "authenticate/token",
            contentType: 'application/json; charset=utf-8',
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: $.param({
                Opcion: opcion,
                LogUsu: username,
                PwdUsu: password,
                EmaUsu: email,
                IdUsu: idFacebookGoogle,
                PriNomUsu: priNomUsu,
                ApePatUsu: apePatUsu,
                ImaUsu: imaUsu,
                'grant_type': 'json/application'
            })
        })
            .success(function (response) {
                if (response.CodeStatus == 200) {
                    if (response.Token) {
                        $localStorage.usuario = response.Token;
                        localStorage.setItem('datos', JSON.stringify(response.DtCollection[0]));
                       // $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.usuario.token;
                        callback(true);
                    } else {                       
                        jsAlert('error', 'Error', response.Message, 7000, 'toast-top-full-width');
                        callback(false);
                    }
                }
                else if (response.CodeStatus == 400) {
                    jsAlert('error', 'Error', response.Message, 7000, 'toast-top-full-width'); 
                    callback(false);                       
                }
            })
            .error(function (error) {
                jsAlert('error', 'Error', error, 7000, 'toast-top-full-width');        
                callback(false);   
                       
            });
    }

    function Logout() {
        $http.defaults.headers.common.Authorization = '';
        delete $localStorage.usuario;
       // localStorage.clear();
        localStorage.removeItem('datos');
        localStorage.removeItem('flagGuia');
        localStorage.setItem('flagGuia', 1);
        window.location.href = urlFrontEnd + '/register';/*IMPORTANTE EL ORDEN COMPORTAMIENTO*/
        location.reload();/*IMPORTANTE EL ORDEN CAMBIA COMPORTAMIENTO*/

    };

    //function Login(username, password, callback) {
    //$http.post('/api/authenticate', { username: username, password: password })
    //    .success(function (response) {
    //        if (response.token) { 
    //            $localStorage.currentUser = { username: username, token: response.token };
    //            $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
    //            callback(true);
    //        } else {
    //            callback(false);
    //        }
    //    });
    //}
};
