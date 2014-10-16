function index(urls) {
    var html = ''+
	'<ul>'+
	'<li><a href="' + urls["login"] + '">login</a></li>'+
	'<li><a href="' + urls["post_account"] + '">account</a></li>'+
	'</ul>';
    return html;
}

module.exports = index;