import { IPageDirectoryItem } from "../Domain";

/**
 * InternalPageDirectory
 */
class InternalPageDirectory {
    private static items: IPageDirectoryItem[] = [];

    /**
     * Find an item, returns an error if not found
     */
    public findItem(id: string): IPageDirectoryItem {
        let item: IPageDirectoryItem = InternalPageDirectory.items.filter((x) => x.id === id)[0];
        if (item) {
            return item;
        } else {
            throw new Error(`Page with id ${id} is not found`);
        }
    }

    /**
     * Add an item, returns an error if the same id is already found
     */
    public addItem(id: string, component: React.Component<any, any>): void {
        if (InternalPageDirectory.items.filter((x) => x.id === id).length === 0) {
            InternalPageDirectory.items.push({
                component,
                id,
            });
        } else {
            throw new Error(`Page with id ${id} already exists`);
        }
    }
}

// Instantiate a new page directory as singleton
let directory: InternalPageDirectory = new InternalPageDirectory();
export default directory;
