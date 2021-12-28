
vector0 = new Vector(0,0)

class Circle {
    constructor(name, radius, position, color = 'black') {
        this.name = name;
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = vector0;
        this.aceleration = vector0;
        this.gravity = null;
        this.friction = 1;
        return this;
    }

    /**
     * Move o objeto atual ao longo de sua velocidade.
     * Funciona melhor quando executada dentro de um requestAnimationFrame ou semelhante.
     */
    moveFor() {
        if(this.gravity){
            this.velocity.add(this.gravity)
        }
        this.position.add(
            this.velocity.add(this.aceleration).dotScalar(this.friction)
        )
    }
    
    moveForPoint(x, y) {
        const direction = new Vector(x, y)
        var vel = direction.clone().subtract(this.position).normalized().dotScalar(this.velocity.length)
        var acel = direction.clone().subtract(this.position).normalized().dotScalar(this.aceleration.length)
        this.position.add(
            direction.clone().normalized().add( vel.clone().add(acel).dotScalar(this.friction) )
        )
    }

    draw(contexto) {
        contexto.beginPath();
        contexto.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        contexto.fillStyle = this.color
        contexto.fill();
        contexto.font = '12px Arial'
        contexto.textAlign = 'center'
        contexto.fillText(this.name, this.position.x, this.position.y-(this.radius+3),)
        contexto.closePath()
    }
    drawLine(contexto, x0,y0,x1,y1){
        contexto.beginPath();
        contexto.moveTo(x0,y0);
        contexto.lineTo(x1,y1);
        contexto.lineWidth = 1
        contexto.stroke()
        contexto.closePath();
    }

    isInnerCircle(point){
        if(this.position.distance(point) > this.radius){
            return false;
        }
        return true;
    }
    
    setRadius(radius){
        this.radius = radius;
    }

    setGravity(gravity){
        this.gravity = gravity;
    }

    setVelocity(velocity){        
        this.velocity = velocity;
    }
    
    setAceleration(aceleration){
        this.aceleration = aceleration;
    }

    setFriction(friction){
        this.friction = friction;
    }

}