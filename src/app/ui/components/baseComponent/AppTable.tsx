import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { TableProps } from "@mui/material";

export type AppTableAlign = "left" | "center" | "right";

export interface AppTableColumn<T> {
  key: keyof T | string;
  header: React.ReactNode;
  width?: number | string;
  align?: AppTableAlign;
  render?: (row: T, rowIndex: number) => React.ReactNode;
}

export interface AppTableProps<T> {
  columns: AppTableColumn<T>[];
  rows: T[];
  getRowKey?: (row: T, index: number) => React.Key;
  dense?: boolean;
  title?: React.ReactNode;
  tableProps?: TableProps;
}
export function AppTable<T>({
  columns,
  rows,
  getRowKey,
  dense,
  title,
  tableProps,
}: AppTableProps<T>) {
  return (
    <TableContainer component={Paper} elevation={0}>
      {title && (
        <div
          style={{
            padding: "0.75rem 1rem",
            fontWeight: 600,
          }}
        >
          {title}
        </div>
      )}

      <Table size={dense ? "small" : "medium"} {...tableProps}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                align={col.align ?? "left"}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, rowIndex) => {
            const rowKey = getRowKey
              ? getRowKey(row, rowIndex)
              : rowIndex;

            return (
              <TableRow key={rowKey}>
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    align={col.align ?? "left"}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : // default: read value by key if it exists
                        (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
