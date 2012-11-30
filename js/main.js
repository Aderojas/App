$(function(){
    $('#fecha_permiso').scroller({
        preset: 'date',
        invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
        theme: 'jqm',
        display: 'modal',
        mode: 'scroller',
        dateOrder: 'dd mmD yy',
        lang: "es",
        headerText: false,
        dateFormat: 'dd-mm-yy'
    });   
    $('#hora_desde_permiso').scroller({
        preset: 'time',
        invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
        theme: 'jqm',
        display: 'modal',
        mode: 'scroller',
        lang: "es",
        stepMinute: 15,
        headerText: false,
        width: "100"
    });   
    $('#hora_hasta_permiso').scroller({
        preset: 'time',
        invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
        theme: 'jqm',
        display: 'modal',
        mode: 'scroller',
        lang: "es",
        stepMinute: 15,
        headerText: false,
        width: "100"
    });   
    $('#clear_fecha_permiso').click(function () {
        $('#fecha_permiso').val('');
        return false;
    });
    $('#clear_hora_desde_permiso').click(function () {
        $('#hora_desde_permiso').val('');
        return false;
    });
    $('#clear_hora_hasta_permiso').click(function () {
        $('#hora_hasta_permiso').val('');
        return false;
    });
    
    
    for(var i=1;i<=9;i++){
        $('#fecha_sanconsultor'+i).scroller({
            preset: 'date',
            invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
            theme: 'jqm',
            display: 'modal',
            mode: 'scroller',
            dateOrder: 'dd mmD yy',
            lang: "es",
            headerText: false,
            dateFormat: 'dd-mm-yy'
        });
    }
    
    $('#fecha_sanconsultor').scroller({
        preset: 'date',
        invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
        theme: 'jqm',
        display: 'modal',
        mode: 'scroller',
        dateOrder: 'dd mmD yy',
        lang: "es",
        headerText: false,
        dateFormat: 'dd-mm-yy'
    });
    
    $('#clear_fecha_sanconsultor').click(function(){
        $('#fecha_sanconsultor').val('');
    });
    
    $('#hora_desde_zonascomunes').scroller({
        preset: 'time',
        invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
        theme: 'jqm',
        display: 'modal',
        mode: 'scroller',
        lang: "es",
        stepMinute: 15,
        headerText: false,
        width: "100"
    });   
    $('#clear_hora_desde_zonascomunes').click(function(){
        $('#hora_desde_zonascomunes').val('');
    });
    $('#hora_hasta_zonascomunes').scroller({
        preset: 'time',
        invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
        theme: 'jqm',
        display: 'modal',
        mode: 'scroller',
        lang: "es",
        stepMinute: 15,
        headerText: false,
        width: "100"
    });   
    $('#clear_hora_hasta_zonascomunes').click(function(){
        $('#hora_hasta_zonascomunes').val('');
    });
    
    $('#hora_inicial_javiercarrasco').scroller({
        preset: 'time',
        invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
        theme: 'jqm',
        display: 'modal',
        mode: 'scroller',
        lang: "es",
        stepMinute: 15,
        headerText: false,
        width: "100"
    });   
    $('#clear_hora_inicial_javiercarrasco').click(function(){
        $('#hora_inicial_javiercarrasco').val('');
    });
    $('#hora_final_javiercarrasco').scroller({
        preset: 'time',
        invalid: {daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25']},
        theme: 'jqm',
        display: 'modal',
        mode: 'scroller',
        lang: "es",
        stepMinute: 15,
        headerText: false,
        width: "100"
    });   
    $('#clear_hora_final_javiercarrasco').click(function(){
        $('#hora_final_javiercarrasco').val('');
    });
    
});

function comprobar_vacaciones(){}

function Choice(){}

var lFechas = new Array();
$(function(){
    $("#cal_vacaciones a").live("click",function () { 
    var id = sessionStorage.getItem("id_usuario");
    var fecha = $(this).attr("ref");
    var kkt = $(this).parent();
        if($(this).parent().hasClass("green_cell")){
            $(this).parent().removeClass("green_cell");
            var poz = lFechas.indexOf(fecha);
            lFechas.splice(poz,1);
        }else{
        var requests = $.ajax({
            url: 'http://62.93.168.203/intranet/mobile/comprobar_fecha.php',
            data: "date="+fecha+"&idusuario="+id,
            type: "GET",
            crossDomain: true,
            dataType: "html",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(data) {
                if (data != 1){
                    if ((data != -2) && (data != -1)) alert(data);
                    else{
                        var que_hacemos = confirm("¿Quieres anular el dia de vacaciones solicitado?");
                        if(que_hacemos){
                                var requests = $.ajax({
                                    url: 'http://62.93.168.203/intranet/mobile/comprobar_fecha_delete.php',
                                    data: "fecha="+fecha+"&tipo_borrar="+data,
                                    type: "GET",
                                    crossDomain: true,
                                    dataType: "html",
                                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                                    success: function(data) {

                                        alert('Se ha borrado correctamente.');
                                        $("#mesagge").html("Borrar un pedido.");

                                        if (data == 1){
                                                var a = $("#dias_p").html();
                                                $("#dias_p").html(a-1);
                                                a = $("#dias_max").html();
                                                $("#dias_max").html(parseInt(a)+1);
                                                $("#dias").val(parseInt(a)+1);
                                            }
                                        if (data == 0.6){
                                                var a = $("#dias_p_m").html();
                                                $("#dias_p_m").html(a-1);

                                                var mananas = $("#dias_e_m").val();
                                                mananas = parseInt(mananas);
                                                mananas --;
                                                $("#dias_e_m").val(mananas);

                                                var tardes = $("#dias_e_t").val();
                                                tardes = parseInt(tardes);

                                                // tengo 2 posibilidates
                                                if (tardes != mananas){
                                                    var b = $("#tardes_min").html();
                                                    b = parseInt(b);
                                                    $("#tardes_min").html(b-1);
                                                }else{
                                                    $("#mananas_min").html("0");
                                                }
                                                a = $("#dias_max").html();
                                                $("#dias_max").html(parseInt(a)+1);
                                                $("#dias").val(parseInt(a)+1);
                                            }
                                        if (data == 0.4){
                                                var a = $("#dias_p_t").html();
                                                $("#dias_p_t").html(a-1);

                                                var mananas = $("#dias_e_m").val();
                                                mananas = parseInt(mananas);

                                                var tardes = $("#dias_e_t").val();
                                                tardes = parseInt(tardes);
                                                tardes --;
                                                $("#dias_e_t").val(tardes);


                                                // tengo 2 posibilitates
                                                if (tardes != mananas){
                                                    var b = $("#manana_min").html();
                                                    b = parseInt(b);
                                                    $("#manana_min").html(b-1);
                                                }else{
                                                    $("#tardes_min").html("0");
                                                }
                                                a = $("#dias_max").html();
                                                $("#dias_max").html(parseInt(a)+1);
                                                $("#dias").val(parseInt(a)+1);

                                            }

                                        kkt.removeClass("pendientes");
                                        kkt.removeClass("pendientes_mananas");
                                        kkt.removeClass("pendientes_tardes");
                                        kkt.removeClass("vacaciones");
                                        kkt.removeClass("vacaciones_mananas");
                                        kkt.removeClass("vacaciones_tardes");
                                    }
                                });
                            }
                        }
                }else{
                    var max_dias = "";
                    var dias_enteros = "";
                    var tardes = "";
                    var mananas = "";
                    var requests = $.ajax({
                        type: "GET",
                        dataType: "html",
                        crossDomain: true,
                        data: "idusuario="+id,
                        url: "http://62.93.168.203/intranet/mobile/comprobar_fecha_dias.php",
                        cache: false,
                        success: function(data){
                            var datos = data.split("|");
                            
                            max_dias = datos[0];
                            dias_enteros = datos[1];
                            tardes = datos[2];
                            mananas = datos[3];
                        }
                    });
                    
                    var max = 0;
                    if (tardes != null)
                        max = tardes;
                    else
                        tardes = 0;

                    if (mananas != null){
                        if(mananas > max)
                            max = mananas;
                    }else
                        mananas = 0;

                    var mesaj = "No tienes derecho para elegir otro dia.";
                    if (dias_enteros > 0) mesaj += "Puedes elegir " + dias_enteros + "dias enteros.";
                    if (mananas > 0) mesaj += "Puedes elegir " + (mananas) + " mananas.";
                    if (tardes > 0) mesaj += "Puedes elegir " + (tardes) + " tardes.";

                    if (dias_enteros > 0){
                        if (lFechas.length < dias_enteros){
                            kkt.addClass("green_cell");
                            lFechas.push(fecha);
                        }else
                        alert(mesaj);
                    }else if(dias_enteros == 0 && mananas == 0 && tardes == 0){
                        alert(mesaj);
                    }else{
                        if(mananas > 0){
                            if(lFechas.length < mananas){
                                kkt.addClass("green_cell");
                                lFechas.push(fecha);
                            }else
                                alert(mesaj);
                        }
                        if(tardes > 0){
                            if(lFechas.length < tardes){
                                kkt.addClass("green_cell");
                                lFechas.push(fecha);
                            }else
                                alert(mesaj);
                        }
                    }
                }
            }
        })
    }
    });
    
    $("#cal_zonascomunes a").live("click",function () {
        var id = sessionStorage.getItem("id_usuario");
        var fecha = $(this).attr("ref");
        var kkt = $(this).parent();
        if($(this).parent().hasClass("green_cell")){
            $(this).parent().removeClass("green_cell");
            var poz = lFechas.indexOf(fecha);
            lFechas.splice(poz,1);
        }else{
            var requests = $.ajax({
                url: 'http://62.93.168.203/intranet/mobile/comprobar_fecha.php',
                data: "date="+fecha+"&idusuario="+id,
                type: "GET",
                crossDomain: true,
                dataType: "html",
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                success: function(data) {
                    if (data != 1){
                        alert(data);
                    }else{
                        kkt.addClass("green_cell");
                        lFechas.push(fecha);
                    }
                }
            })
        }
    });
    
    $("#cal_javiercarrasco a").live("click",function () { 
        var id = sessionStorage.getItem("id_usuario");
        var fecha = $(this).attr("ref");
        var kkt = $(this).parent();
        if($(this).parent().hasClass("green_cell")){
            $(this).parent().removeClass("green_cell");
            var poz = lFechas.indexOf(fecha);
            lFechas.splice(poz,1);
        }else{
            var requests = $.ajax({
                url: 'http://62.93.168.203/intranet/mobile/comprobar_fecha_javier.php',
                data: "date="+fecha+"&idusuario="+id,
                type: "GET",
                crossDomain: true,
                dataType: "html",
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                success: function(data) {
                    if (data != 1){
                        alert(data);
                    }else{
                        kkt.addClass("green_cell");
                        lFechas.push(fecha);
                    }
                }
            })
        }
    });
    
});

$(document).bind('pageinit', function(event){
    var activePage = event.target.id;
    
    if(activePage == "login"){
        var usuario = localStorage.getItem("usuario");
        if(usuario != ""){
            $("#usuario").val(usuario)
        }
    }
    if(activePage == "home"){
        var idusuario = sessionStorage.getItem("id_usuario");
        
        var requests = $.ajax({
            type: "GET",
            dataType: "html",
            crossDomain: true,
            data: "idusuario="+idusuario,
            url: "http://62.93.168.203/intranet/mobile/DameConsultores.php",
            cache: false,
            success: function(data){
                if(data == "0"){
                    $("#menu_sanconsultor").css("display","none");
                }else{
                    $("#menu_sanconsultor").css("display","");
                }
            }
        });
    }
    /*if(activePage == "ausencias"){
        var scroll = 1;
        //$(window).scroll(function(){
        $(window).on('scroll', function(){
            scroll = $(window).scrollTop();
            
            if(scroll > 1){
                $("#ausencias .ui-header").css("background-color","#ffffff").fadeIn("slow");
                $("#ausencias .ui-header").css("border-bottom","1px solid #999999").fadeIn("slow"); 
            }else{
                $("#ausencias .ui-header").css("background-color","transparent").fadeIn("slow");
                $("#ausencias .ui-header").css("border-bottom","none").fadeIn("slow"); 
            }
        })
    }*/
    /*if(activePage == "empleados"){
        departamentos();
    }*/
    /*if(activePage == "agenda"){
        departamentos_agenda();
    }*/
    /*if(activePage == "seleccionar_alternativa"){
        comprobar_alternativa();
    }*/
    /*if(activePage == "solicitar_permisos"){
        combo_permisos();
    }*/
    /*if(activePage == "solicitar_zonascomunes"){
        provincias();
        mostrar_cal_zonascomunes();
    }*/
    /*if(activePage == "solicitar_javiercarrasco"){
        mostrar_cal_javiercarrasco();
    }*/
});

$(document).ajaxStart(function(){
    checkClickConnection();
    $.mobile.loading("show", {text: 'Cargando', textVisible: true, theme: 'c', html: ""});
});

$(document).ajaxStop(function(){
    $.mobile.loading('hide');
});

function checkClickConnection() {
    if(navigator.network==undefined) {
        window.localStorage.setItem("internetAccessFlag","false");
    }else{
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        if(networkState==Connection.UNKNOWN || networkState==Connection.NONE) {
            window.localStorage.setItem("internetAccessFlag","false");
        } else {
            window.localStorage.setItem("internetAccessFlag","true");   
        }
    }
    if(window.localStorage.getItem("internetAccessFlag") == false){
        alert("No tienes ningún tipo de conexión a internet");   
    }
}

function san_consultor(){
     var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function(data){
            $.mobile.changePage("#solicitar_sanconsultor");
        }
    });   
}

function init(){
    $.support.cors                 = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushStateEnabled      = false;
    $.mobile.ajaxEnabled           = false;
    $.mobile.ajaxLinksEnabled      = false;
}

function guardar_usuario(){
    localStorage.setItem("usuario", $("#usuario").val());
    $.mobile.changePage("#home");
}

function login(){
    var u = $("#usuario").val();
    var c = $("#contrasena").val();
    if(u != "" && c != ""){
        var requests = $.ajax({
            type: "GET",
            dataType: "html",
            crossDomain: true,
            data: "usuario="+u+"&password="+c,
            url: "http://62.93.168.203/intranet/mobile/login.php",
            cache: false,
            success: function(data){
                var datos = data.split("|");
                if(data != "0"){
                    sessionStorage.setItem("id_usuario", datos[0]);
                    sessionStorage.setItem("gid_usuario", datos[1]);
                    var localpreg = localStorage.getItem("pregunta");
                    if(localpreg != "si" || u != localStorage.getItem("usuario")){
                        localStorage.setItem("pregunta", "si");
                        $('#deleteConfirm').popup("open");
                        return;
                    }else{
                        $.mobile.changePage("#home");
                    }
                }else{
                    alert("Usuario y/o contraseña erróneos");
                }
            }
        });
    }else{
        alert("Usuario y/o contraseña vacíos");
    }
}

function desconectar(){
    sessionStorage.removeItem("id_usuario");
    sessionStorage.removeItem("gid_usuario");
    //localStorage.removeItem("usuario");
    $.mobile.changePage("#login");
}

function ausencias(){
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        url: "http://62.93.168.203/intranet/mobile/ausencias.php",
        cache: false,
        success: function(data){
            $("#content_ausencias").html(data);
            $.mobile.changePage("#ausencias");
        }
    });
}

function departamentos(){
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        url: "http://62.93.168.203/intranet/mobile/departamentos.php",
        cache: false,
        success: function(data){
            $("#departamento").html(data);
            //$('#departamento').selectmenu('refresh', true);
            $.mobile.changePage("#empleados");
        }
    });
}

function areas(){
    var departamento = $("#departamento").val(); 

    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "departamento="+departamento,
        url: "http://62.93.168.203/intranet/mobile/areas.php",
        cache: false,
        success: function(data){
            $("#area").html(data);
            //$('#area').selectmenu('refresh', true);
        }
    });
}

function empleados(){   
    var departamento = $("#departamento").val(); 
    var area = $("#area").val(); 

    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "departamento="+departamento+"&area="+area,
        url: "http://62.93.168.203/intranet/mobile/empleados.php",
        cache: false,
        success: function(data){
            $("#empleado").html(data);
            //$('#empleado').selectmenu('refresh', true);
        }
    });
}

function getDatos(){
    $.mobile.loadingMessage = "Cargando";
    $.mobile.showPageLoadingMsg();
     
    var departamento = $("#departamento").val(); 
    var area = $("#area").val(); 
    var empleado = $("#empleado").val();     
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "iddepartamento="+departamento+"&idarea="+area+"&idusuario="+empleado,
        url: "http://62.93.168.203/intranet/mobile/listado_telefonos.php",
        cache: false,
        success: function(data){
            $("#content_listado").html(data);
            $.mobile.changePage("#listado_empleados");
            $.mobile.hidePageLoadingMsg();
        }
    });
}

function empleados_agenda(){
    var idusuario = sessionStorage.getItem("id_usuario");
    var departamento = $("#departamentos_agenda").val();
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "idusuario="+idusuario+"&departamento="+departamento,
        url: "http://62.93.168.203/intranet/mobile/empleados_agenda.php",
        cache: false,
        success: function(data){
            $("#empleados_agenda").html(data);
            $('#empleados_agenda').selectmenu('refresh', true);
        }
    });
}

function departamentos_agenda(){
    var idusuario = sessionStorage.getItem("id_usuario");
    var gidusuario = sessionStorage.getItem("gid_usuario");
    if(gidusuario == "37"){
        empleados_agenda();
    }
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "idusuario="+idusuario,
        url: "http://62.93.168.203/intranet/mobile/departamentos_agenda.php",
        cache: false,
        success: function(data){
            $('#agenda').trigger('refresh');
            $("#departamentos_agenda").html(data);
            //$('#departamentos_agenda').selectmenu('refresh', true);
            
            if(gidusuario == "37"){
                $("#buscador_agenda").css("display","none");
                mostrar_agenda();
            }
            $.mobile.changePage("#agenda");
        }
    });
}

function mostrar_agenda(){
    if($("#departamentos_agenda").val() == "0"){
        alert("Debes seleccionar un departamento");
        return;
    }
    
    var gidusuario = sessionStorage.getItem("gid_usuario");
    if(gidusuario == "37"){
        var idusuario = sessionStorage.getItem("id_usuario");
    }else{
        var idusuario = $("#empleados_agenda").val();
        if(idusuario == 0){
            alert("Debes seleccionar un empleado para poder ver su agenda.");
            return;
        }
    }
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "idusuario="+idusuario,
        url: "http://62.93.168.203/intranet/mobile/MostrarAgenda.php",
        cache: false,
        success: function(data){
            $("#content_agenda").html(data);
            $("#anterior").css("display","table-cell");
            $("#siguiente").css("display","table-cell");
        }
    });
}

function cambioMes(tipo){
    if (tipo == "A"){
        var date = $("#mes_antes").val();
    }else{
        var date = $("#mes_sig").val();
    }
    
    var gidusuario = sessionStorage.getItem("gid_usuario");
    if(gidusuario == "37"){
        var id = sessionStorage.getItem("id_usuario");
    }else{
        var id = $("#empleados_agenda").val();
    }

    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        url: "http://62.93.168.203/intranet/mobile/MostrarAgenda.php",
        data: "date="+date+"&idusuario="+id,
        cache: false,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            $("#content_agenda").html(data);
        }
    });     
}

function SeleccionFecha(fecha){
    var gidusuario = sessionStorage.getItem("gid_usuario");
    if(gidusuario == "37"){
        var id = sessionStorage.getItem("id_usuario");
    }else{
        var id = $("#empleados_agenda").val();
    }
    //var id = sessionStorage.getItem("id_usuario");
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        url: 'http://62.93.168.203/intranet/mobile/resultado_agenda.php',
        data: "idusuario="+id+"&fecha="+fecha,
        cache: false,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            $("#both").popup("open");
            $("#both_content").html(data);
        }
    });
    
}

function combo_permisos(){
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        url: 'http://62.93.168.203/intranet/mobile/permisos.php',
        cache: false,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            $("#tipo_permisos").html(data);
            $.mobile.changePage("#solicitar_permisos");
        }
    });
}

function guardar_permiso(){
    var id = sessionStorage.getItem("id_usuario");
    var fecha = $("#fecha_permiso").val();
    var permiso = $("#tipo_permisos").val();
    var horai = $("#hora_desde_permiso").val();
    var horaf = $("#hora_hasta_permiso").val();
    var error = "";
    
    if(permiso == "1"){
        var start = horaf;
        var end = '2'; 
        var s = start.split(':'); 
        var min = s[0]-end; 
        var x = horai.split(":");
        if(min > x[0]){
            alert("El permiso no puede durar más de 2 horas");
            return true;
        }else if(min == x[0]){
            if(s[1] > x[1]){
                alert("El permiso no puede durar más de 2 horas");
                return true;
            }
        }
    }
    
    if(fecha == ""){error += "Fechas vacías.\r\n";}
    if(permiso == "0"){error += "Debes seleccionar un tipo de permiso.\r\n";}
    if(horai == ""){error += "Debes seleccionar una hora de inicio.\r\n";}
    if(horaf == ""){error += "Debes seleccionar una hora de fin.\r\n";}
    
    if(error != ""){
        alert(error);
    }else{
       var requests = $.ajax({
            type: "GET",
            dataType: "html",
            crossDomain: true,
            url: "http://62.93.168.203/intranet/mobile/guarda_permisos.php",
            data: "idusuario="+id+"&fecha="+fecha+"&permiso="+permiso+"&horai="+horai+"&horaf="+horaf,
            cache: false,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(data) {
                alert(data);
            }
        });    
    }
}

function comprobar_alternativa(){
    var id = sessionStorage.getItem("id_usuario");
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        url: 'http://62.93.168.203/intranet/mobile/alternativa_vacaciones.php',
        data: "idusuario="+id,
        cache: false,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            if(data == 1){
                $("input:radio[name=alternativa]")[0].click();
            }
            if(data == 2){
                $("input:radio[name=alternativa]")[1].click();
            }
            if(data == 3){
                $("input:radio[name=alternativa]")[2].click();
            }
            if(data == 3 || data == 2 || data == 1){
                $("input:radio[id=alternativa1]").attr("disabled",true);
                $("input:radio[id=alternativa2]").attr("disabled",true);
                $("input:radio[id=alternativa3]").attr("disabled",true);
                $.mobile.changePage("#seleccionar_alternativa");
            }else{
                $.mobile.changePage("#seleccionar_alternativa");
            }
        }
    });
}

function mostrar_vacaciones(){
    var idusuario = $("#empleados_agenda").val();
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "idusuario="+idusuario,
        url: "http://62.93.168.203/intranet/mobile/MostrarAgendaVacaciones.php",
        cache: false,
        success: function(data){
            $("#cal_vacaciones").html(data);
            $("#anterior_vacaciones").css("display","table-cell");
            $("#siguiente_vacaciones").css("display","table-cell");
        }
    });
}

function cambioMesVacaciones(tipo){
    if (tipo == "A"){
        var date = $("#mes_antes_vacaciones").val();
    }else{
        var date = $("#mes_sig_vacaciones").val();
    }
    
    var gidusuario = sessionStorage.getItem("gid_usuario");
    if(gidusuario == "37"){
        var id = sessionStorage.getItem("id_usuario");
    }else{
        var id = $("#empleados_agenda").val();
    }

    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        cache: false,
        url: "http://62.93.168.203/intranet/mobile/MostrarAgendaVacaciones.php",
        data: "date="+date+"&idusuario="+id,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            $("#cal_vacaciones").html(data);
        }
    });
}

function guardar_alternativa(){
    var id = sessionStorage.getItem("id_usuario");
    var alternativa = "";
    
    $('input[name=alternativa]').each(function(index){
        if($(this).attr("checked") == "checked"){
            alternativa = $(this).val();
        }
    });
  
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        cache: false,
        url: "http://62.93.168.203/intranet/mobile/guarda_alternativa.php",
        data: "&idusuario="+id+"&alternativa="+alternativa,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data){
            if(data == "1"){
                $.mobile.changePage("#solicitar_vacaciones");
                mostrar_vacaciones();
            }else{
                $.mobile.changePage("#seleccionar_alternativa");
            }
        }
    });
}

function guardar_vacaciones(){
    var id = sessionStorage.getItem("id_usuario");
    var fecha = lFechas;
    var tipo_dia = "";
    var error = "";
    
    $('input[name=tipo_dia]').each(function(index){
        if($(this).attr("checked") == "checked"){
            tipo_dia = $(this).val();
        }
    });
    
    if(fecha == ""){error += "Fechas vacías.\r\n";}
    if(tipo_dia == ""){error += "Debes seleccionar un tipo de día.\r\n";}
  
    if(error != ""){
        alert(error);
    }else{
        var requests = $.ajax({
            type: "GET",
            dataType: "html",
            crossDomain: true,
            cache: false,
            url: "http://62.93.168.203/intranet/mobile/guarda_vacaciones.php",
            data: "fecha="+fecha+"&idusuario="+id+"&tipo_dia="+tipo_dia,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(data) {
                alert(data);
            }
        });
    }
}

function guardar_sanconsultor(){
    var id = sessionStorage.getItem("id_usuario");
    var fecha1 = $("#fecha_sanconsultor1").val();
    var fecha2 = $("#fecha_sanconsultor2").val();
    var fecha3 = $("#fecha_sanconsultor3").val();
    var fecha4 = $("#fecha_sanconsultor4").val();
    var fecha5 = $("#fecha_sanconsultor5").val();
    var fecha6 = $("#fecha_sanconsultor6").val();
    var fecha7 = $("#fecha_sanconsultor7").val();
    var fecha8 = $("#fecha_sanconsultor8").val();
    var fecha9 = $("#fecha_sanconsultor9").val();
    var pernoctacion = fecha1+","+fecha2+","+fecha3+","+fecha4+","+fecha5+","+fecha6+","+fecha7+","+fecha8+","+fecha9;
    var fecha = $("#fecha_sanconsultor").val();
    var error = "";
    
    if(fecha1 == ""){error += "Debes rellenar la noche nº 1.\r\n";}
    if(fecha2 == ""){error += "Debes rellenar la noche nº 2.\r\n";}
    if(fecha3 == ""){error += "Debes rellenar la noche nº 3.\r\n";}
    if(fecha4 == ""){error += "Debes rellenar la noche nº 4.\r\n";}
    if(fecha5 == ""){error += "Debes rellenar la noche nº 5.\r\n";}
    if(fecha6 == ""){error += "Debes rellenar la noche nº 6.\r\n";}
    if(fecha7 == ""){error += "Debes rellenar la noche nº 7.\r\n";}
    if(fecha8 == ""){error += "Debes rellenar la noche nº 8.\r\n";}
    if(fecha9 == ""){error += "Debes rellenar la noche nº 9.\r\n";}
    if(fecha == ""){error += "Debes rellenar el día que quieres disfrutar.\r\n";}
    
    if(error != ""){
        alert(error);
    }else{
        var requests = $.ajax({
            type: "GET",
            dataType: "html",
            crossDomain: true,
            cache: false,
            url: "http://62.93.168.203/intranet/mobile/guarda_san_consultor.php",
            data: "fecha="+fecha+"&idusuario="+id+"&pernoctacion="+pernoctacion,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(data) {
                alert(data);
            }
        });
    }
}

function provincias(){
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        url: "http://62.93.168.203/intranet/mobile/provincias.php",
        cache: false,
        success: function(data){
            $("#provincias").html(data);
            //$('#provincias').selectmenu('refresh', true);
        }
    });
}

function localidades(){
    var provincia = $("#provincias").val();
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "provincia="+provincia,
        url: "http://62.93.168.203/intranet/mobile/localidades.php",
        cache: false,
        success: function(data){
            $("#localidades").html(data);
            //$('#localidades').selectmenu('refresh', true);
        }
    });
}

function mostrar_cal_zonascomunes(){
    provincias();
    var idusuario = sessionStorage.getItem("id_usuario");
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "idusuario="+idusuario,
        url: "http://62.93.168.203/intranet/mobile/MostrarAgendaZonascomunes.php",
        cache: false,
        success: function(data){
            $("#cal_zonascomunes").html(data);
            $("#anterior_zonascomunes").css("display","table-cell");
            $("#siguiente_zonascomunes").css("display","table-cell");
            $.mobile.changePage("#solicitar_zonascomunes");
        }
    });
}

function cambioMesZonascomunes(tipo){
    if (tipo == "A"){
        var date = $("#mes_antes_zonascomunes").val();
    }else{
        var date = $("#mes_sig_zonascomunes").val();
    }
    
    var id = sessionStorage.getItem("id_usuario");
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        cache: false,
        url: "http://62.93.168.203/intranet/mobile/MostrarAgendaZonascomunes.php",
        data: "date="+date+"&idusuario="+id,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data){
            $("#cal_zonascomunes").html(data);
        }
    });
}

function recurso(){
    var recurso = $("#recurso").val();
    if(recurso == "c"){
        $("#info_coche").css("display","");
    }else{
        $("#info_coche").css("display","none");
    }
}

function guardar_zonascomunes(){
    var idusuario = sessionStorage.getItem("id_usuario");
    var fechas = lFechas;
    var recurso = $("#recurso").val();
    var horai = $("#hora_desde_zonascomunes").val();
    var horaf = $("#hora_hasta_zonascomunes").val();
    var disponibilidad = $("#disponibilidad").is(":checked");
    var observaciones = $("#observaciones").val();
    var provincia = $("#provincias").val();
    var localidad = $("#localidades").val();
    var cliente = $("#nombre_cliente").val();
    var n_dias = lFechas.length;
    var vardata = "";
    var error = "";
    
    if(fechas == ""){error += "Fechas vacías.\r\n";}
    if(recurso == "0"){error += "Debes seleccionar un recurso.\r\n";}
    
    if(recurso == "c"){
        if(horai == ""){error += "Debes seleccionar una hora de inicio.\r\n";}
        if(horaf == ""){error += "Debes seleccionar una hora de fin.\r\n";}
        if(provincia == "0"){error += "Debes seleccionar una provincia.\r\n";}
        if(localidad == "0"){error += "Debes seleccionar una localidad.\r\n";}
        if(cliente == ""){error += "Debes seleccionar un cliente.\r\n";}
        
        vardata = "idusuario="+idusuario+"&fechas="+fechas+"&recurso="+recurso+"&horai="+horai+"&horaf="+horaf
            +"&disponibilidad="+disponibilidad+"&observaciones="+observaciones+"&provincia="+provincia+"&localidad="+localidad
            +"&cliente="+cliente+"&n_dias="+n_dias;
    }else{
        vardata = "idusuario="+idusuario+"&fechas="+fechas+"&recurso="+recurso+"&n_dias="+n_dias;    
    }
    
    if(error != ""){
        alert(error);
    }else{
        var requests = $.ajax({
            type: "GET",
            dataType: "html",
            crossDomain: true,
            cache: false,
            url: "http://62.93.168.203/intranet/mobile/guarda_zonas_comunes.php",
            data: vardata,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(data){
                alert(data);
            }
        });
    }
}

function mostrar_cal_javiercarrasco(){
    var idusuario = sessionStorage.getItem("id_usuario");
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        data: "idusuario="+idusuario,
        url: "http://62.93.168.203/intranet/mobile/MostrarAgendaJavier.php",
        cache: false,
        success: function(data){
            $("#cal_javiercarrasco").html(data);
            $("#anterior_javiercarrasco").css("display","table-cell");
            $("#siguiente_javiercarrasco").css("display","table-cell");
            $.mobile.changePage("#solicitar_javiercarrasco");
        }
    });
}

function cambioMesJaviercarrasco(tipo){
    if (tipo == "A"){
        var date = $("#mes_antes_javier").val();
    }else{
        var date = $("#mes_sig_javier").val();
    }
    
    var id = sessionStorage.getItem("id_usuario");
    
    var requests = $.ajax({
        type: "GET",
        dataType: "html",
        crossDomain: true,
        cache: false,
        url: "http://62.93.168.203/intranet/mobile/MostrarAgendaJavier.php",
        data: "date="+date+"&idusuario="+id,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data){
            $("#cal_javiercarrasco").html(data);
        }
    });
}

function guardar_javiercarrasco(){
    var idusuario = sessionStorage.getItem("id_usuario");
    var dias = lFechas;
    var horai = $("#hora_inicial_javiercarrasco").val();
    var horaf = $("#hora_final_javiercarrasco").val();
    var tarea = $("#tarea").val();
    var detalle_tarea = $("#detalle_tarea").val();
    var observaciones = $("#observaciones_javier").val();
    var n_dias = lFechas.length;
    var vardata = "";
    var error = "";
    
    if(dias == ""){error += "Fechas vacías.\r\n";}
    if(horai == ""){error += "Debes seleccionar una hora de inicio.\r\n";}
    if(horaf == ""){error += "Debes seleccionar una hora de fin.\r\n";}
    if(tarea == ""){error += "Debes seleccionar una tarea.\r\n";}
    
    vardata = "idusuario="+idusuario+"&dias="+dias+"&horai="+horai+"&horaf="+horaf
        +"&tarea="+tarea+"&detalle_tarea="+detalle_tarea+"&observaciones="+observaciones
        +"&n_dias="+n_dias;
 
    if(error != ""){
        alert(error);
    }else{
        var requests = $.ajax({
            type: "GET",
            dataType: "html",
            crossDomain: true,
            cache: false,
            url: "http://62.93.168.203/intranet/mobile/guarda_agenda_javier_carrasco.php",
            data: vardata,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(data){
                alert(data);
            }
        });
    }
}

init();