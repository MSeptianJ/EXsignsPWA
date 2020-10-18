// REGISTER SERVICE WORKER
const register = () => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then( () => {
                    console.log("Pendaftaran ServiceWorker berhasil");
                })
                .catch( () => {
                    console.error("Pendaftaran ServiceWorker Gagal");
                });
        });
    } else {
        console.error("ServiceWorker belum didukung browser ini.")
    }
}

export default register;