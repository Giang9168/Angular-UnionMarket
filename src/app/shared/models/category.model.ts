import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Category {
    name: string;
    isOpen: boolean;
    path?: string;
    icon: IconDefinition;
    children?: Category[]; // danh mục con
}
