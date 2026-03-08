
document.getElementById("login-btn")
.addEventListener("click" , ()=>{
    // console.log("btn clicked");
    const userInput = document.getElementById("Username-input")
    const username =userInput.value ;
    
    const passwordInput =document.getElementById("password-input")
    const password =passwordInput.value ;

    if(username == "admin" && password =="admin123"){
        alert("login success")
        window.location.assign("home.html")
    } else{
        alert("login failed")
        return;
    }
})






