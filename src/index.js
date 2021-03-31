import {Request} from "./request";
import {Ui} from "./ui";

//elemnt seçimi

const form=document.getElementById("employee-form");
const nameInput=document.getElementById("name");
const departmentInput=document.getElementById("department");
const salaryInput=document.getElementById("salary");
const employeeList=document.getElementById("employees");
const updateEmployeeButton=document.getElementById("update");


///request
const request=new Request("http://localhost:3000/employees/");
const ui=new Ui();
let statEmployeID=null;

eventListeners();
function eventListeners () {
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployeeUi);
    employeeList.addEventListener("click",delorUpdateUi);
    updateEmployeeButton.addEventListener("click",putEmployee);
}
function getAllEmployees() {
    request.get()
    .then(function (response) {
        {
            response.forEach(employee => {
                ui.getUiEmployees(employee.name,employee.departmant,employee.salary,employee.id);
            });
        }
    })
    .catch(err=>console.log(err))
}
function addEmployeeUi(e) {
    let name=nameInput.value.trim();
    let departmant=departmentInput.value.trim();
    let salary=salaryInput.value.trim();
    if(name && departmant && salary !==" "){
        request.post({name:name,departmant:departmant,salary:salary})
    .then(function (response) {
        ui.addUi(response.name,response.salary,response.departmant,response.id);       
        ui.showAlert("success",`${response.name} Eklendi` );
    })
    .catch(err=>ui.showAlert("danger","Hata"))
    }
    else{
        ui.showAlert("danger","Boş Alan Bırakamazsınız");
    }  
    e.preventDefault();
}
function delorUpdateUi(e) {
    if(e.target.id==="delete-employee"){
        deleteEmployee(e.target);     
    }   
    else if(e.target.id==="update-employee"){               
        changeEmployee(e.target.parentElement.parentElement);    
    }
}

function deleteEmployee(deletee){
    let seleceted= deletee.parentElement.previousElementSibling.previousElementSibling.textContent;
    let selectedName=deletee.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    request.delete(seleceted)
    .then(mesaage=>{ui.deleteFromEmployeeUi(deletee.parentElement.parentElement);
        ui.showAlert("success",`${selectedName} Silindi.` );
    })
    .catch(err=>ui.showAlert("danger",String(err)))
}
function changeEmployee(target){
    ui.changeEmployeeUi(target);
    statEmployeID=target;
    
}
function putEmployee(){
    const name=nameInput.value;
    const departmant=departmentInput.value;
    const salary=salaryInput.value;
    if(name&&departmant&&salary!==""){
        if(statEmployeID.children[0].textContent!==name){
            request.put(statEmployeID.children[3].textContent,{name:name,departmant:departmant,salary:salary})
            .then(response =>{
                uiChangeElement();
                ui.showAlert("success",`${response.name} Güncellendi` );
            })
            .catch(err =>ui.showAlert("danger",String(err)))      
        }
        else{
            ui.showAlert("danger","İŞLEMLER AYNI");
        }
    }
    else{
        ui.showAlert("danger","Boş Alanı Bırakamazsınız");
    }
    
}
function uiChangeElement() {
    employeeList.innerHTML="";
    getAllEmployees();
    updateEmployeeButton.style.display="none";
    ui.clearInputs();  
}










//basic request funtions

// request.get()
// .then(respose =>console.log(respose))
// .catch(err=>console.log(err))

// request.post()
// .then(response =>console.log(response))
// .catch(err=> console.log(err))

// request.delete(3)
// .then(response => console.log(response))
// .catch(err=> console.log(err));

// request.put(2,{
//     name: "Sidar Tekin değişti",
//     departmant: "Yazılım değişti ",
//     salary: 5000
// })
// .then(response => console.log( response))
// .catch(err=> console.log(err))


