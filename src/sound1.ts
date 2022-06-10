import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { AssetContainer, Sound } from '@microsoft/mixed-reality-extension-sdk';

export default class TestSound {
    private sound: MRE.Sound;
    private assets: MRE.AssetContainer;
    private actor: MRE.Actor;
    private soundUri = 'https://www.davearendash.com/dulcimer.wav'

    constructor(private context: MRE.Context) {
        this.context.onStarted(() => this.started());
    }

    private started() {
        this.sound = this.assets.createSound('testsound', { uri: this.soundUri});

        this.context.onUserJoined((user) => this.userJoined());
    }

    private userJoined() {
        this.actor.startSound(this.sound.id, { })
    }
}
