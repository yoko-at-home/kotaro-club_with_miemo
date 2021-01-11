//このスクリプトのオーナーはmiemoです。
  //変数の宣言
var time;
var interval_work_id = null;　//25分タイマーのid、重複押しを避けるため
var interval_break_id = null; //5分タイマーのid、重複押しを避けるため
var timer_type = null; //タイマーの区別、25分タイマーは1500、5分タイマーは300となる
        function PlaySound() {
          audioElement = new Audio();
          audioElement.src = "assets/audio/meow.mp3";
          audioElement.play();
        }
        function StopSound() {
        audioElement.pause();
        }
        //25分タイマーをスタートする関数
        function click_workButton() {
            if (interval_work_id === null) {
                if (timer_type !== 1500) {　//25分タイマー以外がスタートしていたら
                    timer_type = 1500;　　//25分タイマーに戻す
                    time = timer_type;
                    clearInterval(interval_break_id); //5分タイマーは止める
                    interval_break_id = null;　
                }
                interval_work_id = setInterval(countdown, 1000); //タイマー起動
                //ボタンの制御
                $("#workButton").prop("disabled", false);　//押せる
                $("#breakButton").prop("disabled", false);　//押せる
                $("#stopButton").prop("disabled", false);　//押せる
            }
        }
        //5分タイマーをスタートする関数
        function click_breakButton() {
            if (interval_break_id === null) {
                if (timer_type !== 300) { //5分タイマー以外がスタートしていたら
                    timer_type = 300;  //5分タイマーに戻す
                    time = timer_type;
                    clearInterval(interval_work_id);  //25分タイマーは止める
                    interval_work_id = null;
                }
                interval_break_id = setInterval(countdown, 1000);
                //ボタンの制御
                $("#workButton").prop("disabled", false); //押せる
                $("#breakButton").prop("disabled", false); //押せる
                $("#stopButton").prop("disabled", false); //押せる
            }
        }
        //タイマーをストップする関数
        function click_stopButton() {
            //両方のタイマーを止める
            clearInterval(interval_work_id);
            clearInterval(interval_break_id);
            interval_work_id = null;
            interval_break_id = null;
            //ボタンの制御
            if (timer_type === 1500) {
                $("#workButton").prop("disabled", false); //押せる
                $("#breakButton").prop("disabled", true); //押せない
                $("#stopButton").prop("disabled", true);　//押せない
            } else {
                $("#workButton").prop("disabled", true); //押せない
                $("#breakButton").prop("disabled", false); //押せる
                $("#stopButton").prop("disabled", true); //押せない
            }
        }
        //タイマーをリセットする関数
        function click_resetButton() {
            //両方のタイマーを止める
            clearInterval(interval_work_id);
            clearInterval(interval_break_id);
            interval_work_id = null;
            interval_break_id = null;
            //タイマータイプを初期値（25分）に戻す
            timer_type = 1500;
            time = timer_type;
          show_timer();
          PlaySound();
            //ボタンの制御
            $("#workButton").prop("disabled", false); //押せる
            $("#breakButton").prop("disabled", false);　//押せる
            $("#stopButton").prop("disabled", true);　//押せない
        }
        //1秒ずつ減らす関数
        function countdown() {
            time--;
            //0になるまでタイマーを表示
            if (time > 0) {
              show_timer()
              //0になったら終了を表示
            } else {
              document.getElementById('timer').style.color = '#f29d13'
              document.getElementById('timer').style.fontSize = '4rem'
              document.getElementById('timer').innerHTML = 'Over!'
              PlaySound() //******************yoko
              clearInterval(interval_work_id)
              clearInterval(interval_break_id)
            }
        }
        //タイマーを表示する関数
        function show_timer() {
            var second = time % 60;
            var minute = (time - second) / 60;
            document.getElementById('timer').style.color = 'rgb(32, 5, 102)'
            document.getElementById('timer').style.fontSize = "5rem";
            document.getElementById('timer').innerHTML = ("0" + minute).slice(-2) + ":" + ("0" + second).slice(-2);
        }
        window.onload = function () {
          var workButton = document.getElementById('workButton')
          workButton.addEventListener('click', click_workButton, false)
          var breakButton = document.getElementById('breakButton')
          breakButton.addEventListener('click', click_breakButton, false)
          var stopButtonn = document.getElementById('stopButton')
          stopButton.addEventListener('click', click_stopButton, false)
          var resetButton = document.getElementById('resetButton')
          resetButton.addEventListener('click', click_resetButton, false)
          timer_type = 1500
          time = 1500
          show_timer()
          PlaySound() //******************yoko
          //タイマーを表示する関数
          $('#workButton').prop('disabled', false) //押せる
          $('#breakButton').prop('disabled', false) //押せる
          $('#stopButton').prop('disabled', true) //押せない
        }
