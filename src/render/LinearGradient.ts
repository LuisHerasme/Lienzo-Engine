
import Vector2D from '../vector/Vector2D'

class LinearGradient {
  public context: CanvasRenderingContext2D
  public position: Vector2D
  public gradient: any
  public size: Vector2D

  constructor(config?: any) {
    this.context = config.context
    this.size = config.size ? config.size : new Vector2D(100, 100)
    this.gradient = this.context.createLinearGradient(this.position.x, this.position.y, this.size.x, this.size.y)
    let counter = 0
    for (let color of config.colors) {
      this.gradient.addColorStop(counter, color)
      // console.log(1 / config.colors.length)
      counter += 1 / config.colors.length
    }
  }
}

export default LinearGradient
