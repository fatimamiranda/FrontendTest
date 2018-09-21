/*var githubUserName = 'fatimamiranda';
var githubRepoName = 'examenf5';

var githubApiRequestUrl = 'https://api.github.com/repos/' + githubUserName + '/' + githubRepoName + '/commits'
*/


function gitHubApi(){

var nombre = document.formul.buscar.value;
var githubApiRequestUrl = 'https://api.github.com/users/'+ nombre;
var githubApiRequestUrlRepos = 'https://api.github.com/users/'+ nombre +'/repos';
var urlError = false;


function request(url, callback) {
  // Create the request
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  
  // Uncomment to use Authorization
  //req.setRequestHeader('Authorization', 'Basic ' + btoa('u:p'));

  // Add the listeners
  req.addEventListener('readystatechange', function() {
    if (req.readyState === 4 && req.status === 200) {
      // Pass the data back to the callback
      callback.call(null, req.responseText);
    }
    else {
      urlError = true;
    }
  });

  // Send the request
  req.send();

}

function requestJSON(url, callback) {
  // Make the request
  request(url, function(response) {
    // Pass the decoded response to the callback
    callback.call(null, JSON.parse(response));
  });

}

//requestJSON('https://api.github.com/repos/fublo/fublo-parent-theme/commits', function(json) {
requestJSON(githubApiRequestUrl,
  function(json) {
  
document.getElementById("username").innerHTML = '@'+json.login;
document.getElementById("fullname").innerHTML = json.name;
document.getElementById("bio").innerHTML = json.bio;
document.getElementById ("logo").innerHTML = '<img class="logo" src='+json.avatar_url+' alt="" >';
  }
);

var jsonRepos = [];

requestJSON(githubApiRequestUrlRepos,
    function(json) {
 

document.getElementById("repo1").innerHTML = json[0].name;
document.getElementById("repo2").innerHTML = json[1].name;
document.getElementById("repo3").innerHTML = json[2].name;
document.getElementById("repo4").innerHTML = json[3].name;
document.getElementById("repo5").innerHTML = json[4].name; 

document.getElementById("star1").innerHTML = json[0].stargazers_count;
document.getElementById("star2").innerHTML = json[1].stargazers_count;
document.getElementById("star3").innerHTML = json[2].stargazers_count;
document.getElementById("star4").innerHTML = json[3].stargazers_count;
document.getElementById("star5").innerHTML = json[4].stargazers_count;

var gitHubApiRequestUrlBranch;

for (var i=0; i<json.length-1 && i<5; i++); {

gitHubApiRequestUrlBranch = 'https://api.github.com/repos/'+ nombre +'/'+ json[i].name + '/branches';

requestJSON (gitHubApiRequestUrlBranch,
    function(json){
        l= json.length;  
        b = "branch"+ i;
        console.log(json);
        console.log(l);
        document.getElementById(b).innerHTML = (l);
    });
}


}
);
console.log("lwedhed" + urlError);
return urlError;
}


