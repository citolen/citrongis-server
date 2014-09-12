function loginForm(urls) {
    var client_id = "testclientid";
    var client_secret = "testclientsecret";
    
    var html = ''+
	'<form action="' + urls["login_handle"] + '" method="post">'+
	'<table>'+
	'<tr>'+
	'<td><label for="username">Name</label></td>'+
	'<td><input type="text" id="email" name="email" placeholder="Enter name"></td>'+
	'</tr><tr>'+
	'<td><label for="password">password</label></td>'+
	'<td><input type="text" id="password" name="password" placeholder="Enter Password"></td>'+
	'</tr><tr>'+
	'<td><input type="hidden" id="client_id" placeholder="client_id" name="client_id" value="'+client_id+'"></td>'+
	'</tr><tr>'+
	'<td><input type="hidden" id="client_secret" placeholder="client_secret" name="client_secret" value="'+client_secret+'"></td>'+
	'</tr><tr>'+
	'<td><input type="hidden" id="grant_type" placeholder="grant_type" name="grant_type" value="password"></td>'+
	'</tr>'+
	'</table>'+
	'<button type="submit">Submit</button>'+
	'</form>';
    return html;
}

module.exports = loginForm;