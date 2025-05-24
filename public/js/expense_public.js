const token = localStorage.getItem('token');

function add(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    let expenseDetails = { amount, description, category };
    axios.post('http://localhost:3000/expense/addExpense', expenseDetails, { headers: { 'Authorization': token } })
    .then((res) => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = res.data.message;
        showExpense(res.data.expense)
    })
    .catch((err) => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
    })
    event.target.amount.value = '';
    event.target.description.value = '';
    event.target.category.value = '';
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/expense/payment_status', { headers: { 'Authorization': token } })
    .then((res) => {
        const header = document.querySelector('.header');
        const h = header.querySelector('#premium');
        if (res.data.orderStatus === 'SUCCESS') {
            h.innerHTML = 'You are a premium user <button id="premiumBtn">Show leaderboard</button> <button id="reportBtn">Show Report</button><button id="downloadBtn">Download Report</button>';
            const premiumBtn = header.querySelector('#premiumBtn');
            premiumBtn.onclick = () => {
                axios.get('http://localhost:3000/expense/leaderboard', { headers: { 'Authorization': token } })
                .then((res) => {
                    showLeaderboard(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
            }
            const reportBtn = header.querySelector('#reportBtn');
            reportBtn.onclick = () => {
                window.location.href = `../views/expenseReport.html`;
            }
            const downloadBtn = header.querySelector('#downloadBtn');
            downloadBtn.onclick = () => {
                axios.get('http://localhost:3000/expense/downloadReport', { headers: { 'Authorization': token } })
                .then((res) => {
                    downloadReportBtn(res);
                })
                .catch((err) => {
                    const p = document.querySelector('.report-message');
                    p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
                });
            }
        }
    })
    axios.get('http://localhost:3000/expense/getExpense', { headers: { 'Authorization': token } })
    .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            showExpense(res.data[i]);
        }
    })
    .catch((err) => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
    })
    if (window.location.pathname.endsWith("expenseReport.html")) {
        axios.get('http://localhost:3000/expense/report', { headers: { 'Authorization': token } })
        .then((res) => {
            populateExpenseReport(res.data);
        })
        .catch((err) => {
            const p = document.querySelector('.report-message');
            p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
        });
    }
});

function showExpense(data){
    const ul=document.querySelector(`ul`);
    const li=document.createElement(`li`);
    li.id = `li_${data.id}`;
    li.innerHTML = `${data.amount} - ${data.description} - ${data.category} <button id="delete_${data.id}">Delete Expense</button>`;
    ul.appendChild(li);
    const Delete = li.querySelector(`#delete_${data.id}`);
    Delete.onclick = () => {
        deleteExpense(data.id);
    }
}

function deleteExpense(expenseId){
    axios.delete(`http://localhost:3000/expense/deleteExpense/${expenseId}`, { headers: { 'Authorization': token } })
    .then(res => {
        const p = document.querySelector('.expense_message');
        const ul = document.querySelector(`ul`);
        const li = ul.querySelector(`#li_${expenseId}`);
        p.innerHTML = res.data.message;
        const Delete = li.querySelector(`#delete_${expenseId}`);
        ul.removeChild(Delete.parentElement);
    })
    .catch(err => {
        const p = document.querySelector('.expense_message');
        p.innerHTML = err.response.data.error ? err.response.data.error : 'An error occured';
    });
}

function showLeaderboard(data){
    // Remove old leaderboard header if it exists
    const oldHeader = document.querySelector('#leaderboard');
    if (oldHeader) document.body.removeChild(oldHeader);

    // Remove old leaderboard list if it exists
    const oldList = document.querySelector('.leaderboard');
    if (oldList) document.body.removeChild(oldList);

    const h = document.createElement('h2');
    h.id = 'leaderboard';
    h.innerHTML = 'Leaderboard:';
    const ul = document.createElement('ul');
    ul.className = 'leaderboard';
    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `Name: ${data[i].name} - Total Expense: ${data[i].totalExpense}`;
        ul.appendChild(li);
    }
    document.body.appendChild(h);
    document.body.appendChild(ul);
}

function populateExpenseReport(data) {
    // Example: Fill daily report table
    const dailyBody = document.getElementById('dailyReportBody');
    dailyBody.innerHTML = '';
    if (data.daily && Array.isArray(data.daily)) {
        data.daily.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.date || ''}</td>
                <td>${row.description || ''}</td>
                <td>${row.category || ''}</td>
                <td>${row.income || ''}</td>
                <td>${row.expense || ''}</td>
            `;
            dailyBody.appendChild(tr);
        });
    }
     const weeklyBody = document.getElementById('weeklyReportBody');
    weeklyBody.innerHTML = '';
    if (data.weekly && Array.isArray(data.weekly)) {
        data.weekly.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.week || ''}</td>
                <td>${row.totalIncome || ''}</td>
                <td>${row.totalExpense || ''}</td>
                <td>${row.savings || ''}</td>
            `;
            weeklyBody.appendChild(tr);
        });
    }
    const monthlyBody = document.getElementById('expenseReportBody');
    monthlyBody.innerHTML = '';
    if (data.monthly && Array.isArray(data.monthly)) {
        data.monthly.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.date || ''}</td>
                <td>${row.description || ''}</td>
                <td>${row.category || ''}</td>
                <td>${row.income || ''}</td>
                <td>${row.expense || ''}</td>
            `;
            monthlyBody.appendChild(tr);
        });
    }
    const yearlyBody = document.getElementById('yearlyReportBody');
    yearlyBody.innerHTML = '';
    if (data.yearly && Array.isArray(data.yearly)) {
        data.yearly.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.month || ''}</td>
                <td>${row.totalIncome || ''}</td>
                <td>${row.totalExpense || ''}</td>
                <td>${row.savings || ''}</td>
            `;
            yearlyBody.appendChild(tr);
        });
    }
}

function downloadReportBtn(res) {
    if(res.status === 201){
        var a = document.createElement("a");
        a.href = response.data.fileUrl;
        a.download = 'myexpense.csv';
        a.click();
    }
}