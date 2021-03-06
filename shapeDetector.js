const faceDetector = new FaceDetector({
    // (Optional) Hint to try and limit the amount of detected faces
    // on the scene to this maximum number.
    maxDetectedFaces: 5,
    // (Optional) Hint to try and prioritize speed over accuracy
    // by, e.g., operating on a reduced scale or looking for large features.
    fastMode: false
});
async function detectFace(image) {
    try {
        const faces = await faceDetector.detect(image);
        faces.forEach(face => {
            console.log(face);
            $( "#imageWrapper" ).append('<div class="imageBox" style="width:'+face.boundingBox.width+'px; height:'+face.boundingBox.height+'px; left:'+face.boundingBox.left+'px; top:'+face.boundingBox.top+'px;"></div>');
        });
    } catch (e) {
        console.error('Face detection failed:', e);
    }
}
console.log("faceDetector", faceDetector);


const barcodeDetector = new BarcodeDetector({
    // (Optional) A series of barcode formats to search for.
    // Not all formats may be supported on all platforms
    formats: [
        'aztec',
        'code_128',
        'code_39',
        'code_93',
        'codabar',
        'data_matrix',
        'ean_13',
        'ean_8',
        'itf',
        'pdf417',
        'qr_code',
        'upc_a',
        'upc_e'
    ]
});
async function detectBarcode(image) {
    try {
        const barcodes = await barcodeDetector.detect(image);
        var html = "";
        barcodes.forEach(barcode => {
            console.log(barcode);
            $( "#imageWrapper" ).append('<p>'+barcode.rawValue+'<p>');
        });

    } catch (e) {
        console.error('Barcode detection failed:', e);
    }
}
console.log("barcodeDetector", barcodeDetector);


const textDetector = new TextDetector();
async function detectText(image) {
    try {
        console.log(image)
        const texts = await textDetector.detect(image);
        texts.forEach(text => {
            $( "#imageWrapper" ).append('<div class="imageBox" style="width:'+text.boundingBox.width+'px; height:'+text.boundingBox.height+'px; left:'+text.boundingBox.left+'px; top:'+text.boundingBox.top+'px;"></div>');
        });
        } catch (e) {
        console.error('Text detection failed:', e);
    }

}
console.log(textDetector);

function previewFile(type) {
    switch (type) {
        case "text":
            detectText(document.querySelectorAll('img')[0]);
            break;
        case "bar":
            detectBarcode(document.querySelectorAll('img')[0])
            break;
        case "face":
            detectFace(document.querySelectorAll('img')[0]);
            break;
        default:
            console.log("Hmm check the html??")
    }


}
function readURL(input, type) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = document.querySelector('#img_prev')
            img.setAttribute('src', e.target.result);
            setTimeout(() => {
                previewFile(type);
            },20)
            
        };

        reader.readAsDataURL(input.files[0]);
    }
}

