import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbMenuComponent } from '../components/breadcrumb-menu/breadcrumb-menu.component';
import { BreadcrumbMenu } from '../model/breadcrumb-menu';
import { ExtendedMenuItem } from '../model/extended-menu-item';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenubarModule,
    BreadcrumbModule,
    PanelModule,
    BreadcrumbMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'breadcrumb-menu';
  // I use an extended PrimeNG MenuItem with some additional properties 
  mbItems: ExtendedMenuItem[] | undefined;
  flatMbItems: ExtendedMenuItem[] = [];
  bcItems: ExtendedMenuItem[] | undefined;
  bcHome: ExtendedMenuItem | undefined;
  breadcrumbMenu: BreadcrumbMenu | undefined;
  
  ngOnInit() {
    this.mbItems = [
        {
            id: 'File',
            label: 'File',
            depth: 0,
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    id: 'NewFile',
                    label: 'New',
                    depth: 1,
                    parentId: 'File',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            id: 'Bookmark',
                            label: 'Bookmark',
                            depth: 2,
                            parentId: 'NewFile',
                            icon: 'pi pi-fw pi-bookmark',
                            fragment: 'File,NewFile',
                            command: this.menuClick.bind(this)
                        },
                        {
                            id: 'Video',
                            label: 'Video',
                            depth: 2,
                            parentId: 'NewFile',
                            icon: 'pi pi-fw pi-video',
                            fragment: 'File,NewFile',
                            command: this.menuClick.bind(this)
                        }
                    ]
                },
                {
                    id: 'DeleteFile',
                    label: 'Delete',
                    depth: 1,
                    parentId: 'File',
                    icon: 'pi pi-fw pi-trash',
                    fragment: 'File',
                    command: this.menuClick.bind(this)
                },
                {
                    id: 'ExportFile',
                    label: 'Export',
                    depth: 1,
                    parentId: 'File',
                    icon: 'pi pi-fw pi-external-link',
                    fragment: 'File',
                    command: this.menuClick.bind(this)
                }
            ]
        },
        {
            id: 'Edit',
            label: 'Edit',
            depth: 0,
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    id: 'Left',
                    label: 'Left',
                    depth: 1,
                    parentId: 'Edit',
                    icon: 'pi pi-fw pi-align-left',
                    fragment: 'Edit',
                    command: this.menuClick.bind(this)
                },
                {
                    id: 'Right',
                    label: 'Right',
                    depth: 1,
                    parentId: 'Edit',
                    icon: 'pi pi-fw pi-align-right',
                    fragment: 'Edit',
                    command: this.menuClick.bind(this)
                },
                {
                    id: 'Center',
                    label: 'Center',
                    depth: 1,
                    parentId: 'Edit',
                    icon: 'pi pi-fw pi-align-center',
                    fragment: 'Edit',
                    command: this.menuClick.bind(this)
                },
                {
                    id: 'Justify',
                    label: 'Justify',
                    depth: 1,
                    parentId: 'Edit',
                    icon: 'pi pi-fw pi-align-justify',
                    fragment: 'Edit',
                    command: this.menuClick.bind(this)
                }
            ]
        },
        {
            id: 'Users',
            label: 'Users',
            depth: 0,
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    id: 'NewUser',
                    label: 'New',
                    depth: 1,
                    parentId: 'Users',
                    icon: 'pi pi-fw pi-user-plus',
                    fragment: 'Users',
                    command: this.menuClick.bind(this)
                },
                {
                    id: 'DeleteUser',
                    label: 'Delete',
                    depth: 1,
                    parentId: 'Users',
                    icon: 'pi pi-fw pi-user-minus',
                    fragment: 'Users',
                    command: this.menuClick.bind(this)
                },
                {
                    id: 'Search',
                    label: 'Search',
                    depth: 1,
                    parentId: 'Users',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            id: 'Filter',
                            label: 'Filter',
                            depth: 2,
                            parentId: 'Search',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    id: 'Print',
                                    label: 'Print',
                                    depth: 3,
                                    parentId: 'Filter',
                                    icon: 'pi pi-fw pi-print',
                                    fragment: 'Users,Search,Filter',
                                    command: this.menuClick.bind(this)
                                }
                            ]
                        },
                        {
                            id: 'List',
                            label: 'List',
                            depth: 2,
                            parentId: 'Search',
                            icon: 'pi pi-fw pi-bars',
                            fragment: 'Users,Search',
                            command: this.menuClick.bind(this)
                        }
                    ]
                }
            ]
        },
        {
            id: 'Events',
            label: 'Events',
            depth: 0,
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    id: 'EditEvent',
                    label: 'Edit',
                    depth: 1,
                    parentId: 'Events',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            id: 'SaveEvent',
                            label: 'Save',
                            depth: 2,
                            parentId: 'EditEvent',
                            icon: 'pi pi-fw pi-calendar-plus',
                            fragment: 'Events,EditEvent',
                            command: this.menuClick.bind(this)
                        },
                        {
                            id: 'DeleteEvent',
                            label: 'Delete',
                            depth: 2,
                            parentId: 'EditEvent',
                            icon: 'pi pi-fw pi-calendar-minus',
                            fragment: 'Events,EditEvent',
                            command: this.menuClick.bind(this)
                        }
                    ]
                },
                {
                    id: 'Archieve',
                    label: 'Archieve',
                    depth: 1,
                    parentId: 'Events',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            id: 'Remove',
                            label: 'Remove',
                            depth: 2,
                            parentId: 'Archieve',
                            icon: 'pi pi-fw pi-calendar-minus',
                            fragment: 'Events,Archieve',
                            command: this.menuClick.bind(this)
                        }
                    ]
                }
            ]
        }
    ];

    this.flatMbItems = this.flattenMenuItems(this.mbItems);

    this.bcItems = [{id: 'none', depth: 0, label: 'Select entry from menubar above...' }];
    this.bcHome = { id: 'none', depth: 0, icon: 'pi pi-home', label: '' };

    this.breadcrumbMenu = new BreadcrumbMenu(this.flatMbItems);
  }

  // recursive function to get a flat array from the data tree
  flattenMenuItems(items: ExtendedMenuItem[]): ExtendedMenuItem[] {
    const result: ExtendedMenuItem[] = [];

    items.forEach(i => {
      result.push(i);
      if (i.items) {
        result.push(...this.flattenMenuItems(i.items));
      }
    });

    return result;
  }

  // menubar item callback to feed the breadcrumb
  menuClick(e: {item: MenuItem, originalEvent: PointerEvent}): void {
    if (!e.item.fragment || !e.item.id) return;
    const ids = e.item.fragment.split(',');
    ids.push(e.item.id);
    const tree = this.flatMbItems.filter(x=> x.id && ids.includes(x.id));
    this.bcItems = tree;
  }
}
