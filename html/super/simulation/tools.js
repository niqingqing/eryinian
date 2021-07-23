class Tools {
    calcSize(pixelWidth, pixelHeight, screenWidth, screenHeight) {
        let pixeRate = pixelWidth / pixelHeight;
        let width, height;
        height = screenHeight;
        width = pixeRate * height;
        return { width, height };
    }
}
