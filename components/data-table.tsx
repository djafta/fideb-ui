'use client'
import * as React from "react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FilterForm } from "@/components/filter-form";

interface Column {
  name: string;
  key: string;
  formatData?: (value: any) => React.ReactNode;
  formatHeader?: (name: string) => React.ReactNode;
}

interface Pagination {
  page: number;
  size: number;
  total: number;
}

interface DataTableProps {
  height?: string;
  columns: Column[];
  data: any[];
  pagination: Pagination;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onColumnsChange: (columns: string[]) => void;
  onFilterChange?: (filter: string) => void;
  initialPageSize?: number;
  initialColumns?: string[];
}

export function DataTable({
                            height,
                            columns,
                            data,
                            pagination,
                            isLoading,
                            onPageChange,
                            onPageSizeChange,
                            onColumnsChange,
                            onFilterChange,
                            initialPageSize = 20,
                            initialColumns
                          }: DataTableProps) {
  const [state, setState] = useState({
    page: 0,
    size: initialPageSize,
    columns: initialColumns || columns.map((column) => column.key),
    filter: ""
  });

  const goNextPage = () => {
    const newPage = state.page + 1;
    setState((prev) => ({ ...prev, page: newPage }));
    onPageChange(newPage);
  };

  const goPreviousPage = () => {
    const newPage = state.page - 1;
    setState((prev) => ({ ...prev, page: newPage }));
    onPageChange(newPage);
  };

  const goFirstPage = () => {
    setState((prev) => ({ ...prev, page: 0 }));
    onPageChange(0);
  };

  const goLastPage = () => {
    const lastPage = Math.floor(pagination.total / state.size);
    setState((prev) => ({ ...prev, page: lastPage }));
    onPageChange(lastPage);
  };

  const canGoNextPage = () => {
    return (state.page + 1) * state.size < pagination.total;
  };

  const canGoPreviousPage = () => {
    return state.page > 0;
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value);
    setState((prev) => ({ ...prev, size: newSize, page: 0 }));
    onPageSizeChange(newSize);
    onPageChange(0);
  };

  const handleColumnChange = (columnKey: string, checked: boolean) => {
    const newColumns = checked
      ? [...state.columns, columnKey]
      : state.columns.filter((c) => c !== columnKey);
    setState((prev) => ({ ...prev, columns: newColumns }));
    onColumnsChange(newColumns);
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex items-center py-4">
        { onFilterChange && (
          <FilterForm onSearch={ onFilterChange }/>
        ) }
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            { columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={ column.key }
                className="cursor-pointer"
                checked={ state.columns.includes(column.key) }
                onCheckedChange={ (value) => handleColumnChange(column.key, value) }
              >
                { column.name }
              </DropdownMenuCheckboxItem>
            )) }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={ `flex flex-col gap-4 md:gap-6 md:pt-3 overflow-y-auto ${ height }` }>
        <Table>
          <TableHeader className={ "sticky top-0 bg-white z-10" }>
            <TableRow>
              { columns.filter(column => state.columns.includes(column.key)).map((column) => (
                <TableHead key={ column.key } className="cursor-pointer">
                  {
                    column.formatHeader ? column.formatHeader(column.name) : column.name
                  }
                </TableHead>
              )) }
            </TableRow>
          </TableHeader>
          <TableBody>
            { isLoading ? (
              Array.from({ length: state.size }).map((_, index) => (
                <TableRow key={ index } className="bg-white">
                  { columns.map((column) => (
                    <TableCell
                      key={ column.key }
                      className={ `py-3 ${ !state.columns.includes(column.key) ? "hidden" : "" }` }
                    >
                      <Skeleton className="w-20 h-3"/>
                    </TableCell>
                  )) }
                </TableRow>
              ))
            ) : (
              data.map((item, index) => (
                <TableRow key={ `${ item.id }-${ index }` }>
                  { columns.map((column) => (
                    <TableCell
                      key={ column.key }
                      className={ `h-10 ${ !state.columns.includes(column.key) ? "hidden" : "" }` }
                    >
                      {
                        column.formatData ? column.formatData(item[column.key]) : item[column.key]
                      }
                    </TableCell>
                  )) }
                </TableRow>
              ))
            ) }
          </TableBody>
        </Table>
        <div className="bg-transparent flex justify-between w-full">
          <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            { pagination.size } resultados
                        </span>
            <span className="text-sm text-muted-foreground">
                            Página { pagination.page } de { Math.ceil(pagination.total / pagination.size) || 1 }
                        </span>
          </div>
          <div className="flex gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Linhas por página
              </Label>
              <Select
                value={ `${ state.size }` }
                onValueChange={ handlePageSizeChange }
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={ state.size }/>
                </SelectTrigger>
                <SelectContent side="top">
                  { [10, 15, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={ pageSize } value={ `${ pageSize }` }>
                      { pageSize }
                    </SelectItem>
                  )) }
                </SelectContent>
              </Select>
            </div>
            <div className="ml-auto py-3 flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={ goFirstPage }
              >
                <span className="sr-only">Ir para a primeira página</span>
                <ChevronsLeftIcon/>
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                disabled={ !canGoPreviousPage() }
                onClick={ goPreviousPage }
              >
                <span className="sr-only">Ir para a página anterior</span>
                <ChevronLeftIcon/>
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                disabled={ !canGoNextPage() }
                onClick={ goNextPage }
              >
                <span className="sr-only">Ir para a próxima página</span>
                <ChevronRightIcon/>
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={ goLastPage }
              >
                <span className="sr-only">Ir para a última página</span>
                <ChevronsRightIcon/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}