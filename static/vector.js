class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.direction = Math.atan2(this.y, this.x);
    }

    clone(){
        return new Vector(this.x, this.y);
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    subtract(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    dot(vector){
        this.x *= vector.x;
	    this.y *= vector.y;
	    return this;
    }
    dotScalar(escalar){
        this.x *= escalar;
        this.y *= escalar;
        return this;
    }

    invert(){
        this.x *= -1;
        this.y *= -1;
        return this;
    }

    invertX(){
        this.x *= -1;
        return this;
    }

    invertY(){
        this.y *= -1;
        return this;
    }

    normalized(){
        this.x /= this.length
        this.y /= this.length
        return this
    }

    distance(vector){
        return Math.sqrt(Math.pow(this.x - vector.x,2) + Math.pow(this.y - vector.y,2))
    }


}