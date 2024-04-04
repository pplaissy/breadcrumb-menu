import { MenuItem } from 'primeng/api';

export interface ExtendedMenuItem extends MenuItem {
    id: string;
    parentId?: string;
    depth: number;
    label: string;
    items?: ExtendedMenuItem[];
    icon?: string | undefined;
    command?: any;
}