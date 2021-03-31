export class Request{
    constructor(url){
        this.url=url;
    }
    async get(){
        const response = await fetch(this.url);
        const json= await response.json();
        return json;
    }
    async post(data){
        const response=await fetch(this.url,{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)                                         
        });
        const json= await response.json();
        return json;
    }
    async delete(id){

        const response= await fetch(this.url+id,{
            method:"DELETE",
           });                
       return `${response.name} silindi`;
    }
    async put(id,data){
        const response= fetch(this.url+id,{
            method:"PUT",
            headers:{
                'Content-type': 'application/json; charset=UTF-8'  
               },
            body:JSON.stringify(data)
        });
        const json= await  (await response).json();
        return json;
    }
}
