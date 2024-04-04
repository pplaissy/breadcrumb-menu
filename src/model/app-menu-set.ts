import { AppMenuItem } from "./app-menu-item";

export class AppMenuSet {
    id: string;
    depth: number;
    menuItems: AppMenuItem[] = [];
    children: AppMenuSet[] = [];
    parent: AppMenuSet | undefined;
    hasSelected: boolean = false;

    moveForwardMenuRequested?: (menuId: string) => void;
    selectedMenuItemChange?: (menuId: string) => void;

    constructor(id: string, depth: number, parent: AppMenuSet | undefined, menuItems: AppMenuItem[]) {
        this.id = id;
        this.depth = depth;
        this.parent = parent;
        this.menuItems = menuItems;
    }

    selectedLabel(): string | undefined {
        const selected = this.selectedMenuItem();
        if (selected) return selected.label;
        return 'Select...';
    }

    selectedMenuItem(): AppMenuItem | undefined {
        return this.menuItems.find(x=> x.selected);
    }

    contains(id: string): boolean {
        return this.menuItems.find(x=> x.id === id) !== undefined;
    }

    select(id: string): void {
        this.menuItems.forEach(i => {
            i.selected = i.id === id;
        });
        this.hasSelected = id !== "";
    }

    unselect(): void {
        this.select("");
    }

    onHide(): void {
        // If no element is selected, we're out by escape
        if (!this.hasSelected) {
            // in which case the first element is selected by default
            const firstId = this.menuItems[0].id;
            const firstSet = this.children.find(x=> x.id === firstId);
            this.select(firstId);
            if (firstSet) {
                if (firstSet.children.length > 0) {
                    if (this.moveForwardMenuRequested) this.moveForwardMenuRequested(firstId);
                } else {
                    if (this.selectedMenuItemChange) this.selectedMenuItemChange(firstId);
                }
            }
        }
    }
}