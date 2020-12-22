let fileReader = new FileReader();
fileReader.onload = function(event) {
    let nome = document.getElementById("file").value.split("\\")[document.getElementById("file").value.split("\\").length - 1];
    aggiungiFile(fileReader.result, nome);
};
document.getElementById("file").onchange = function(event) {
    fileReader.readAsText(event.target.files[0]);
};