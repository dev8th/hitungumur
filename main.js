var tahun = document.getElementById('tahun');
    var bulan = document.getElementById('bulan');
    var hari = document.getElementById('hari')
    var button = document.getElementById('cek');
    const data = [
        [31, 1, "Januari"],
        [28, 2, "Februari"],
        [31, 3, "Maret"],
        [30, 4, "April"],
        [31, 5, "Mei"],
        [30, 6, "Juni"],
        [31, 7, "Juli"],
        [31, 8, "Agustus"],
        [30, 9, "September"],
        [31, 10, "Oktober"],
        [30, 11, "November"],
        [31, 12, "Desember"]
    ];

    select_bulan(data.length, 4);
    select_hari(bulan.value, 30);
    select_tahun(1990);
    isKabisat(1990);

    tahun.addEventListener('change', onchange_tahun);
    bulan.addEventListener('change', onchange_bulan);
    button.addEventListener('click', hitung);

    function onchange_tahun() {
        isKabisat(tahun.value);
        select_bulan(data.length, 4);
        select_hari(bulan.value, 30);
    }

    function onchange_bulan() {
        select_hari(bulan.value, 1);
    }

    function select_hari(bulan_value, no_hari) {
        var option = "";
        for (var i = 1; i <= data[bulan_value - 1][0]; i++) {
            var selected = "";
            if (i == no_hari) {
                selected = "selected";
            }
            var option = option + "<option value='" + i + "' " + selected + ">" + i + "</option>";
        }
        hari.innerHTML = option;
    }

    function select_bulan(data_length, urut_bulan) {
        var option = "";
        for (var i = 0; i <= data_length - 1; i++) {
            var selected = "";
            if (i == urut_bulan) {
                selected = "selected";
            }
            var option = option + "<option value='" + data[i][1] + "' " + selected + ">" + data[i][2] + "</option>";
        }
        bulan.innerHTML = option;
    }

    function select_tahun(fix_tahun) {
        var option = "";
        var tahun_now = new Date();
        tahun_now = tahun_now.getFullYear();
        for (var i = 1900; i <= tahun_now; i++) {
            var selected = "";
            if (i == fix_tahun) {
                selected = "selected";
            }
            var option = option + "<option value='" + i + "' " + selected + ">" + i + "</option>";
        }
        tahun.innerHTML = option;
    }

    function hitung() {
        var tahun = document.getElementById('tahun');
        var bulan = document.getElementById('bulan');
        var hari = document.getElementById('hari')

        var tahun = parseInt(tahun.value);
        var bulan = parseInt(bulan.value);
        var hari = parseInt(hari.value);

        var lahir = new Date(tahun, bulan - 1, hari);
        var now = new Date();

        var milisec = now.valueOf() - lahir.valueOf();

        var usia_tahun = Math.floor(milisec / 31536000000);
        var usia_hari = Math.floor((milisec % 31536000000) / 86400000);
        var usia_bulan = Math.floor(usia_hari / 30);

        usia_hari = usia_hari % 30;

        if (usia_tahun != 0) {
            usia_tahun = usia_tahun + " Tahun ";
        } else {
            usia_tahun = "";
        }

        if (usia_bulan != 0) {
            usia_bulan = usia_bulan + " Bulan ";
        } else {
            usia_bulan = "";
        }

        if (usia_hari != 0) {
            usia_hari = usia_hari + " Hari";
        } else {
            usia_hari = "";
        }

        var output = document.getElementsByClassName('text');
        output[0].innerHTML = "";
        output[0].innerHTML = usia_tahun + usia_bulan + usia_hari;

    }

    function isFloat(a) {
        var cal = a % 1;
        if (cal === 0) {
            return true;
        } else {
            return false;
        }
    }

    function isKabisat(tahun) {
        var cek_tahun_1 = isFloat(tahun / 400);
        var cek_tahun_2 = isFloat(tahun / 4);
        if (cek_tahun_1 || cek_tahun_2) {
            data[1][0] = 29;
        } else {
            data[1][0] = 28;
        }
    }