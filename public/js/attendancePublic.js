const search = document.querySelector('#search');
search.addEventListener('click', (e) => {
    e.preventDefault();
    const date = document.querySelector('#date').value;
    axios.get(`http://localhost:3000/attendance/${date}`)
    .then((response) => {
        const data = response.data;
        if (!data || data.length === 0) {
            showAttendanceForm(date);
        } else {
            showAttendance(data[0]);
        }
    })
    .catch((error) => {
        console.log(error);
    });
});

const report = document.querySelector('#report');
report.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#date').value = '';
    axios.get('http://localhost:3000/attendance/report')
    .then((res) => {
        const data = res.data;
        showAttendance(data)
    })
    .catch((error) => {
        console.log(error);
    });
});

function showAttendanceForm(Date) {
    const ul = document.querySelector('ul');
    ul.innerHTML = `<h1>Attendance Required</h1>
    <form id="attendanceForm">
    <label for="siva">Siva: </label> 
    <input type="radio" id="siva" value="present" name="siva">
    <label for="siva">Present</label>
    <input type="radio" id="siva" value="absent" name="siva">
    <label for="siva">Absent</label><br><br>

    <label for="rajesh">Rajesh: </label> 
    <input type="radio" id="rajesh" value="present" name="rajesh">
    <label for="rajesh">Present</label>
    <input type="radio" id="rajesh" value="absent" name="rajesh">
    <label for="rajesh">Absent</label><br><br>

    <label for="ashok">Ashok: </label> 
    <input type="radio" id="ashok" value="present" name="ashok">
    <label for="ashok">Present</label>
    <input type="radio" id="ashok" value="absent" name="ashok">
    <label for="ashok">Absent</label><br><br>

    <label for="sai">Sai: </label> 
    <input type="radio" id="sai" value="present" name="sai">
    <label for="sai">Present</label>
    <input type="radio" id="sai" value="absent" name="sai">
    <label for="sai">Absent</label><br><br>

    <label for="haritha">Haritha: </label> 
    <input type="radio" id="haritha" value="present" name="haritha">
    <label for="haritha">Present</label>
    <input type="radio" id="haritha" value="absent" name="haritha">
    <label for="haritha">Absent</label><br><br>

    <label for="ram">Ram: </label> 
    <input type="radio" id="ram" value="present" name="ram">
    <label for="ram">Present</label>
    <input type="radio" id="ram" value="absent" name="ram">
    <label for="ram">Absent</label><br><br>

    <label for="krishna">Krishna: </label> 
        <input type="radio" id="krishna" value="present" name="krishna">
    <label for="krishna">Present</label>
    <input type="radio" id="krishna" value="absent" name="krishna">
    <label for="krishna">Absent</label><br><br>

    <label for="anu">Anu: </label> 
    <input type="radio" id="anu" value="present" name="anu">
    <label for="anu">Present</label>
        <input type="radio" id="anu" value="absent" name="anu">
    <label for="anu">Absent</label><br><br>

    <label for="ammu">Ammu: </label> 
    <input type="radio" id="ammu" value="present" name="ammu">
    <label for="ammu">Present</label>
    <input type="radio" id="ammu" value="absent" name="ammu">
    <label for="ammu">Absent</label><br><br>

    <label for="adi">Adi: </label> 
    <input type="radio" id="adi" value="present" name="adi">
        <label for="adi">Present</label>
    <input type="radio" id="adi" value="absent" name="adi">
    <label for="adi">Absent</label><br><br>

    <label for="venkat">Venkat: </label> 
    <input type="radio" id="venkat" value="present" name="venkat">
    <label for="venkat">Present</label>
    <input type="radio" id="venkat" value="absent" name="venkat">
    <label for="venkat">Absent</label><br><br><br>

    <button type="submit">Mark Attendance</button>
    </form>`;
    
    const form = document.querySelector('#attendanceForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const Siva = form.siva.value;
        const Rajesh = form.rajesh.value;
        const Ashok = form.ashok.value;
        const Sai = form.sai.value;
        const Haritha = form.haritha.value;
        const Ram = form.ram.value;
        const Krishna = form.krishna.value;
        const Anu = form.anu.value;
        const Ammu = form.ammu.value;
        const Adi = form.adi.value;
        const Venkat = form.venkat.value;
        const attendance = { Date, Siva, Rajesh, Ashok, Sai, Haritha, Ram, Krishna, Anu, Ammu, Adi, Venkat };
        // const attendance = { Date };
        // names.forEach(name => {
        //     attendance[name] = form[name.toLowerCase()].value;
        // });
        axios.post('http://localhost:3000/attendance/add', attendance)
        .then((res) => {
            const data = res.data;
            showAttendance(data);
        })
        .catch((error) => {
            console.log('Error marking attendance:', error);
        });
    });
}

function showAttendance(data){
    const ul = document.querySelector('ul');
    ul.innerHTML = `<h1>Attendance Details</h1>`;
    for(let i in data){
        if(i == 'id' || i == 'Date' || i == 'updatedAt' || i == 'createdAt') continue;
        const li = document.createElement('li');
        li.innerHTML = `${i}: ${data[i]} <br><br>`;
        ul.appendChild(li);
    }
}