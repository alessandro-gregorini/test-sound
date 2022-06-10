import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export default class SoundTest {

	private sound: MRE.Sound
	private root: MRE.Actor
	private asset: MRE.AssetContainer
	private button: MRE.Actor
	private text: MRE.Actor = null
	private soundUrl = 
	'https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/2019525137279222608/ogg_doorbell-1.ogg'

	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
	}

	private async loadSound() {
		this.asset = new MRE.AssetContainer(this.context);
        this.sound = this.asset.createSound('sound', { uri: this.soundUrl })
		this.root = MRE.Actor.Create(this.context, {});
		await this.sound.created
    }

	private async started() {
		this.text = MRE.Actor.Create(this.context, {
			actor: {
				name: 'Text',
				transform: {
					app: { position: { x: 0, y: 0.5, z: 0 } }
				},
				text: {
					contents: "Sound Test",
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.3
				}
			}
		});

		this.asset = new MRE.AssetContainer(this.context);
		this.button = MRE.Actor.CreatePrimitive(this.asset,
			{
				definition: { shape: MRE.PrimitiveShape.Box},
				actor: {
					transform: {
						local: {
							scale: { x: 0.6, y: 0.6, z: 0.6 }
						}
					},
					appearance: { enabled: true }
				},
				addCollider: true		
			}
		);

		this.button.created().then(() =>
		this.button.setBehavior(MRE.ButtonBehavior).onClick(() => this.startSound()));
		await Promise.all([this.loadSound()])
	}

	private startSound() {
		this.root.startSound(this.sound.id, 
			{	//looping è fondamentale sia true affinchè funzioni il suono
				pitch : 0,
				volume: 0.2,
				looping: true,
				paused: false,
				doppler: 0.0,
				spread: 0.7,
				rolloffStartDistance: 2.5,
				time: 30.0
		})
	}
}
