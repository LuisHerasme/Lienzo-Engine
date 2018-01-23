
import Vector2D       from '../Vector/Vector2D'
import { Rect }       from '../physics/index'
import GameObject     from '../Managers/GameObject'
import GameScene      from '../Managers/GameScene'


export default class Collider  {
  private static      : boolean
  private restitution : Vector2D
  private collision   : Function
  private gameObject  : GameObject
  private collider    : Rect.Dynamic|Rect.Collider
  public size

  constructor (configuration) { 
    this.restitution = configuration.restitution
    this.size        = configuration.size
    this.static      = configuration.static
  }

  load (gameObject: GameObject, Scene: GameScene) {
    if (this.size === 'fit') {
      if (this.static) {
        this.collider = new Rect.Collider(
          gameObject.Transform.position,
          new Vector2D(50, 50)/*
          gameObject.sprite.getSize()*/
        )
      }
      else {
        this.collider = new Rect.Dynamic(
          gameObject.Transform.position, 
          this.restitution,
          new Vector2D(50, 50)
          /*
          gameObject.sprite.getSize()
          */
        )
      }
    }
    
    else {
      if (this.static) {
        this.collider = new Rect.Collider(
          gameObject.Transform.position,
          this.size
        )
      }
      else {
        this.collider = new Rect.Dynamic(
          gameObject.Transform.position, 
          this.restitution,
          this.size
        )
      }
    }
/*
    if (!gameObject.sprite.animation) {
      gameObject.sprite.scale = new Vector2D(
        this.size.x / gameObject.sprite.image.width,
        this.size.y / gameObject.sprite.image.height)
    }
  */
    this.collision = (other) => {
      gameObject.run('collision', [other])
    }
  //  gameObject.collider = this.collider

   // if (gameObject.collider) {
   //   gameObject.collider.load(gameObject)
    Scene.world.add(this.collider)
   // }

  }
}
