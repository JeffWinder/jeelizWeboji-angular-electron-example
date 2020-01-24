import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './tracker.component';

@NgModule({
  declarations: [TrackerComponent],
  imports: [CommonModule, TrackerRoutingModule]
})
export class TrackerModule { }
