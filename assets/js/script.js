const endpoint = "https://api.github.com/users/mahanthmohan/repos";
function getGithubStats() {
    var languages = [];
    var frequencies = [];
    // Axios GET request to the GitHub API, to get data of all my repos
    axios({ method: "GET", url: endpoint }).then((res) => {
        res.data.map((v) => {
            languages.push(v["language"])
        })
        
        // get the unique elements of the array into a new array called categories
        var categories = [...new Set(languages)].filter(v => v != null)

        function elementCount(lst, e) {
            var count = 0
            for(var i = 0; i < lst.length; i++) {
                if(lst[i] == e) {
                    count += 1
                } else {
                    count += 0
                }
            }
            return count
        }

        for(var k = 0; k < categories.length; k++) {
            frequencies.push(elementCount(languages, categories[k]))
        }

        var ctx = document.getElementById("statsChart")
        var myDoughnutChart = new Chart(ctx, {
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
                        "#66ff00"
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
                responsive: false,
            },
        });
    })
}