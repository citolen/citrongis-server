var app = new (require("express"))();

app.get("/download_txt", function (req ,res) {
    res.download("./input/test.txt", function (err) {
	if (err) {
	    console.log("Err : " + err);
	} else {
	    console.log("Ok");
	}
    })
});

app.get("/download_zip", function (req ,res) {
    res.download("./input/test.zip", function (err) {
	if (err) {
	    console.log("Err : " + err);
	} else {
	    console.log("Ok");
	}
    })
});

app.post("/download_txt", function (req ,res) {
    res.download("./input/test.txt", function (err) {
	if (err) {
	    console.log("Err : " + err);
	} else {
	    console.log("Ok");
	}
    })
});

app.post("/download_zip", function (req ,res) {
    res.download("./input/test.zip", function (err) {
	if (err) {
	    console.log("Err : " + err);
	} else {
	    console.log("Ok");
	}
    })
});

app.listen(6060);