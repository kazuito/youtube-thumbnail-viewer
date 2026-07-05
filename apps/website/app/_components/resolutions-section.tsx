import { RESOLUTIONS } from "../_lib/resolutions";

export function ResolutionsSection() {
  return (
    <section className="py-16 flex flex-col gap-8 border-t border-border">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Every thumbnail resolution</h2>
        <p className="text-muted-foreground">
          YouTube stores several versions of each video's thumbnail on
          img.youtube.com. This tool shows all of them.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="py-2 pr-4 font-medium">File</th>
              <th className="py-2 pr-4 font-medium">Size</th>
              <th className="py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {RESOLUTIONS.map((res) => (
              <tr key={res.file} className="border-b border-border/50">
                <td className="py-3 pr-4 font-mono text-xs whitespace-nowrap">
                  {res.file}
                </td>
                <td className="py-3 pr-4 whitespace-nowrap">{res.size}</td>
                <td className="py-3 text-muted-foreground">
                  {res.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
