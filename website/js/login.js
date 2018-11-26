function rememberMe(){
	if(document.getElementById('save_uname').checked) {
		var username = document.getElementById("username").value;
		localStorage.setItem("username", username);	
	}	
}

window.addEventListener("load", function(){
    if (localStorage.getItem("username") !== null) {
		document.getElementById("username").value = localStorage.getItem("username");
	}
});
