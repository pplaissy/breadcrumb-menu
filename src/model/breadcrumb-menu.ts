import { MenuItemCommandEvent } from "primeng/api";
import { AppMenuItem } from "./app-menu-item";
import { AppMenuSet } from "./app-menu-set";
import { ExtendedMenuItem } from "./extended-menu-item";

export class BreadcrumbMenu {
    flatMenuItems: AppMenuItem[] = [];
    homeSet: AppMenuSet | undefined;
    path: AppMenuSet[] = [];
    flatMenuSets: AppMenuSet[] = [];
    selectedMenu: AppMenuItem | undefined;

    constructor(flatMenuItems: ExtendedMenuItem[]) {
        const level0 = flatMenuItems.filter(x=> !x.parentId).map(x=> this.getMenuItem(x.id!, x.label!, x.depth, !x.items));
        this.homeSet = new AppMenuSet("home", 0, undefined, level0);
        this.flatMenuSets.push(this.homeSet);

        this.buildSets(flatMenuItems, level0, this.homeSet);

        this.path.push(this.homeSet);
    }

    private buildSets(flatMenuItems: ExtendedMenuItem[], items: AppMenuItem[], parentSet: AppMenuSet): void {
        items.forEach(i => {
            if (i.deadEnd) {
                this.addSingleSets(parentSet, [i]);
            } else {
                const level1 = flatMenuItems.filter(x=> x.parentId === i.id).map(x=> this.getMenuItem(x.id!, x.label!, x.depth, !x.items));
                if (level1.length > 0) {
                    const level1Set = this.addSet(i.id!, 1, parentSet, level1);
                    this.buildSets(flatMenuItems, level1, level1Set);
                }
            }
        });
    }

    private addSet(id: string, depth: number, parent: AppMenuSet, menuItems: AppMenuItem[]): AppMenuSet {
        const set = new AppMenuSet(id, depth, parent, menuItems);
        parent.children.push(set);
        this.flatMenuSets.push(set);
        return set;
    }

    private addMenuSet(m: AppMenuItem, parent: AppMenuSet): AppMenuSet {
        const set = new AppMenuSet(m.id, m.depth, parent, [m]);
        parent.children.push(set);
        this.flatMenuSets.push(set);
        return set;
    }

    private addSingleSets(parent: AppMenuSet, menuItems: AppMenuItem[]): void {
        menuItems.forEach(i => {
            this.addMenuSet(i, parent);
        });
    }

    private getMenuItem(id: string, label: string, depth: number, deadEnd: boolean): AppMenuItem {
        const item = new AppMenuItem(id, label, depth, deadEnd, this.onMenuItemClick.bind(this));
        this.flatMenuItems.push(item);
        return item;
    }

    onMenuItemClick(e: MenuItemCommandEvent): void {
        if (e.item && e.item instanceof AppMenuItem) {
            const m = (e.item as AppMenuItem);
            const parentSet = this.flatMenuSets.find(x=> x.contains(m.id));

            // Changes the status of the selected item so that the check mark appears in the menu.
            parentSet?.select(m.id);

            // Deletes fragments beyond the depth of the selected item
            this.path.splice(m.depth + 1);

            const itemSet = this.flatMenuSets.find(x=> x.id === m.id);
            if (itemSet) {
                if (itemSet.children.length > 0) {
                    itemSet.unselect();
                    this.path.push(itemSet);
                }
            }

            this.selectedMenu = m;
        }
    }
}