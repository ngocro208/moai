import { ReactNode } from "react";
import { background } from "../background/background";
import { border } from "../border/border";
import { text } from "../text/text";
import sFixed from "./fixed.module.css";
import sSizes from "./sizes.module.css";
import { getTableRow } from "./row/row";
import s from "./table.module.css";
import {
	TableExpandableProps,
	TableExpandableState,
	useTableExpandable,
} from "./expandable";

export interface TableColumn<R> {
	/**
	 * Title of the column. Note that this is not just `string` but
	 * `ReactNode`.
	 */
	title: ReactNode;
	/**
	 * Classes to add to this column's `td` and `th`. Use this to control the
	 * style, especially the width, of your columns.
	 */
	className?: string;
	/**
	 * The render of this column's cells (`td`). This can be a function that
	 * returns a `ReactNode` to display for a Row (a.k.a [render prop][1]), or
	 * the key of a property of the Row model to display (a.k.a [accessor][2]).
	 *
	 * [1]: https://reactjs.org/docs/render-props.html
	 * [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
	 */
	render:
		| keyof R // Accessor
		| ((row: R, index: number) => ReactNode); // Render function;
}

export interface TableSize {
	cell: string;
}

export interface TableFixed {
	firstColumn?: boolean;
	lastColumn?: boolean;
	header?: boolean;
}

export interface TableProps<R> {
	/**
	 * An array of [generic][1] items to render as rows of the table (e.g. a
	 * list of `Book`).
	 *
	 * [1]: https://www.typescriptlang.org/docs/handbook/generics.html
	 */
	rows: R[];
	/**
	 * A function to return the [React's key][1] of an item (e.g. a book's
	 * ISBN).
	 *
	 * [1]: https://reactjs.org/docs/lists-and-keys.html#keys
	 */
	rowKey: (row: R, index: number) => string;
	/**
	 * An array of `TableColumn`s which describe how to render the table's
	 * `rows` (e.g. a book's title, author). See the "TableColumn" tab for
	 * detail.
	 */
	columns: TableColumn<R>[];
	/**
	 * If defined, each row has a button for users to expand the row. See the
	 * "TableExpandedProps" interface for detail.
	 */
	expandable?: TableExpandableProps<R>;
	/**
	 * If true, the table's header, first column and last column can be fixed
	 * while the rest is scrolled. These positions are relative to the table's
	 * nearest scrolling ancestor (i.e. one with "auto" or "scroll" overflow).
	 */
	fixed?: TableFixed;
	/**
	 * If true, the table's width is 100% of its container's width
	 */
	fill?: boolean;
	/**
	 * Size of the table's cells. Choose one from `Table.sizes`.
	 */
	size?: TableSize;
}

const thCls = [border.weak, background.weak, text.strong].join(" ");

const renderTh = <R,>(column: TableColumn<R>, index: number): JSX.Element => (
	<th key={index} className={[thCls, column.className].join(" ")}>
		{column.title}
	</th>
);

export interface TableState {
	expandable: TableExpandableState;
}

/**
 * Tables represent data in [rows and columns][1]. They are always rendered as
 * [HTML `table`][2] elements to ensure good accessibility. Moai's tables are
 * [responsive][3] and can be used on mobile devices.
 *
 * [1]: https://en.wikipedia.org/wiki/Table_(information)
 * [2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
 * [3]: #fixed
 */
export const Table = <R,>(props: TableProps<R>): JSX.Element => {
	const expandable = useTableExpandable(props.expandable);
	const state: TableState = { expandable };

	const body: JSX.Element[] = [];
	props.rows.forEach((row, index) => {
		const elements = getTableRow({ row, index, state, table: props });
		body.push(...elements);
	});

	const fixedTableClass = props.fixed
		? [
				sFixed.container,
				props.fixed.header && sFixed.header,
				props.fixed.firstColumn && sFixed.firstColumn,
				props.fixed.lastColumn && sFixed.lastColumn,
		  ].filter((e) => typeof e === "string")
		: [];

	return (
		<table
			className={[
				s.container,
				props.fill ? s.containerFill : "",
				background.strong,
				props.size?.cell ?? Table.sizes.medium.cell,
				...fixedTableClass,
			].join(" ")}
		>
			<thead>
				<tr>{props.columns.map(renderTh)}</tr>
			</thead>
			<tbody children={body} />
		</table>
	);
};

Table.sizes = {
	large: { cell: sSizes.large } as TableSize,
	medium: { cell: sSizes.medium } as TableSize,
	small: { cell: sSizes.small } as TableSize,
};
