class Ball {
    id = undefined;
    //Posição na tela
    posicaoHorizontal = 0;
    posicaoVertical = 0;

    ballTam = 40;
    isDragging = false;
    isTouching = new Map();

    // Physics variables
    velocityY = 0;
    velocityX = 0;
    dragOffsetX = 0;
    dragOffsetY = 0;

    color = [255, 255, 255];
    name = "";

    constructor(id, context, horizontal, vertical, color, name) {
        this.id = id;
        this.posicaoHorizontal = horizontal;
        this.posicaoVertical = vertical;
        this.color = color;
        this.name = name;
        this.quica(context);
    }

    draw(context) {
        // Draw the ball
        fill(this.color);
        stroke(0);
        ellipse(
            this.posicaoHorizontal, 
            this.posicaoVertical, 
            this.ballTam, 
            this.ballTam
        );

        // Draw the name centered on the ball
        fill(0);
        noStroke();
        // textAlign(CENTER, CENTER);
        // textSize(12);
        // text(this.name, this.posicaoHorizontal, this.posicaoVertical);

        // Apply horizontal velocity (inertia)
        if (!this.isDragging) {
            // Apply gravity
            this.velocityY += gravity;
            this.posicaoVertical += this.velocityY;

            this.posicaoHorizontal += this.velocityX;
            // Friction
            this.velocityX *= 0.98;

            this.quica(context);
        }
    }

    quica(context) {
        // Bounce on bottom
        if (this.posicaoVertical + this.ballTam / 2 > height) {
            this.posicaoVertical = height - this.ballTam / 2;
            this.velocityY *= -bounce;
        }

        // Bounce on top
        if (this.posicaoVertical - this.ballTam / 2 < 0) {
            this.posicaoVertical = this.ballTam / 2;
            this.velocityY *= -bounce;
        }

        // Bounce on sides
        if (this.posicaoHorizontal + this.ballTam / 2 > width) {
            this.posicaoHorizontal = width - this.ballTam / 2;
            this.velocityX *= -bounce;
        }

        if (this.posicaoHorizontal - this.ballTam / 2 < 0) {
            this.posicaoHorizontal = this.ballTam / 2;
            this.velocityX *= -bounce;
        }
    }

    mousePressed() {
        // Check if mouse is inside the ball
        let d = dist(mouseX, mouseY, this.posicaoHorizontal, this.posicaoVertical);
        if (d < this.ballTam / 2) {
            this.isDragging = true;
            this.dragOffsetX = this.posicaoHorizontal - mouseX;
            this.dragOffsetY = this.posicaoVertical - mouseY;
            this.velocityX = 0; // Stop inertia while dragging
            this.velocityY = 0;
        }
    }

    mouseDragged(context) {
        if (this.isDragging) {
            this.posicaoHorizontal = mouseX + this.dragOffsetX;
            this.posicaoVertical = mouseY + this.dragOffsetY;
            if(this.isTouching.size > 0) {
                this.isTouching.forEach((value, key) => {
                    const [overlap, nx, ny] = normalizedDirection(this, value);
                    pushBallsApart(this, value, overlap, nx, ny);
                })
            }
            this.quica(context);
        }
    }

    mouseReleased() {
        if (this.isDragging) {
            // Give velocity based on mouse movement
            this.velocityX = movedX;
            this.velocityY = movedY;
            this.isDragging = false;
        }
    }

    addIsTouching(ball) {
        if(this.isTouching.has(ball.id)) {
            return;
        } else {
            this.isTouching.set(ball.id, ball);
            console.log(this.id, " is touching ", ball.id);
        }
    }

    removeIsTouching(ball) {
        if(this.isTouching.has(ball.id)) {
            delete this.isTouching.delete(ball.id);
        }
    }
}