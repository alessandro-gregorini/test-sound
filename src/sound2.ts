import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { AssetContainer, Sound } from '@microsoft/mixed-reality-extension-sdk';

export default class TestSound {
    private sound: MRE.Sound;
    private assets: MRE.AssetContainer;
    private actor: MRE.Actor;

    constructor(private context: MRE.Context) {
        this.context.onStarted(() => this.started());
    }
    private async started() {
        await Promise.all([
            this.loadSound(),
            this.createActor()
        ])

        this.context.onUserJoined((user) => this.userJoined());

    }

    private createActor() {
        const actorPromise = MRE.Actor.Create(this.context, {
            // Also apply the following generic actor properties.
            actor: {
                name: 'Actor',
                // Parent the glTF model to the text actor.
            }
        });
        this.actor = actorPromise;
    }
    private async loadSound() {
        await {}
        this.sound = this.assets.createSound('testsound', 
        { uri: 'https://www.pacdv.com/sounds/ambience_sounds/freeway-1.mp3'});
    }

    private userJoined() {
        this.actor.startSound(this.sound.id, { })
    }
}
