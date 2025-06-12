function viewCoordToScreenX(context, x) {
    return x + context.windowX
}

function viewCoordToScreenY(context, y) {
    return y + context.windowY
}

function screenCoordToViewX(context, x) {
    return x - context.windowX
}

function screenCoordToViewY(context, y) {
    return y - context.windowY
}

function normalizedDirection(b1, b2) {
    let dx = b2.posicaoHorizontal - b1.posicaoHorizontal;
    let dy = b2.posicaoVertical - b1.posicaoVertical;
    let distSq = dx * dx + dy * dy;
    let minDist = (b1.ballTam + b2.ballTam) / 2;
    if (distSq < minDist * minDist && distSq > 0) {
        let distVal = sqrt(distSq);
        let overlap = minDist - distVal;
        // Normalize direction
        let nx = dx / distVal;
        let ny = dy / distVal;
        
        return [overlap, nx, ny];
    } else {
        return [-1, 0, 0];
    }
}

function pushBallsApart(b1, b2, overlap, nx, ny) {
    b1.posicaoHorizontal -= nx * overlap / 2;
    b1.posicaoVertical -= ny * overlap / 2;
    b2.posicaoHorizontal += nx * overlap / 2;
    b2.posicaoVertical += ny * overlap / 2;
}