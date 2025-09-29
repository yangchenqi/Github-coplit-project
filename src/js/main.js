let myChart = null;

document.addEventListener('DOMContentLoaded', function () {
    //input with id username on change
    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('input', function () {
        const name = usernameInput.value.trim();
        //regex to check if name has at least 1 capitcal letter ,1 special character and 1 number,and is at least 8 characters long
        var regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
        if (regex.test(name)) {
            //border is green
            usernameInput.style.borderColor = 'green';//tomTom1!
        } else {
            //border is red
            usernameInput.style.borderColor = 'red';
        }
    });

    // 初始化图表
    var ctx = document.getElementById("barChart").getContext("2d");
    if (ctx) {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [{
                    label: 'Income',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Expenses',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // 监听所有输入框变化，自动更新图表
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', updateChartData);
        });
    }
});

function getMonthlyData() {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const income = [];
    const expenses = [];
    months.forEach(month => {
        const incomeInput = document.getElementById(`${month}-income`);
        const expensesInput = document.getElementById(`${month}-expenses`);
        income.push(Number(incomeInput?.value) || 0);
        expenses.push(Number(expensesInput?.value) || 0);
    });
    return { income, expenses };
}

function updateChartData() {
    const { income, expenses } = getMonthlyData();
    if (myChart) {
        myChart.data.datasets[0].data = income;
        myChart.data.datasets[1].data = expenses;
        myChart.update();
    }
}
document.getElementById('downloadChart').addEventListener('click', function () {
    const canvas = document.getElementById('barChart');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'chart.png';
    link.click();
});