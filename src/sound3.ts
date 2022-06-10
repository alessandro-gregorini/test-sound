import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { AssetContainer, ButtonBehavior, Sound } from '@microsoft/mixed-reality-extension-sdk';

export default class TestSound {
    private rootActor?: MRE.Actor = undefined;
    private testSound?: MRE.Sound = undefined;
    private testSoundUri = 
    'https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/2019525137279222608/ogg_doorbell-1.ogg'
    private assets: MRE.AssetContainer;
    private button: MRE.Actor;
    private ringbell: MRE.Actor;

    constructor (private context: MRE.Context) {
        this.assets = new MRE.AssetContainer(this.context);
    
		this.context.onStarted(() => this.started());
    }

    private started() {
        this.rootActor = MRE.Actor.Create(this.context, {
            actor: {
                name: 'Root Actor',
            }
		});

        this.testSound = this.assets.createSound('testSound', { uri: this.testSoundUri });

        this.assets = new MRE.AssetContainer(this.context);
        this.button = MRE.Actor.CreatePrimitive(this.assets,
            {
                definition: { shape: MRE.PrimitiveShape.Box},
                actor: {
                    transform: {
                        local: {
                            scale: { x: 0.6, y: 0.6, z: 0.6 },
                            position: { x: 0, y: 0, z: -30 }
                        }
                    },
                    appearance: { enabled: false }
                },
                addCollider: true
            }
        );
        this.ringbell = MRE.Actor.CreateFromLibrary(this.context,
            {
                resourceId: 'artifact: 2019670864705880739',
                actor: {
                    transform: {
                        local: {
                            scale: {x: 1, y: 1, z: 1 }
                        }
                    },
                    /*collider: {
                        enabled: true,
                        geometry: {
                            shape: MRE.ColliderType.Capsule,
                        }
                    }*/
                } 
            })
        const hitButton = this.ringbell.setBehavior(ButtonBehavior);
        hitButton.onClick(() => {
            this.rootActor.startSound(this.testSound.id, 
                {	//deve esserci almeno un parametro, anche se impostato al suo valore di default
                    pitch : 0,
                    volume: 0.2,
                    looping: false,
                    paused: false,
                    doppler: 1.0,
                    spread: 0.0,
                    rolloffStartDistance: 1.0,
                    time: 0
            })
        })
    }
}
