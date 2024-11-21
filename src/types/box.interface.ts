import type { Filter } from "./filter.enum";

export interface Box {
    title: string;
    imgUrl?: string;
    imgStyle?: string;
    titleStyle?: string;
    tags?: string[];
    body?: string;
    style?: string;
    border: string;
    span?: string;
    expanded?: boolean;
    expandable?: boolean;
    filterType: Filter;
}