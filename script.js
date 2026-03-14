function generateQR() {
  const qrContainer = document.getElementById("qrcode");
  const text = document.getElementById("qrText").value.trim();

  qrContainer.innerHTML = "";

  if (text === "") {
    alert("Please enter text or link");
    return;
  }

  new QRCode(qrContainer, {
    text: text,
    width: 220,
    height: 220
  });
}

function getQRImageSource() {
  const qrContainer = document.getElementById("qrcode");
  const canvas = qrContainer.querySelector("canvas");
  const img = qrContainer.querySelector("img");

  if (canvas) {
    return canvas.toDataURL("image/png");
  } else if (img) {
    return img.src;
  } else {
    return null;
  }
}

function downloadQR() {
  const dataUrl = getQRImageSource();

  if (!dataUrl) {
    alert("Please generate QR first");
    return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "qr-code.png";
  link.click();
}

async function shareQR() {
  const dataUrl = getQRImageSource();

  if (!dataUrl) {
    alert("Please generate QR first");
    return;
  }

  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], "qr-code.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "QR Code",
        text: "Here is my QR code",
        files: [file]
      });
    } else {
      alert("Sharing not supported on this device. Use Download QR button.");
    }
  } catch (error) {
    alert("Error sharing QR");
    console.log(error);
  }
}