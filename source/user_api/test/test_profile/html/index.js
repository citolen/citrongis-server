function index(urls) {
    var html = ''+
	'<ul>'+
	'<li><a href="' + urls["login"] + '">login</a></li>'+
	'<li><a href="#">account</a></li>'+
	'</ul>';
    return html;
}

module.exports = index;