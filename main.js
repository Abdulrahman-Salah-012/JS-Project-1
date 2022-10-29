let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button ");
let reponsData = document.querySelector(".show-data ");

// set Click Event
getButton.addEventListener("click", function () {
  getRepos();
});

// Get Repos Fun
function getRepos() {
  if (theInput.value == "") {
    reponsData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        reponsData.innerHTML = "";
        // console.log(repos);

        //Loop ON DATA
        repos.forEach((repo, index) => {
          console.log(repo);
          let mainDiv = document.createElement("div");
          mainDiv.innerHTML = `${index + 1}=> ${repo.name}`;

          let theUrl = document.createElement("a");
          theUrl.innerHTML = "Visit";
          theUrl.href = `https://github.com/users/${theInput.value}/${repo.name}`;
          theUrl.target = "_blank";

          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          starsSpan.appendChild(starsText);

          mainDiv.className = "repo-box";
          mainDiv.appendChild(theUrl);
          mainDiv.appendChild(starsSpan);
          reponsData.appendChild(mainDiv);
        });
      });
  }
}
