
export class Ui{
    constructor(){
        this.cardBody=document.querySelectorAll(".card-body")[0];
        this.employeesList=document.getElementById("employees");
        this.updateButton=document.getElementById("update"); 
        this.name=document.getElementById("name");
        this.department=document.getElementById("department");
        this.salary=document.getElementById("salary");
    }
    getUiEmployees(name,department,salary,id){
        this.employeesList.innerHTML+=`
        <tr>     
            <td>${name}</td>
            <td>${department}</td>
            <td>${salary}</td>
            <td>${id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `;

    }
    addUi(name,salary,departmant,id){
        this.employeesList.innerHTML+=`
        <tr>     
            <td>${name}</td>
            <td>${departmant}</td>
            <td>${salary}</td>
            <td>${id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>    
        `;        
        this.clearInputs();
    }
    deleteFromEmployeeUi(element){
        element.remove();
    }
    changeEmployeeUi(target){
        if(this.updateButton.style.display==="none"){
            this.updateButton.style.display="block";
            this.valuSetUi(target);
        }
        else{
            this.updateButton.style.display="none";
            this.clearInputs();
        }
    }
    valuSetUi(target){
        const children=target.children;
        this.name.value=children[0].textContent;
        this.department.value=children[1].textContent;
        this.salary.value=children[2].textContent;

    }
    clearInputs(){
        this.name.value="";
        this.salary.value="";
        this.department.value="";
    }
    showAlert(alert,mesaage){
        const div = document.createElement("div");
        div.className=`alert alert-${alert}`;
        div.textContent=`${mesaage}`;
        this.cardBody.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 2000);
    }
}






