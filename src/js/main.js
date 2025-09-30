


document.addEventListener('DOMContentLoaded', () => {
    // Username input validation
    const usernameInput = document.getElementById('username');
    usernameInput?.addEventListener('input', () => {
        const name = usernameInput.value.trim();
        // Modern regex declaration
        const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
        usernameInput.style.borderColor = regex.test(name) ? 'green' : 'red';
    });

    // Initialize chart
    const ctx = document.getElementById('barChart')?.getContext('2d');
    if (ctx) {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [
                    {
                        label: 'Income',
                        data: [],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Expenses',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
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

        // Listen for changes on all number inputs to update chart
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', updateChartData);
        });
    }
    // Add missing closing brace for DOMContentLoaded event
});


const getMonthlyData = () => {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const income = months.map(month => Number(document.getElementById(`${month}-income`)?.value) || 0);
    const expenses = months.map(month => Number(document.getElementById(`${month}-expenses`)?.value) || 0);
    return { income, expenses };
};

const updateChartData = () => {
    const { income, expenses } = getMonthlyData();
    if (myChart) {
        myChart.data.datasets[0].data = income;
        myChart.data.datasets[1].data = expenses;
        myChart.update();
    }
};
document.getElementById('downloadChart')?.addEventListener('click', () => {
    const canvas = document.getElementById('barChart');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'chart.png';
        link.click();
    }
});