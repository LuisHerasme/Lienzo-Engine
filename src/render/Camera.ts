import Vector2D from '../vector/Vector2D'
import Graphic from './graphics/Graphic'
import { mouse } from './index'

class Camera {
  public context: CanvasRenderingContext2D
  public keyMap = { up: 'w', down: 's', left: 'a', right: 'd' }
  public position: Vector2D = new Vector2D(0, 0)
  private followedPosition: Vector2D
  private fLastPosition: Vector2D = new Vector2D(0, 0)
  private followingX: boolean = false
  private followingY: boolean = false
  private keyTranslateEnabled: boolean = false
  private velocity: Vector2D = new Vector2D(0, 0)
  private acceleration: Vector2D = new Vector2D(0, 0)
  private friction: number = 0.9

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
  }

  addForce(force: Vector2D): void {
    this.acceleration.add(force)
  }
  /*
    enable() {
      document.addEventListener('mousemove', (e) => {
        this.mouse.position.x = e.clientX
        this.mouse.position.y = e.clientY
      })
    }
  */
  getMouse() {
    return Vector2D.add(mouse.position, this.position)
  }

  disableKeyTranslate() {

  }

  enableKeyTranslate() {
    this.keyTranslateEnabled = true
    document.addEventListener('keypress', (e) => {
      if (e.key.toLowerCase() === this.keyMap.up) {
        this.addForce(new Vector2D(0, 10))
      }
      if (e.key.toLowerCase() === this.keyMap.down) {
        this.addForce(new Vector2D(0, -10))
      }
      if (e.key.toLowerCase() === this.keyMap.left) {
        this.addForce(new Vector2D(10, 0))
      }
      if (e.key.toLowerCase() === this.keyMap.right) {
        this.addForce(new Vector2D(-10, 0))
      }
    })
  }

  follow(graphic: Graphic): void {
    this.followedPosition = graphic.position
    this.fLastPosition = this.followedPosition.copy()
    this.followingX = true
    this.followingY = true
  }

  followX(graphic: Graphic): void {
    this.followedPosition = graphic.position
    this.followingX = true
  }

  followY(graphic: Graphic): void {
    this.followedPosition = graphic.position
    this.followingY = true
  }

  stopFollowing(): void {
    this.followingX = false
    this.followingY = false
  }

  stopFollowingX(): void {
    this.followingX = false
  }

  stopFollowingY(): void {
    this.followingY = false
  }

  zoom(where: Vector2D, howMuch: Vector2D): void {
    this.context.translate(where.x, where.y)
    this.context.scale(howMuch.x, howMuch.y)
    this.context.translate(-where.x, -where.y)
  }

  translate(x: number, y: number): void {
    this.position.x -= x
    this.position.y -= y
    this.context.translate(x, y)
  }

  update() {
    if (this.keyTranslateEnabled) {
      this.velocity.add(this.acceleration)
      this.velocity.mult(this.friction)
      this.translate(this.velocity.x, this.velocity.y)
      this.position.add(this.velocity)
      this.acceleration.zero()
    }
    if (this.followingX || this.followingY) {
      const change = Vector2D.sub(this.fLastPosition, this.followedPosition)
      this.fLastPosition = this.followedPosition.copy()
      this.translate(change.x, change.y)
    }
  }
}

export default Camera
