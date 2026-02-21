interface TopProductsTableProps {
  products: Array<{
    _id: string;
    productName: string;
    productImage?: string;
    totalSold: number;
    totalRevenue: number;
  }>;
}
export default function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <div>
      <h3>
        <div>
          <table>
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Product
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Sold
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr>
                  <td>
                    <div>
                      <div>{index + 1}</div>
                      <span>{product.productName}</span>
                    </div>
                  </td>
                  <td>{product.totalSold}</td>
                  <td>Rs {product.totalRevenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </h3>
    </div>
  );
}
