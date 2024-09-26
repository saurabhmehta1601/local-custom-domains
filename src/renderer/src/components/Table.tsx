import { ComponentProps } from 'react'

interface IProps extends ComponentProps<"div"> {
    headers?: string[],
    rows: Array<string[]>
}

const styles = {
    table: "flex flex-col rounded-lg bg-gradient-to-r from-stone-500 to-stone-700",
    headerRow: "bg-white text-black",
    row: "flex-1 flex border-[1px] border-gray-300",
    cell: "flex-1 px-16 py-2 grid text-center place-items-center"
}

const Table = ({ className, headers, ...props }: IProps) => {
    return (
        <div {...props} className={[styles.table, className].join(" ")}>
            {
                headers && <div className={[styles.row, styles.headerRow].join(" ")}>
                    {headers.map(h => (<div key={h} className={styles.cell}>{h}</div>))}
                </div>
            }
            {
                props.rows.map((row, rowIdx) => <div key={'r-' + rowIdx} className={styles.row}>
                    {
                        row.map((cell, colIdx) => <div key={`r-${rowIdx}-c-${colIdx}`} className={styles.cell}>
                            {cell}
                        </div>)
                    }
                </div>)
            }
        </div>
    )
}

export default Table