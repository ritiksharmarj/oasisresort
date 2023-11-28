import { twMerge } from 'tailwind-merge';

export default function Table({ children }) {
  return (
    <div className="relative overflow-x-auto">
      <div className="min-w-full overflow-hidden rounded-md border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-gray-0 text-left text-sm font-medium">
          {children}
        </table>
      </div>
    </div>
  );
}

function Header({ children }) {
  return (
    <thead className="bg-gray-100 uppercase text-gray-600">{children}</thead>
  );
}

function Head({ children, className = '', ...restProps }) {
  return (
    <th
      scope="col"
      className={twMerge('px-6 py-4 font-semibold', className)}
      {...restProps}
    >
      {children}
    </th>
  );
}

function Body({ children }) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

function Cell({ children, className = '', ...restProps }) {
  return (
    <td
      className={twMerge('whitespace-nowrap px-6 py-2', className)}
      {...restProps}
    >
      {children}
    </td>
  );
}

function Row({ children }) {
  return <tr>{children}</tr>;
}

Table.Header = Header;
Table.Head = Head;
Table.Body = Body;
Table.Cell = Cell;
Table.Row = Row;
