const URLusers="http://localhost:3000/";

    function create (obj) {
        fetch(URLusers+"users", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(obj) 
        }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }

    function loogin (utente) {
        fetch(URLusers+"login", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(utente) 
        }).then(response => response.json())
        .then(json => statusResponse(json))
        .catch(err => console.log(err));
    } 

    function AddProdotti (obj) {
        fetch(URLusers+"prodotti", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(obj) 
        }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }

        function login (){
        let email=document.querySelector(".login").value.trim();
        let password=document.querySelector(".passsword").value.trim();
        let utente={
            email,
            password
        }
        console.log(utente)
        loogin(utente)
    }
// funzione registrazione user
    function user (){
        let n=document.querySelector(".nome").value.trim();
        let c=document.querySelector(".cognome").value.trim();
        let e=document.querySelector(".eta").value.trim();
        let email=document.querySelector(".mail").value.trim();
        let password=document.querySelector(".pass").value.trim();
        let obj={
            n,
            c,
            e,
            email,
            password
        }
        console.log(obj)
        create(obj)
    }
//funzione user loggato
    function userLoggato () {
        let loggato= localStorage.getItem("UserLog")
        if(loggato){
            let userLogIn= JSON.parse(loggato);
            let logNav = document.querySelector(".logNav")
            logNav.innerHTML="";
            logNav.innerText = userLogIn.user.n + " " + userLogIn.user.c
            let regNav = document.querySelector(".regNav")
            regNav.style.display="none"
            let logOutBtn = document.createElement('button');
            logOutBtn.setAttribute('type', "button")
            logOutBtn.className = "btn btn-sm btn-outline-warning ms-3"
            logOutBtn.innerText = 'Logout';
            logOutBtn.addEventListener('click', () => {
            localStorage.removeItem('UserLog');
            window.location = 'index.html';
        })
            let li = document.createElement('li');
            li.className = "nav-item"
            let a = document.createElement('a');
            a.className = "nav-link";
            a.href = "admin.html";
            a.setAttribute('aria-current', "page");
            a.innerText = 'Admin';
            li.appendChild(a);
            document.querySelector('.LogNav').appendChild(li);
            let LogNav=document.querySelector(".LogNav")
            LogNav.appendChild(logOutBtn)
        }
    }   

addEventListener("DOMContentLoaded",()=>{

    let btn=document.querySelector(".b")
    let btn2=document.querySelector(".b2")
    let btn3=document.querySelector(".add")
    let home=document.querySelector(".home")
    if(btn){
        console.log(btn)
        btn.addEventListener("click",(e)=>{
            e.preventDefault()
            user()
        })
    } else if(btn2){
        console.log(btn2)
        btn2.addEventListener("click",(e)=>{
            e.preventDefault()
            login()
        })
    } else if(btn3){
        console.log(btn3)
        visualizza()
        btn3.addEventListener("click",(e)=>{
            e.preventDefault()
            AddProdotti(prodotto())
        })
    }
    else if(home){
        console.log(home)
        compra()
    }
    userLoggato();
})
//funzione per la risposta status
function statusResponse (response){
    let formLog = document.querySelector("#pagLogin")
    formLog.lastElementChild.role !== null ? formLog.removeChild(formLog.lastElementChild) : null;
    
    let alertDiv= document.createElement("div")
    alertDiv.setAttribute('role', "alert")
    alertDiv.className = "alert alert-dismissible fade show ";

    if(response.accessToken){
        alertDiv.classList.add('alert-success');
        alertDiv.innerText = "Logged In!!"
        document.querySelector('.login').value = '';
        document.querySelector('.passsword').value = '';

        localStorage.setItem('UserLog', JSON.stringify(response))
        userLoggato()
    } else {
        alertDiv.classList.add('alert-danger');
        alertDiv.innerText = response
    }

    let alertBtn = document.createElement('button');
    alertBtn.className = "btn-close";
    alertBtn.setAttribute('type', "button");
    alertBtn.setAttribute('data-bs-dismiss', "alert");
    alertBtn.setAttribute('aria-label', "Close");
    alertDiv.appendChild(alertBtn);

    document.querySelector('#pagLogin').appendChild(alertDiv);
}

// funzione per aggiungere prodotti
function prodotto () {
    let marca=document.querySelector(".marca").value.trim();
    let modello=document.querySelector(".modello").value.trim();
    let categoria=document.querySelector(".categoria").value.trim();
    let prezzo=document.querySelector(".prezzo").value.trim();
    let quantita=document.querySelector(".quantita").value.trim();
    let immagine=document.querySelector(".immagine").value.trim();

    return  obj={
            marca,
            modello,
            categoria,
            prezzo,
            quantita,
            immagine
    }

}

//visualizzo i prodotti
function visualizza (){
        fetch(URLusers+"prodotti").then(response=>response.json()).then(json=> {
            console.log(json)
            let tbody=document.querySelector("#tbody")
                //console.log(tbody)
            json.forEach(e => {
                let tr=document.createElement("tr")
                tr.innerHTML=` <th scope="row">${e.id}</th>
                <td><img class="w-25" src="${e.immagine}"></td>
                <td>${e.modello}</td>
                <td>${e.marca}</td>
                <td>${e.quantita} pz</td>
                <td>${e.prezzo} $</td>
                <td>${e.categoria}</td>
                <td>
                <button type="button" id="elimina-${e.id}" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                </button>
                <button type="button" id="modifica-${e.id}" class="btn btn-sm btn-outline-warning">
                    <i class="bi bi-pencil-square"></i>
                </button>
                </td>`
                tbody.appendChild(tr)
            });
            tbody.addEventListener("click",(event)=>{
                //console.dir(event.target.id)
                let params=event.target.id.split("-")
                console.log(params)
                if(params[0]==="elimina"){
                    fetch(URLusers+"prodotti/"+params[1], {
                        method: 'DELETE',  
                    }).then(response => response.json())
                    .then(json => console.log(json))
                    .catch(err => console.log(err));
                }else if(params[0]==="modifica"){
                        fetch(URLusers+"prodotti/"+params[1],{
                            method:"PUT",
                            headers: {'Content-Type': 'application/json'},
                            body:JSON.stringify(prodotto())
                        })
                    }
            })
        })
}
// visualizza home
function compra () {
    fetch(URLusers+"prodotti").then(response=>response.json()).then(json=> {
        console.log(json)})
        fetch(URLusers+"prodotti").then(response=>response.json()).then(json=> {
            console.log(json)
            json.forEach(e => {
                let div=document.querySelector(".home")
                console.log(div)
                let div2=document.createElement("div")
                div2.innerHTML=` <div class="card mb-3" style="max-width: 440px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${e.immagine}" class="img-fluid rounded-start" alt="ciabatte">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${e.categoria}</h5>
                      <p class="card-text">${e.marca}</p>
                      <p class="card-text">${e.prezzo} $</p>
                        <button type="button" class="btn btn-sm btn-outline-dark compra">
                        <i class="bi bi-cart"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>`
              div.appendChild(div2)
            });
            
        })
}
