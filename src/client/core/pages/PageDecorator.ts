import directory from "./PageDirectory";

/**
 * Page decorator attributeyarn
 */
export default function page(id?: string) {
    return (target: any) => {
        if (!id) {
            id = target.name.toLowerCase().replace("page", "");
        }
        directory.addItem(id, target as React.Component<any, any>);
    };
}
