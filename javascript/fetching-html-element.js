app.use("/navbar", (request, response) => {
  response.sendFile("/public/html/navbar.html");
});

/* the "navbar.html" will contain the navbar including it's own style and script
<nav>
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
</nav>
<style> a {color: brown;} </style>
<script> console.log("Hello from Navbar"); </script>
*/

/* ===== Client ===== */
// put this "<div id="navbar-container"></div>" in the page where you want to render the Navbar.

async function fetchX(url, type) {
  // "json", "text", "document"
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // xhr.responseType = type;
    xhr.open("GET", url, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.response || xhr.responseText);
      return reject(new Error(xhr.response || xhr.responseText));
    };
    xhr.onerror = error => reject(new Error("NetworkError: Please check your connection(!)"));
    xhr.send();
  });
}

fetchX("http://localhost:3000/navbar")
  .then(navbar => {
    document.getElementById("navbar-container").innerHTML = navbar; // Solution 1

    // Solution 2
    // const navbar = new DOMParser().parseFromString(htmlString, "text/html");
    // document.body.insertBefore(navbar.documentElement, document.body.children[0]);
  })
  .catch(err => console.log(err));
