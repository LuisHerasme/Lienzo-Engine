import Vector2D from '../../vector/Vector2D'

class Animation {
  public position: Vector2D
  public loop: boolean = true
  public size: Vector2D = new Vector2D(32, 32)
  public scale: Vector2D
  public frameRate: number
  public x: number
  public y: number
  public image: HTMLImageElement
  public interval: any
  public frame:Vector2D = new Vector2D(0, 0)
  public animations: any
  public animationPlaying: boolean = false
  public context: CanvasRenderingContext2D

  constructor(configuration: any) {
    this.load(configuration.src)
    this.loop = configuration.loop ? configuration.loop : true
    this.size = configuration.size ? configuration.size : new Vector2D(32, 32)
    this.scale = configuration.scale ? configuration.scale : new Vector2D(1, 1)
    this.frameRate = configuration.frameRate ? configuration.frameRate : 24
    this.animations = configuration.animations
    this.x = 0
    this.y = 0
  }

  playAnimation (name: string): void {    
    if (!this.animationPlaying) {
      this.animationPlaying = true
      this.frame.x = 0
      this.frame.y = this.animations[name][1]
      this.reproduceAnimation(name)
    }
  }

  reproduceAnimation (name: string): void {
    this.x = this.size.x * this.frame.x
    this.y = this.size.y * this.frame.y
    this.frame.x += 1
    if (this.frame.x >= this.animations[name][0]) {
      this.animationPlaying = false
    } else {
      setTimeout(() => this.reproduceAnimation(name), this.frameRate)
    }
  }
  load(src: string): void {
    this.image = new Image()
    this.image.src = src
  }

  getSize() {
    return new Vector2D(this.size.x * this.scale.x, this.size.y * this.scale.y)
  }

  render() {
    this.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.size.x, this.size.y,
      this.position.x,
      this.position.y,
      this.size.x * this.scale.x,
      this.size.y * this.scale.y
    )
  }

  destroy() {
    clearInterval(this.interval)
  }
}

export default Animation
