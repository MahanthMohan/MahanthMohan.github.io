const endpoint = "https://api.github.com/users/mahanthmohan/repos";
(function getGithubStats() {
    var languages = [];
    var frequencies = [];
    // Built in fetch GET request to the GitHub API, to get data of all my repos
    fetch(endpoint).then((res) => res.json())
        .then((data) => { 
            data.map((v) => {
            languages.push(v["language"])
        })
        
    // get the unique elements of the array into a new array called categories
    var categories = [...new Set(languages)].filter(v => v != null)

    function elementCount(lst, e) {
	    var count = 0
	    lst.forEach((v) => {
		    if (v == e) {
			    count += 1
		    }
		})
        
		return count
    }

    categories.forEach((category) => {
	frequencies.push(elementCount(languages, category))
    })

    var ctx = document.getElementById("statsChart")
    var ghStatsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                label: "Languages Used",
                backgroundColor: [                
                    "#643cbc",
                    "#bc6ccc",
                    "#f4b464",
                    "#f43c5c",
                    "#fc0494",
                    "#047cfc",
                    "#66ff00",
		    "#fc6a03",
		    "#13eaf5",
                ],
                borderColor: "transparent",
                data: frequencies,
            }
            ]
        },
        options: {
            title: {
                display: true,
                fontSize: 22,
                text: "Languages Used (# of Repos)",
            },
            maintainAspectRatio: false,
            responsive: true,
        },
    });
})
})()
