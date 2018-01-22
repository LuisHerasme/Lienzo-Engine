
import ScriptManager  from '../components/Script'
import Transform      from '../components/Transform'
import Scene          from './Scene'
import Graphic        from '../render/Graphic'
import { Sprite }     from '../render/index'
import Collider       from '../components/Collider' 
import id             from '../utils/id'
import { Identifier } from '../components/components'

export default class GameObject {
  public id         : string = id()
  private scripts   : ScriptManager = new ScriptManager(this)
  public graphics   : Array<Graphic> = []
  public collider   : Collider
  public sprite     : Sprite
  public scene      : Scene
  public Transform  : Transform
  public Identifier : Identifier

  constructor (components) {
    for (let component in Object.keys(components)) {
      if (component === 'Graphic') {
        this.graphics.push(components[component])
      }
      else if (component === 'Sprite') {
        this.sprite = components[component]
      }
      else if (component === 'Animation') {
        this.sprite = components[component]
      }
      else if (component === 'Transform') {
        this.Transform = components[component]
      }
      else if (component === 'Collider') {
        this.collider = components[component]
      }
      else if (component === 'Scripts') {
        this.scripts.add(components[component])
      }
      else if (component === 'Script') {
        this.scripts.one(components[component])
      }
    }
  }

  run (methodName: string, params?: Array<any>): void {
    this.scripts.run(methodName, params)
  }

  destroy (): void {
    this.scene.destroy(this)
  }
}
