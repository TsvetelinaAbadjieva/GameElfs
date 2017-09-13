var isLoggedIn = true;

window.addEventListener('load', function (e) {
    //  e.preventDefault();
    if (!isLoggedIn) {
        var task = document.getElementById('tasksLink').style.display = 'none';
        var projDashboard = document.getElementById('projectDashboardLink').style.display = 'none';
        var chart = document.getElementById('chartLink').style.display = 'none';
    }
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('projectDashboard').style.display = 'none';
    document.getElementById('alertRegister').style.display = 'none';
    document.getElementById('alertLogin').style.display = 'none';

    // task.style.display ='';
    // projDashboard.style.display ='';
    // chart.style.display ='';

});
