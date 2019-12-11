(function () {
    var serviceGeneral = function ($http) {
        var baseUrl = _URLBackEnd;
        var baseUrlPublic = _URLBackEndPublic;
        var TypeGet = function (Api, Method, _params) {
            var url = baseUrl + Api + "/" + Method;
            return $http.get(url, { params: _params });
        }
        var TypePost = function (Api, Method, _param) {
            var url = baseUrl + Api + "/" + Method;
            if (_param) {
                return $http({
                    method: 'POST',
                    //contenttype: 'application/json; charset=utf-8',
                    url: url,
                    data: $.param(_param),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                })
            }
            else {
                return $http({
                    method: 'POST',
                    //contenttype: 'application/json; charset=utf-8',
                    url: url,
                    headers: { "Content-Type": "application/x-www-form-urlencoded", },
                })
            }
        };
        var TypePostPublic = function (Api, Method, _param) {
            var url = baseUrlPublic + Api + "/" + Method;
            if (_param) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: $.param(_param),
                    headers: {"Content-Type": "application/x-www-form-urlencoded",},
                })
            }
            else {
                return $http({
                    method: 'POST',
                    url: url,
                    headers: { "Content-Type": "application/x-www-form-urlencoded", },
                })
            }
        };
        return {
            TypeGet: TypeGet,
            TypePost: TypePost, 
            TypePostPublic: TypePostPublic,
        };
    };
    angular.module('commonServiceGeneral', []).factory("GeneralService", serviceGeneral);
})();

