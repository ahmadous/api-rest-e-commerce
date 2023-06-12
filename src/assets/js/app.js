const feedDisplay = document.querySelector("#feed");
fetch("http://localhost:5000/api/products")
	.then(response => {return response.json()})
	.then(data =>
		data.forEach(element=> {
			const title = `<h3>` + element.title + `</h3>`;
			feedDisplay.insertAdjacentHTML("beforeBegin", title);
		})
	)
	.then((err) => {
		console.log(err);
	});
