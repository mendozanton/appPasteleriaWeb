app.controller('05portafolioPerfilController', function ($scope, GeneralService, $location) {
    var archivo1 = new Array();
    var archivo2 = new Array();
    var archivo3 = new Array();
    $scope.arrayEnvio = [];
    $scope.image1 = '../../../../../src/img/proyect.png';
    $scope.image2 = '../../../../../src/img/proyect.png';
    $scope.image3 = '../../../../../src/img/proyect.png';

    var file1 = document.getElementById('fileUpload1');
    var file2 = document.getElementById('fileUpload2');
    var file3 = document.getElementById('fileUpload3');

    var uploader1 = document.getElementById('uploader1');
    var uploader2 = document.getElementById('uploader2');
    var uploader3 = document.getElementById('uploader3');

    file1.addEventListener('change', previewImage1);
    file2.addEventListener('change', previewImage2);
    file3.addEventListener('change', previewImage3);

    $scope.mntPortafolio = {
        imagePortafolio1: '',
        imagePortafolio2: '',
        imagePortafolio3: '',
    }

    function previewImage1(e) {
        archivo1 = e.target.files[0];
        console.log(archivo1);
        var fileName = archivo1.name;
        console.log(fileName);
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (archivo1.size < 2097152) {//2MB MAXIMO
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                var file = archivo1;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    $('#image1').attr('src', reader.result);
                    $('#image1').data('edit', 1);
                };
            }
        }
        else {
            alert('El tamaño de la imagen supera lo permitido')
        }
    }

    function previewImage2(e) {
        archivo2 = e.target.files[0];
        console.log(archivo2);
        var fileName = archivo2.name;
        console.log(fileName);
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (archivo2.size < 2097152) {//2MB MAXIMO
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                var file = archivo2;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    $('#image2').attr('src', reader.result);
                    $('#image2').data('edit', 1);
                };
            }
        }
        else {
            alert('El tamaño de la imagen supera lo permitido')
        }
    }

    function previewImage3(e) {
        archivo3 = e.target.files[0];
        console.log(archivo3);
        var fileName = archivo3.name;
        console.log(fileName);
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (archivo3.size < 2097152) {//2MB MAXIMO
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                var file = archivo3;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    $('#image3').attr('src', reader.result);
                    $('#image3').data('edit', 1);
                };
            }
        }
        else {
            alert('El tamaño de la imagen supera lo permitido')
        }
    }

    $scope.uploadImage1 = function () {
        $scope.spinner = true;
        var storageRef = firebase.storage().ref('imagenes/' + archivo1.name);
        var task = storageRef.put(archivo1);
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader1.value = percentage;
            },
            function error(err) {
                console.log(err);
            },
            function complete() {
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    $scope.mntPortafolio.imagePortafolio1 = downloadURL;
                    console.log($scope.mntPortafolio.imagePortafolio1);
                    $scope.arrayEnvio.push($scope.mntPortafolio.imagePortafolio1);
                });
            }
        );
    };

    $scope.uploadImage2 = function () {
        $scope.spinner = true;
        var storageRef = firebase.storage().ref('imagenes/' + archivo2.name);
        var task = storageRef.put(archivo2);
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader2.value = percentage;
            },
            function error(err) {
                console.log(err);
            },
            function complete() {
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    $scope.mntPortafolio.imagePortafolio2 = downloadURL;
                    console.log($scope.mntPortafolio.imagePortafolio2);
                    $scope.arrayEnvio.push($scope.mntPortafolio.imagePortafolio2);
                });
            }
        );
    };

    $scope.uploadImage3 = function () {
        $scope.spinner = true;
        var storageRef = firebase.storage().ref('imagenes/' + archivo3.name);
        var task = storageRef.put(archivo3);
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader3.value = percentage;
            },
            function error(err) {
                console.log(err);
            },
            function complete() {
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    $scope.mntPortafolio.imagePortafolio3 = downloadURL;
                    console.log($scope.mntPortafolio.imagePortafolio3);  
                    $scope.arrayEnvio.push($scope.mntPortafolio.imagePortafolio3);
                });
            }
        );
    };
    $scope.anterior05 = function () {
        /// $location.path('/home/registroPerfil/4')
        console.log($scope.arrayEnvio);
    }

    $scope.confirmar05 = function () {
        $scope.uploadImage1();
        $scope.uploadImage2();
        $scope.uploadImage3();
        for (var i = 0; i < $scope.typeServices.length; i++) {
            var _parametros = {
                Opcion: 4,
                IdUsu: $scope.usuario.Id,
                IdTipServ: $scope.typeServices[i]
            }
            GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
                .success(function (response) {
                    if (response.cMsj == "OK") {
                        contador = contador + 1
                        console.log("contador" + contador);
                        if ($scope.typeServices.length == contador) {
                            var _parametros = { Opcion: 5, IdUsu: $scope.usuario.Id }
                            GeneralService.TypePost('tipoServicio', 'asignarServicioAUsuario', _parametros)
                                .success(function (response) { $location.path('/home/registroPerfil/2'); })
                        }
                    }
                }).error(function (error) { });
        }
    }
});
