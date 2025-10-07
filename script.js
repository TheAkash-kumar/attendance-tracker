let subArr = [
    {
        name:'Subject 1',
        present: 2,
        absent:1
    },
    {
        name:'Subject 2',
        present: 0,
        absent:0
    }
];
/*----------------------local strorage work -------------------------------------------*/
let subArrString = localStorage.getItem('subArrString');
if (!subArrString) {
    // ye bs 1st time run hoga or default obj ko save kar lega 
    localStorage.setItem('subArrString',JSON.stringify(subArr));
} else {
    // Next time local storage e load hoga from storage
    subArr = JSON.parse(subArrString);
}
/*----------------------------------- default reset and calculations -------------------------------------------------------- */
let totalPresent = 0;
let totalAbsent = 0; 
calcTotal();
/*----------------------default rendering-------------------------- */
let mainChart = prepareChart(document.querySelector('#chart-canvas'));
renderHTML();
//console.log(`Total present = ${totalPresent}, Total Absent = ${totalAbsent}`);

/*----------------------Add subject button-------------------------- */
document.querySelector('.add-sub-btn').addEventListener('click',()=>{
    let subjectName = prompt('Enter the name of the subject');
    if (subjectName === null || subjectName.trim() === "") {
        alert("can't add empty subject!");
    } else {
        subArr.push(
            {
               name:subjectName,
                present: 0,
                absent:0
            }
        );
    }
    renderHTML ();
});
/*-------------------------------------------functions---------------------------------------------- */
function calcTotal () {
    totalAbsent = 0;
    totalPresent = 0;
    subArr.forEach((obj)=>{
        
        totalPresent += obj.present;
        totalAbsent += obj.absent;
    });
}

function renderHTML () {
    let html = ''
    subArr.forEach((obj,i)=>{
        let total = obj.absent + obj.present;
        let percent = (total === 0 ? 0 : obj.present * 100 / total);
        percent = percent.toFixed(1);
        html += `
        <div class="subjects-details subjects-container">
            <div class="sub-name">${obj.name}</div>
            <button class="edit-sub-name js-sub-name-edit-btn"><img class="edit-sub-name" src="img/edit-logo.png" alt=""></button>
            <div class="sub-record">
                <div class="sub-record-item">
                    <div class="label present-label">P</div>
                    <div class="label js-present-count">${obj.present}</div>
                    <button class="js-add-present-btn home-sub-btn"><img class="sub-btn-img" src="img/add.png" alt="add"></button>
                    <div class="label absent-label">A</div>
                    <div class="label js-absent-count">${obj.absent}</div>
                    <button class="js-add-absent-btn home-sub-btn"><img class="sub-btn-img" src="img/minus.png" alt="minus"></button>
                </div>
                <div class="subject-total">${obj.present}/ ${obj.present + obj.absent} <br><br> ${percent} % </div>
            </div>
            <div class="bottom-btn-container">
                <button class="reset-ind-sub-att reset-btn">Reset</button>
                <button class="delete-ind-sub-btn">Delete</button>
            </div>
            
        </div>
        `;
        //<button class="reset-ind-sub-att reset-btn">Reset</button>
    });
    document.querySelector('.subject-section').innerHTML = html;

    /*--------------------------------------------event listners-------------------------------------------- */
    
    // 1. reset individual subject counter
    document.querySelectorAll('.reset-btn').forEach((btn,i)=>{
        btn.addEventListener('click', ()=>{
            let confirmReset = confirm("Do you want to reset attendance counter?");
            if (confirmReset) {
                subArr[i].absent = 0;
                subArr[i].present = 0;
                updateLocalStorage();
                updateChart(mainChart);
                renderHTML();
            } 
        });
       
    });

    //  2. increse individual present subject counter
    document.querySelectorAll('.js-add-present-btn').forEach((btn,i)=>{
        btn.addEventListener('click',()=>{
            subArr[i].present++;
            updateLocalStorage();
            updateChart(mainChart);
            renderHTML();

        });
    });

    //  3. increse individual absent subject counter
    document.querySelectorAll('.js-add-absent-btn').forEach((btn,i)=>{
        btn.addEventListener('click',()=>{
            subArr[i].absent++;
            updateLocalStorage();
            updateChart(mainChart);
            renderHTML();

        });
    });

    // 4. edit individual subject name btn
    document.querySelectorAll('.js-sub-name-edit-btn').forEach((btn,i)=>{
        btn.addEventListener('click',()=>{
            let newName = prompt('Enter the new name of the subject');
            if (newName === null || newName.trim() === "") {
               
            } else {
                subArr[i].name = newName;
                updateLocalStorage();
                renderHTML();
            }
        });
    });

    //  5. delete individual subjects
    document.querySelectorAll('.delete-ind-sub-btn').forEach((btn,i)=>{
        btn.addEventListener('click', ()=>{
            let cornfirmDelete = confirm('Are you sure to delete the subject?');
            if (cornfirmDelete) {
                subArr.splice(i,1);
                updateLocalStorage();
                updateChart(mainChart);
                renderHTML();
            }
        });
    });

    

}

function updateLocalStorage () {
    localStorage.setItem('subArrString', JSON.stringify(subArr));
}

function updateChart(chartName) {
    calcTotal();
    chartName.data.datasets[0].data = [totalPresent, totalAbsent];
    chartName.update();
}
function prepareChart (canvas) {
    calcTotal();
    let mainChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [totalPresent, totalAbsent],
                backgroundColor: ['#4CAF50', '#F44336']
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Student Attendance' },
                datalabels: {
                    color: '#fff',
                    font: { weight: 'bold', size: 16 },
                    formatter: (value, context) => {
                        let dataArr = context.chart.data.datasets[0].data;
                        //let total = present + absent; // use real data
                        
                        let total = dataArr.reduce((a, b) => a + b, 0);
                        let percentage = (value / total * 100).toFixed(1) + "%";
                        return percentage;
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
    return mainChart; 
}