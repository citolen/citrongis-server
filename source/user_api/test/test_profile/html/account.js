function account(urls, data) {

    console.log("data : " + data);
    console.log("data : " + data["authInfo_password"]);
    var html = '<form action="' + urls["account_handle"] + '" method="post">'+
      '<fieldset>'+
	'<fieldset>'+
	'<legend>Authentification</legend>'+
	'<table>'+
	'<tr>'+
	'<td><label for="login" style="width:150px">Login</label></td>'+
	'<td><input type="text" name="authInfo_email" id="login" value="' + data["authInfo_email"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="passwd">Password</label></td>'+
	'<td><input type="text" name="authInfo_password" id="passwd" value="' + data["authInfo_password"] + '"></td>'+
	'</tr>'+
	'</table>'+
	'</fieldset>'+
	'<br/><br/>'+ //-------------------------------------------------------
	'<fieldset>'+
	'<legend>UserInfos</legend>'+
	'<table>'+
	'<tr>'+
	'<td><label for="firstname" style="width:150px">FirstName</label></td>'+
	'<td><input type="text" name="userInfo_firstName" id="firstname" value="' + data["userInfo_firstName"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="lastname">LastName</label></td>'+
	'<td><input type="text" name="userInfo_lastName" id="lastname" value="' + data["userInfo_lastName"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="dataofbirth">Date of Birth</label></td>'+
	'<td><input type="text" name="userInfo_dateOfBirth" id="dateofbirth" value="' + data["userInfo_dateOfBirth"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="language">Language</label></td>'+
	'<td><input type="text" name="userInfo_language" id="language" value="' + data["userInfo_language"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="profiletype">Profile Type</label></td>'+
	'<td><input type="text" name="userInfo_profileType" id="profiletype" value="' + data["userInfo_profileType"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="picture">Picture</label></td>'+
	'<td><input type="text" name="userInfo_picture" id="picture" value="' + data["userInfo_picture"] + '"></td>'+
	'</tr><tr>'+
	'<td>Contact</td>'+
	'<td>'+
	'<fieldset>'+
	'<table>'+
	'<tr>'+
	'</tr><tr>'+
	'<td><label for="email">Email</label></td>'+
	'<td><input type="text" name="userInfo_contact_email" id="email" value="' + data["userInfo_contact_email"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="phone">Phone</label></td>'+
	'<td><input type="text" name="userInfo_contact_phoneNumber" id="phone" value="' + data["userInfo_contact_phoneNumber"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="location">Location</label></td>'+
	'<td><input type="text" name="userInfo_contact_location" id="location" value="' + data["userInfo_contact_location"] + '"></td>'+
	'</tr>'+
	'</table>'+
	'</fieldset>'+
	'</td>'+
	'</tr><tr>'+
	'<td>Job</td>'+
	'<td>'+
	'<fieldset>'+
	'<table>'+
	'</tr><tr>'+
	'<td><label for="status">Status</label></td>'+
	'<td><input type="text" name="userInfo_job_status" id="status" value="' + data["userInfo_job_status"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="name">Name</label></td>'+
	'<td><input type="text" name="userInfo_job_compagny_name" id="name" value="' + data["userInfo_job_compagny_name"] + '"></td>'+
	'</tr><tr>'+
	'<td><label for="location">Location</label></td>'+
	'<td><input type="text" name="userInfo_job_compagny_location" id="location" value="' + data["userInfo_job_compagny_location"] + '"></td>'+
	'</table>'+
	'</fieldset>'+	
	'</td>'+	
	'</tr>'+
	'</table>'+
	'</fieldset>'+
	'<br/><br/>'+
	'<fieldset>'+
	'<legend>Account infos</legend>'+
	'<table>'+
	'<tr>'+
	'<td><label for="creationdate">Creation Date</label></td>'+
	'<td><input type="text" name="accountInfo_creationDate" id="creationdate" value="' + data["accountInfo_creationDate"] + '"></td>'+
	'</tr>'+
	'</table>'+
	'</fieldset>'+
	'<table>'+
	'<tr>'+
	'<td><button type="submit" name="button" value="submit">Submit</button></td>'+
	'</tr>'+
	'</table>'+
	'</fieldset>'+
	'</form>';
    return html;
}

module.exports = account;