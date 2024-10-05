import { ComponentProps } from 'react';

interface IProps extends ComponentProps<"div"> {
    headers?: string[],
    rows: Array<string[]>
}

const styles = {
    table: "flex flex-col rounded-lg bg-gradient-to-r from-stone-500 to-stone-700",
    headerRow: "bg-white text-black",
    row: "flex-1 flex border-[1px] border-gray-300",
    cell: "flex-1 px-16 py-2 grid text-center place-items-center",
    noDataMessage: "text-white text-center py-4"  // New style for no data message
}

const Table = ({ className, headers, rows, ...props }: IProps) => {
    return (
        <>
        <div {...props} className={[styles.table, className].filter(Boolean).join(" ")}>
            {
                headers && (
                    <div className={[styles.row, styles.headerRow].join(" ")}>
                        {headers.map(h => (
                            <div key={h} className={styles.cell}>{h}</div>
                        ))}
                    </div>
                )
            }

            {
                rows.length > 0 ? (
                    rows.map((row, rowIdx) => (
                        <div key={'r-' + rowIdx} className={styles.row}>
                            {
                                row.map((cell, colIdx) => (
                                    <div key={`r-${rowIdx}-c-${colIdx}`} className={styles.cell}>
                                        {cell}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                ) : (
                    <div className={styles.noDataMessage}>
                        No loacal domains created yet...
                    </div>
                )
            }
        </div>
        </>
    );
}

export default Table;
