import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare var JEEFACETRANSFERAPI: any;

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements AfterViewInit {
  @ViewChild('videoPlayer', { static: false }) vid: ElementRef;
  @ViewChild('startButton', { static: true }) startButton: ElementRef;
  @ViewChild('myCanvas', { static: true }) canvasElement: ElementRef;

  trackingStarted = false;

  ngAfterViewInit() {
    this.initFaceFilter();
  }

  enableStart() {
    this.startButton.nativeElement.value = 'start';
    this.startButton.nativeElement.disabled = false;
  }

  startTracking() {
    this.trackingStarted = true;
    JEEFACETRANSFERAPI.switch_sleep(false);
    this.drawLoop();
  }

  stopTracking() {
    this.trackingStarted = false;
    JEEFACETRANSFERAPI.switch_sleep(true);
  }

  private async initFaceFilter(): Promise<void> {
    JEEFACETRANSFERAPI.init({
      canvasId: "overlay",
      NNCpath: '../src/app/vendor/',
      callbackReady: this.jeelizApiReadyHandler.bind(this)
    });
  }

  private jeelizApiReadyHandler(errCode, spec): void {
    if (errCode) {
      console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
      return;
    }

    console.log('INFO : JEEFACETRANSFERAPI IS READY');

    this.trackingStarted = true;
    this.enableStart();

    JEEFACETRANSFERAPI.on_detect((state) => {
      console.log('state: ', state);
      console.log('morphs: ', JEEFACETRANSFERAPI.get_morphTargetInfluences());
      if (state) {
        this.drawLoop();
      }
    });
  }

  drawLoop() {

    console.log('drawLoop');
    if (!this.trackingStarted) {
      return;
    }

    requestAnimationFrame(this.drawLoop.bind(this));

    let copyArray = JEEFACETRANSFERAPI.get_morphTargetInfluences();

    // do something with morph data here:
    console.log('morphs: ', copyArray);
  }

}
