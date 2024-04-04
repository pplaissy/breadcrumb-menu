import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

export class AppMenuItem implements MenuItem {
    id: string;
    parent: AppMenuItem | undefined;
    depth: number;
    label: string;
    items?: AppMenuItem[];
    selected: boolean = false;
    icon: string | undefined;
    deadEnd: boolean;
    command?(event: MenuItemCommandEvent): void;

    constructor(id: string, label: string, depth: number, deadEnd: boolean, command: (event: MenuItemCommandEvent) => void) {
        this.id = id;
        this.label = label;
        this.depth = depth;
        this.deadEnd = deadEnd;
        this.command = command;
    }
}