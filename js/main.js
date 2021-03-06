import register from "./sw-register.js";

document.addEventListener("DOMContentLoaded", () => {
    register();

    const loadPage = page => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                let content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;

                    // initialise Select
                    let elems = document.querySelectorAll('select');
                    M.FormSelect.init(elems);

                } else  if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    }

    const loadNav = () => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                //    Muat daftar tautanm menu
                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                });

                //    Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                    elm.addEventListener("click", event => {
                        //    Tutup sidenav
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        //    Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                })
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    // Initialise Sidebar
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    // Load page content
    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page);

});
