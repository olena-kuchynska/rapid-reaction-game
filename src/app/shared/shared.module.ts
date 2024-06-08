import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SHARED_COMPONENTS } from './components';

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_COMPONENTS],
  imports: [CommonModule]
})
export class SharedModule {}
