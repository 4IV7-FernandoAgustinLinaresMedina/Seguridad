function cifrarDES() {
    let txt = document.getElementById("txtDes").value;
    console.log("empezando el cifrado O.O");
  
    let claveDes = document.getElementById("clavedes").value;
    if (claveDes.length != 8) {
      alert("La clave debe contener exactamente 8 caracteres porfavor hagalo bien");
      return false;
    }
  
    let cifra = CryptoJS.DES.encrypt(txt, claveDes);
    console.log("Cifrado siuuu")
  
    descargarArchivo(generarTexto(cifra), "ArchivoCifrado.txt");
  }
  
  function descifrarDES() {
    let cifrado = document.getElementById("txtDes").value;
    console.log("empezando a descifrar");
  
    let claveDes = document.getElementById("clavedes").value;
    if (claveDes.length != 8) {
      alert("La clave debe contener exactamente 8 caracteres porfavor hagalo bien");
      return false;
    }
  
    let desci = CryptoJS.DES.decrypt(cifrado, claveDes);
    desci = desci.toString(CryptoJS.enc.Utf8);
    console.log("Descifrado al fin")
    descargarArchivo(generarTexto(desci), "ArchivoDescifrado.txt");
  }
  
  function leerarchivo() {
    let archivodes = document.getElementById("archivo").files[0];
  
    let readerDes = new FileReader();
    readerDes.onload = function (fileLoadedEvent) {
      let txtDes = fileLoadedEvent.target.result;
      document.getElementById("txtDes").value = txtDes;
    };
  
    readerDes.readAsText(archivodes, "UTF-8");
  }
  
  function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
  
    reader.onload = function (event) {
      var save = document.createElement("a");
      save.href = event.target.result;
      save.target = "_blank";
  
      save.download = nombreArchivo || "ArchivoCifrado.txt";
      var clicEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
  
      save.dispatchEvent(clicEvent);
  
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
  
    reader.readAsDataURL(contenidoEnBlob);
  }
  
  function generarTexto(datos) {
    let texto = [];
    texto.push(datos);
  
    return new Blob(texto, {
      type: "text/plain",
    });
  }
  