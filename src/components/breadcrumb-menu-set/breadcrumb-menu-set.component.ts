import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AppMenuSet } from '../../model/app-menu-set';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'breadcrumb-menu-set',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './breadcrumb-menu-set.component.html',
  styleUrl: './breadcrumb-menu-set.component.scss'
})
export class BreadcrumbMenuSetComponent implements OnChanges  {
  @Input() model: AppMenuSet | undefined;
  @ViewChild('menuButton', {read: ElementRef}) menuButton: ElementRef | undefined;
  @ViewChild('menu', {read: ElementRef}) menu: ElementRef | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && !this.model?.selectedMenuItem()) {
      setTimeout(() => {
        this.menuButton?.nativeElement.click();
      }, 0);
    }
  }

  onShow(): void {
    setTimeout(() => {
      if(!this.menu) return;
      
      const focusClass = "p-focus";
      let hasPreviousSelection = false;
      const menuItems = Array.from(this.menu.nativeElement.getElementsByClassName('p-menuitem') as HTMLCollectionOf<HTMLElement>);
      
      menuItems.forEach(i => {
        // for each menu item
        // focus is removed (by default on the first item in the list)
        i.classList.remove(focusClass);

        // If the item was previously selected, it has a "check" icon.
        // We look for it in children
        const checkChild = i.querySelector("i");
        if (checkChild) {
          // The element was selected, the focus is returned to it.
          i.classList.add(focusClass);
          hasPreviousSelection = true;
        }
      });

      // If nothing was already selected in the menu, the focus is returned to the first item.
      if (!hasPreviousSelection) {
        menuItems[0].classList.add(focusClass);
      }
    }, 0);
  }

  onHide(): void {
    setTimeout(() => {
      this.model?.onHide();
    }, 0);
  }
}
