import { Component, Input } from '@angular/core';
import { BreadcrumbMenuSetComponent } from '../breadcrumb-menu-set/breadcrumb-menu-set.component';
import { BreadcrumbMenu } from '../../model/breadcrumb-menu';

@Component({
  selector: 'breadcrumb-menu',
  standalone: true,
  imports: [BreadcrumbMenuSetComponent],
  templateUrl: './breadcrumb-menu.component.html',
  styleUrl: './breadcrumb-menu.component.scss'
})
export class BreadcrumbMenuComponent {
  @Input() model: BreadcrumbMenu | undefined;
}
