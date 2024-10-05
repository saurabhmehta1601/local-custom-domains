const styles = {
    label: "block mb-2 text-sm font-medium text-white",
    input: "min-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
}

interface IProps {
    id: string
    label: string
    type: "text" | "number"
    placeholder: string
    isRequired?: boolean
    inputValue: string | number,
    onInputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormControl = (props: IProps) => {
    return <div>
        <label htmlFor={props.id} className={styles.label}>{props.label}</label>
        <input
            value={props.inputValue}
            onChange={props.onInputValueChange}
            type={props.type}
            id={props.id}
            className={styles.input}
            placeholder={props.placeholder}
            required={props.isRequired}
        />
    </div>
}

export default FormControl